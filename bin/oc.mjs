#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const API_BASE_URL = process.env.OC_API_BASE_URL ?? "http://localhost:3000";
const CONFIG_DIR = process.env.OC_CONFIG_DIR ?? path.join(process.cwd(), ".oc");
const AUTH_FILE = path.join(CONFIG_DIR, "auth.json");

function printJson(data) {
  console.log(JSON.stringify(data, null, 2));
}

function printHelp() {
  console.log(`oc - Milestone 1 CLI

Usage:
  oc login [--json]
  oc whoami [--json]
  oc org [--json]
  oc workspace switch <workspace-id> [--json]
  oc spawn <agent> [--task "<task>"] [--workspace <workspace-id>] [--json]
  oc status [session-id] [--json]

Environment:
  OC_API_BASE_URL   Base control-plane URL (default: http://localhost:3000)
  OC_CONFIG_DIR     Path for local token cache (default: ./.oc)
  OC_TOKEN          Access token fallback when cache is unavailable
  OC_SESSION_TOKEN  Session token for inside-session execution
  OC_SESSION_ID     If set, 'oc status' resolves this session by default
`);
}

function parseJsonFlag(args) {
  const filtered = [];
  let asJson = false;

  for (const arg of args) {
    if (arg === "--json") {
      asJson = true;
      continue;
    }
    filtered.push(arg);
  }

  return { args: filtered, asJson };
}

function parseFlagValue(args, flag) {
  const index = args.indexOf(flag);
  if (index === -1) {
    return { value: undefined, args };
  }

  if (index === args.length - 1) {
    throw new Error(`Missing value for ${flag}`);
  }

  const nextArgs = [...args];
  const value = nextArgs[index + 1];
  nextArgs.splice(index, 2);
  return { value, args: nextArgs };
}

async function readAuthCache() {
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeAuthCache(cache) {
  await fs.mkdir(CONFIG_DIR, { recursive: true });
  await fs.writeFile(AUTH_FILE, JSON.stringify(cache, null, 2), "utf-8");
}

async function requireAccessToken() {
  const envToken = process.env.OC_SESSION_TOKEN || process.env.OC_TOKEN;
  if (envToken && envToken.trim().length > 0) {
    return { token: envToken.trim(), cache: null };
  }

  const cache = await readAuthCache();
  const token = cache?.access_token;
  if (!token || typeof token !== "string") {
    throw new Error("No access token found. Run `oc login` first or set OC_TOKEN/OC_SESSION_TOKEN.");
  }
  return { token, cache };
}

async function apiRequest(pathname, options = {}) {
  const { method = "GET", accessToken, body } = options;
  const headers = {
    "content-type": "application/json",
  };

  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${pathname}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const parsed = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const code = parsed?.error?.code ?? "REQUEST_FAILED";
    const message = parsed?.error?.message ?? "Request failed.";
    throw new Error(`${code}: ${message}`);
  }

  return parsed;
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

async function commandLogin(args, asJson) {
  const start = await apiRequest("/v1/auth/device/start", {
    method: "POST",
  });

  const complete = await apiRequest("/v1/auth/device/complete", {
    method: "POST",
    body: {
      device_code: start.device_code,
    },
  });

  await writeAuthCache({
    api_base_url: API_BASE_URL,
    ...complete,
  });

  if (asJson) {
    printJson({
      device: start,
      auth: complete,
      cache_file: AUTH_FILE,
    });
    return;
  }

  console.log(`Verification URL: ${start.verification_uri_complete}`);
  console.log(`User code: ${start.user_code}`);
  console.log(`Logged in as ${complete.user.name} <${complete.user.email}>`);
  console.log(`Org: ${complete.org.name} (${complete.org.id})`);
  console.log(`Workspace: ${complete.workspace.name} (${complete.workspace.id})`);
  console.log(`Token cached at ${AUTH_FILE}`);
}

async function commandWhoAmI(asJson) {
  const { token } = await requireAccessToken();
  const response = await apiRequest("/v1/auth/whoami", { accessToken: token });

  if (asJson) {
    printJson(response);
    return;
  }

  console.log(`${response.user.name} <${response.user.email}>`);
  console.log(`Org: ${response.org.name} (${response.org.id})`);
  console.log(`Workspace: ${response.workspace.name} (${response.workspace.id})`);
}

async function commandOrg(asJson) {
  const { token } = await requireAccessToken();
  const response = await apiRequest("/v1/org", { accessToken: token });

  if (asJson) {
    printJson(response);
    return;
  }

  console.log(`Org: ${response.org.name} (${response.org.id})`);
  console.log("Workspaces:");
  for (const workspace of response.workspaces) {
    const current = workspace.id === response.currentWorkspace.id ? "*" : " ";
    console.log(` ${current} ${workspace.name} (${workspace.id})`);
  }
}

async function commandWorkspace(args, asJson) {
  const subcommand = args[0];
  if (subcommand !== "switch") {
    throw new Error("Expected `oc workspace switch <workspace-id>`");
  }

  const workspaceId = args[1];
  if (!workspaceId) {
    throw new Error("Missing workspace id. Usage: oc workspace switch <workspace-id>");
  }

  const { token, cache } = await requireAccessToken();
  const response = await apiRequest("/v1/workspace/switch", {
    method: "POST",
    accessToken: token,
    body: { workspaceId },
  });

  if (cache) {
    await writeAuthCache({
      ...cache,
      org: response.org,
      workspace: response.workspace,
    });
  }

  if (asJson) {
    printJson(response);
    return;
  }

  console.log(`Switched to workspace ${response.workspace.name} (${response.workspace.id})`);
}

async function commandSpawn(rawArgs, asJson) {
  if (rawArgs.length === 0) {
    throw new Error("Usage: oc spawn <agent> [--task \"...\"] [--workspace <workspace-id>]");
  }

  const { token } = await requireAccessToken();
  const agent = rawArgs[0];
  let rest = rawArgs.slice(1);

  const taskResult = parseFlagValue(rest, "--task");
  rest = taskResult.args;
  const workspaceResult = parseFlagValue(rest, "--workspace");
  rest = workspaceResult.args;

  if (rest.length > 0) {
    throw new Error(`Unknown arguments: ${rest.join(" ")}`);
  }

  const payload = {
    agent,
    task: taskResult.value ? { description: taskResult.value } : undefined,
    workspaceId: workspaceResult.value,
  };

  const response = await apiRequest("/v1/sessions", {
    method: "POST",
    accessToken: token,
    body: payload,
  });

  const session = response.session;
  if (asJson) {
    printJson(response);
    return;
  }

  console.log(`Spawned session ${session.id}`);
  console.log(`Agent: ${session.agent.id}@${session.agent.version}`);
  console.log(`Workspace: ${session.workspace.name}`);
  console.log(`Task: ${session.task.description}`);
  console.log(`Status: ${session.status}`);
  if (response.bootstrap?.sessionTokenExpiresAt) {
    console.log(`Session token expires: ${formatDate(response.bootstrap.sessionTokenExpiresAt)}`);
  }
  if (response.bootstrap?.env) {
    console.log("Daytona bootstrap env prepared (OC_SESSION_ID / OC_SESSION_TOKEN injected).");
  }
  console.log(`Use: oc status ${session.id}`);
}

function printSessionSummary(session) {
  console.log(`${session.id}  ${session.status}`);
  console.log(`  Agent: ${session.agent.id}@${session.agent.version}`);
  console.log(`  Workspace: ${session.workspace.name}`);
  console.log(`  Task: ${session.task.description}`);
  console.log(
    `  Budget: ${formatCurrency(session.budget.costCents.used)} / ${formatCurrency(session.budget.costCents.limit)}  |  ${session.budget.durationSeconds.used}s / ${session.budget.durationSeconds.limit}s`
  );
  console.log(`  Updated: ${formatDate(session.updatedAt)}`);
}

async function commandStatus(args, asJson) {
  const { token } = await requireAccessToken();

  const sessionId = args[0] || process.env.OC_SESSION_ID;
  if (sessionId) {
    const response = await apiRequest(`/v1/sessions/${encodeURIComponent(sessionId)}`, {
      accessToken: token,
    });

    if (asJson) {
      printJson(response);
      return;
    }

    printSessionSummary(response.session);
    return;
  }

  const response = await apiRequest("/v1/sessions", { accessToken: token });
  if (asJson) {
    printJson(response);
    return;
  }

  const sessions = response.sessions ?? [];
  if (sessions.length === 0) {
    console.log("No sessions found in the active workspace.");
    return;
  }

  console.log(`Sessions (${sessions.length}):`);
  for (const session of sessions) {
    printSessionSummary(session);
  }
}

async function main() {
  const argv = process.argv.slice(2);
  const command = argv[0];
  const { args, asJson } = parseJsonFlag(argv.slice(1));

  if (!command || command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  switch (command) {
    case "login":
      await commandLogin(args, asJson);
      break;
    case "whoami":
      await commandWhoAmI(asJson);
      break;
    case "org":
      await commandOrg(asJson);
      break;
    case "workspace":
      await commandWorkspace(args, asJson);
      break;
    case "spawn":
      await commandSpawn(args, asJson);
      break;
    case "status":
      await commandStatus(args, asJson);
      break;
    default:
      throw new Error(`Unknown command '${command}'. Run 'oc help' for usage.`);
  }
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
