import { randomUUID } from "node:crypto";
import type {
  ApiErrorPayload,
  CreateSessionResult,
  CreateSessionRequest,
  DeviceCompleteResponse,
  DeviceStartResponse,
  OrgResponse,
  SessionBudget,
  SessionParent,
  SessionPermission,
  SessionRecord,
  WhoAmIResponse,
  WorkspaceSummary,
  WorkspaceSwitchResponse,
} from "@/lib/milestone1/types";

const DEVICE_CODE_TTL_SECONDS = 600;
const ACCESS_TOKEN_TTL_SECONDS = 60 * 60;
const SESSION_TOKEN_TTL_SECONDS = 15 * 60;
const parsedSessionTtlSeconds = Number(process.env.OC_SESSION_TTL_SECONDS ?? 60 * 60 * 4);
const SESSION_TTL_SECONDS =
  Number.isFinite(parsedSessionTtlSeconds) && parsedSessionTtlSeconds > 0
    ? parsedSessionTtlSeconds
    : 60 * 60 * 4;

interface InternalUser {
  id: string;
  name: string;
  email: string;
  orgId: string;
  currentWorkspaceId: string;
}

interface InternalOrg {
  id: string;
  name: string;
  workspaceIds: string[];
}

interface InternalWorkspace {
  id: string;
  name: string;
  orgId: string;
}

interface InternalDeviceCode {
  deviceCode: string;
  userCode: string;
  userId: string;
  expiresAt: string;
  approvedAt: string | null;
}

interface InternalAccessToken {
  token: string;
  userId: string;
  expiresAt: string;
}

interface InternalSessionToken {
  token: string;
  sessionId: string;
  expiresAt: string;
}

interface InternalSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: SessionRecord["status"];
  orgId: string;
  workspaceId: string;
  agent: SessionRecord["agent"];
  parent: SessionParent;
  task: SessionRecord["task"];
  budget: SessionBudget;
  permissions: SessionPermission[];
  actions: string[];
  daytona: SessionRecord["daytona"];
  bootstrap: SessionRecord["bootstrap"];
}

interface ControlPlaneState {
  users: Map<string, InternalUser>;
  orgs: Map<string, InternalOrg>;
  workspaces: Map<string, InternalWorkspace>;
  deviceCodes: Map<string, InternalDeviceCode>;
  tokens: Map<string, InternalAccessToken>;
  sessionTokens: Map<string, InternalSessionToken>;
  sessions: Map<string, InternalSession>;
}

interface AuthContext {
  user: InternalUser;
  org: InternalOrg;
  workspace: InternalWorkspace;
}

function isoFromNow(seconds: number): string {
  return new Date(Date.now() + seconds * 1000).toISOString();
}

function createId(prefix: string): string {
  return `${prefix}_${randomUUID().replaceAll("-", "").slice(0, 16)}`;
}

function defaultPermissions(): SessionPermission[] {
  return [
    {
      permission: "platform:read:*",
      mode: "auto",
      delegatable: true,
    },
    {
      permission: "platform:run:*",
      mode: "auto",
      delegatable: true,
    },
    {
      permission: "github:read:acme/*",
      mode: "auto",
      delegatable: true,
    },
    {
      permission: "github:comment:acme/*",
      mode: "approve",
      delegatable: false,
    },
  ];
}

function defaultActions(): string[] {
  return [
    "platform:status",
    "platform:find",
    "platform:do",
    "github:read-pr",
    "github:comment",
    "spawn",
  ];
}

function createSeedState(): ControlPlaneState {
  const orgId = "org_acme";
  const workspaceEngineeringId = "ws_engineering";
  const workspacePlatformId = "ws_platform";
  const userId = "user_louis";
  const createdAt = new Date("2026-02-25T08:00:00.000Z").toISOString();
  const seedSessionId = "sess_seed_a11f9f4b";

  const users = new Map<string, InternalUser>([
    [
      userId,
      {
        id: userId,
        name: "Louis Morgner",
        email: "louis@acme.dev",
        orgId,
        currentWorkspaceId: workspaceEngineeringId,
      },
    ],
  ]);

  const orgs = new Map<string, InternalOrg>([
    [
      orgId,
      {
        id: orgId,
        name: "Acme",
        workspaceIds: [workspaceEngineeringId, workspacePlatformId],
      },
    ],
  ]);

  const workspaces = new Map<string, InternalWorkspace>([
    [
      workspaceEngineeringId,
      {
        id: workspaceEngineeringId,
        name: "Engineering",
        orgId,
      },
    ],
    [
      workspacePlatformId,
      {
        id: workspacePlatformId,
        name: "Platform",
        orgId,
      },
    ],
  ]);

  const sessions = new Map<string, InternalSession>([
    [
      seedSessionId,
      {
        id: seedSessionId,
        createdAt,
        updatedAt: createdAt,
        status: "active",
        orgId,
        workspaceId: workspaceEngineeringId,
        agent: {
          id: "opencompany/code-reviewer",
          version: "2.0.0",
          instance: createId("inst"),
        },
        parent: {
          type: "human",
          id: userId,
          name: "Louis Morgner",
        },
        task: {
          description: "Review PR #456 for security and performance regressions",
          input: {
            pullRequest: "https://github.com/acme/api/pull/456",
            focus: ["security", "performance"],
          },
        },
        budget: {
          costCents: { used: 12, limit: 500 },
          durationSeconds: { used: 45, limit: 300 },
          actions: { used: 3, limit: 100 },
        },
        permissions: defaultPermissions(),
        actions: defaultActions(),
        daytona: {
          image: "ghcr.io/opencompany/oc-session:milestone-1",
          workspacePath: "/workspace",
          ttlExpiresAt: isoFromNow(SESSION_TTL_SECONDS),
          bootstrapScript: "/usr/local/bin/oc-session-bootstrap",
          metadataEnv: ["OC_ORG_ID", "OC_WORKSPACE_ID", "OC_SESSION_ID", "OC_AGENT_ID"],
        },
        bootstrap: {
          platformSessionTokenExpiresAt: isoFromNow(SESSION_TOKEN_TTL_SECONDS),
        },
      },
    ],
  ]);

  return {
    users,
    orgs,
    workspaces,
    deviceCodes: new Map<string, InternalDeviceCode>(),
    tokens: new Map<string, InternalAccessToken>(),
    sessionTokens: new Map<string, InternalSessionToken>(),
    sessions,
  };
}

declare global {
  // eslint-disable-next-line no-var
  var __milestoneOneState: ControlPlaneState | undefined;
}

function getState(): ControlPlaneState {
  if (!globalThis.__milestoneOneState) {
    globalThis.__milestoneOneState = createSeedState();
  }
  return globalThis.__milestoneOneState;
}

function isExpired(isoDate: string): boolean {
  return new Date(isoDate).getTime() <= Date.now();
}

function applyAccessTokenMaintenance(state: ControlPlaneState) {
  for (const [token, tokenEntry] of state.tokens.entries()) {
    if (isExpired(tokenEntry.expiresAt)) {
      state.tokens.delete(token);
    }
  }
}

function applySessionTokenMaintenance(state: ControlPlaneState) {
  for (const [token, tokenEntry] of state.sessionTokens.entries()) {
    if (isExpired(tokenEntry.expiresAt)) {
      state.sessionTokens.delete(token);
    }
  }
}

function applySessionTtlMaintenance(state: ControlPlaneState) {
  const now = new Date().toISOString();
  for (const session of state.sessions.values()) {
    if (session.status !== "active") {
      continue;
    }

    if (isExpired(session.daytona.ttlExpiresAt)) {
      session.status = "terminated";
      session.updatedAt = now;
    }
  }
}

function runMaintenance(state: ControlPlaneState) {
  applyAccessTokenMaintenance(state);
  applySessionTokenMaintenance(state);
  applySessionTtlMaintenance(state);
}

function encodeSession(state: ControlPlaneState, session: InternalSession): SessionRecord {
  const org = state.orgs.get(session.orgId);
  const workspace = state.workspaces.get(session.workspaceId);

  if (!org || !workspace) {
    throw new ControlPlaneError(500, {
      code: "INVALID_STATE",
      message: "Session references an unknown org/workspace.",
      retryable: false,
    });
  }

  return {
    id: session.id,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    status: session.status,
    org: {
      id: org.id,
      name: org.name,
    },
    workspace: {
      id: workspace.id,
      name: workspace.name,
    },
    agent: session.agent,
    parent: session.parent,
    task: session.task,
    budget: session.budget,
    permissions: session.permissions,
    actions: session.actions,
    daytona: session.daytona,
    bootstrap: session.bootstrap,
  };
}

function getDefaultUser(state: ControlPlaneState): InternalUser {
  const firstUser = state.users.values().next().value as InternalUser | undefined;
  if (!firstUser) {
    throw new ControlPlaneError(500, {
      code: "NO_USERS_CONFIGURED",
      message: "The milestone state has no users configured.",
      retryable: false,
    });
  }

  return firstUser;
}

function getAuthContextByToken(token: string): AuthContext {
  const state = getState();
  runMaintenance(state);
  const tokenEntry = state.tokens.get(token);

  if (!tokenEntry) {
    throw new ControlPlaneError(401, {
      code: "AUTH_INVALID_TOKEN",
      message: "The access token is invalid.",
      retryable: false,
    });
  }

  if (new Date(tokenEntry.expiresAt).getTime() <= Date.now()) {
    state.tokens.delete(token);
    throw new ControlPlaneError(401, {
      code: "AUTH_TOKEN_EXPIRED",
      message: "The access token has expired. Run `oc login` again.",
      retryable: false,
    });
  }

  const user = state.users.get(tokenEntry.userId);
  if (!user) {
    throw new ControlPlaneError(401, {
      code: "AUTH_UNKNOWN_USER",
      message: "Token references an unknown user.",
      retryable: false,
    });
  }

  const org = state.orgs.get(user.orgId);
  const workspace = state.workspaces.get(user.currentWorkspaceId);

  if (!org || !workspace) {
    throw new ControlPlaneError(500, {
      code: "INVALID_STATE",
      message: "User references an unknown org/workspace.",
      retryable: false,
    });
  }

  return { user, org, workspace };
}

function issueAccessToken(
  state: ControlPlaneState,
  userId: string,
  ttlSeconds = ACCESS_TOKEN_TTL_SECONDS
): InternalAccessToken {
  const token = createId("oc_live");
  const tokenEntry: InternalAccessToken = {
    token,
    userId,
    expiresAt: isoFromNow(ttlSeconds),
  };
  state.tokens.set(token, tokenEntry);
  return tokenEntry;
}

function issueSessionToken(
  state: ControlPlaneState,
  sessionId: string,
  ttlSeconds = SESSION_TOKEN_TTL_SECONDS
): InternalSessionToken {
  const token = createId("oc_sess");
  const tokenEntry: InternalSessionToken = {
    token,
    sessionId,
    expiresAt: isoFromNow(ttlSeconds),
  };
  state.sessionTokens.set(token, tokenEntry);
  return tokenEntry;
}

function ensureWorkspaceInOrg(state: ControlPlaneState, orgId: string, workspaceId: string): InternalWorkspace {
  const workspace = state.workspaces.get(workspaceId);
  if (!workspace || workspace.orgId !== orgId) {
    throw new ControlPlaneError(404, {
      code: "WORKSPACE_NOT_FOUND",
      message: `Workspace '${workspaceId}' does not exist in this org.`,
      retryable: false,
      details: { workspaceId, orgId },
    });
  }
  return workspace;
}

function parseBudget(request?: CreateSessionRequest["budget"]): SessionBudget {
  const defaultBudget: SessionBudget = {
    costCents: { used: 0, limit: 500 },
    durationSeconds: { used: 0, limit: 300 },
    actions: { used: 0, limit: 100 },
  };

  if (!request) {
    return defaultBudget;
  }

  const nextBudget: SessionBudget = {
    costCents: {
      used: 0,
      limit: request.costLimitCents ?? defaultBudget.costCents.limit,
    },
    durationSeconds: {
      used: 0,
      limit: request.durationLimitSeconds ?? defaultBudget.durationSeconds.limit,
    },
    actions: {
      used: 0,
      limit: request.actionLimit ?? defaultBudget.actions.limit,
    },
  };

  if (
    nextBudget.costCents.limit <= 0 ||
    nextBudget.durationSeconds.limit <= 0 ||
    nextBudget.actions.limit <= 0
  ) {
    throw new ControlPlaneError(400, {
      code: "INVALID_BUDGET",
      message: "Budget limits must be positive numbers.",
      retryable: false,
    });
  }

  return nextBudget;
}

export class ControlPlaneError extends Error {
  readonly status: number;
  readonly payload: ApiErrorPayload;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.status = status;
    this.payload = payload;
  }
}

export function startDeviceAuth(): DeviceStartResponse {
  const state = getState();
  const user = getDefaultUser(state);
  const deviceCode = createId("dc");
  const userCode = randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();

  state.deviceCodes.set(deviceCode, {
    deviceCode,
    userCode,
    userId: user.id,
    expiresAt: isoFromNow(DEVICE_CODE_TTL_SECONDS),
    // Milestone 1 demo: auto-approve immediately so CLI login is usable.
    approvedAt: new Date().toISOString(),
  });

  const baseUrl = process.env.OC_AUTH_BASE_URL ?? "http://localhost:3000";

  return {
    device_code: deviceCode,
    user_code: userCode,
    verification_uri: `${baseUrl}/platform`,
    verification_uri_complete: `${baseUrl}/platform?device_code=${deviceCode}`,
    expires_in: DEVICE_CODE_TTL_SECONDS,
    interval: 2,
  };
}

export function completeDeviceAuth(deviceCode: string): DeviceCompleteResponse {
  const state = getState();
  const device = state.deviceCodes.get(deviceCode);

  if (!device) {
    throw new ControlPlaneError(404, {
      code: "AUTH_DEVICE_CODE_NOT_FOUND",
      message: "Unknown device code.",
      retryable: false,
      details: { device_code: deviceCode },
    });
  }

  if (new Date(device.expiresAt).getTime() <= Date.now()) {
    state.deviceCodes.delete(deviceCode);
    throw new ControlPlaneError(410, {
      code: "AUTH_DEVICE_CODE_EXPIRED",
      message: "Device code expired. Run `oc login` again.",
      retryable: true,
      details: { device_code: deviceCode },
    });
  }

  if (!device.approvedAt) {
    throw new ControlPlaneError(428, {
      code: "AUTH_PENDING_APPROVAL",
      message: "Login is waiting for browser approval.",
      retryable: true,
      details: { device_code: deviceCode },
    });
  }

  const tokenEntry = issueAccessToken(state, device.userId);

  const user = state.users.get(device.userId);
  if (!user) {
    throw new ControlPlaneError(500, {
      code: "INVALID_STATE",
      message: "Device code references an unknown user.",
      retryable: false,
    });
  }

  const org = state.orgs.get(user.orgId);
  const workspace = state.workspaces.get(user.currentWorkspaceId);

  if (!org || !workspace) {
    throw new ControlPlaneError(500, {
      code: "INVALID_STATE",
      message: "User references an unknown org/workspace.",
      retryable: false,
    });
  }

  return {
    access_token: tokenEntry.token,
    token_type: "Bearer",
    expires_in: ACCESS_TOKEN_TTL_SECONDS,
    expires_at: tokenEntry.expiresAt,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    org: {
      id: org.id,
      name: org.name,
    },
    workspace: {
      id: workspace.id,
      name: workspace.name,
    },
  };
}

export function issueAccessTokenForDefaultUser(ttlSeconds = ACCESS_TOKEN_TTL_SECONDS): string {
  const state = getState();
  const user = getDefaultUser(state);
  const tokenEntry = issueAccessToken(state, user.id, ttlSeconds);
  return tokenEntry.token;
}

export function whoAmI(accessToken: string): WhoAmIResponse {
  const { user, org, workspace } = getAuthContextByToken(accessToken);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    org: {
      id: org.id,
      name: org.name,
    },
    workspace: {
      id: workspace.id,
      name: workspace.name,
    },
  };
}

export function getOrg(accessToken: string): OrgResponse {
  const state = getState();
  const { org, workspace } = getAuthContextByToken(accessToken);

  const workspaces = org.workspaceIds
    .map((workspaceId) => state.workspaces.get(workspaceId))
    .filter((entry): entry is InternalWorkspace => Boolean(entry))
    .map((entry) => ({ id: entry.id, name: entry.name }));

  return {
    org: {
      id: org.id,
      name: org.name,
    },
    currentWorkspace: {
      id: workspace.id,
      name: workspace.name,
    },
    workspaces,
  };
}

export function switchWorkspace(accessToken: string, workspaceId: string): WorkspaceSwitchResponse {
  const state = getState();
  const { user, org } = getAuthContextByToken(accessToken);
  const workspace = ensureWorkspaceInOrg(state, org.id, workspaceId);
  user.currentWorkspaceId = workspace.id;

  return {
    org: {
      id: org.id,
      name: org.name,
    },
    workspace: {
      id: workspace.id,
      name: workspace.name,
    },
  };
}

export function createSession(accessToken: string, request: CreateSessionRequest): CreateSessionResult {
  if (!request.agent || request.agent.trim().length === 0) {
    throw new ControlPlaneError(400, {
      code: "INVALID_AGENT",
      message: "`agent` is required.",
      retryable: false,
    });
  }

  const state = getState();
  const { user, org, workspace: defaultWorkspace } = getAuthContextByToken(accessToken);
  const workspace = request.workspaceId
    ? ensureWorkspaceInOrg(state, org.id, request.workspaceId)
    : defaultWorkspace;

  const timestamp = new Date().toISOString();
  const session: InternalSession = {
    id: createId("sess"),
    createdAt: timestamp,
    updatedAt: timestamp,
    status: "active",
    orgId: org.id,
    workspaceId: workspace.id,
    agent: {
      id: request.agent.trim(),
      version: "1.0.0",
      instance: createId("inst"),
    },
    parent: {
      type: "human",
      id: user.id,
      name: user.name,
    },
    task: {
      description: request.task?.description?.trim() || `Execute ${request.agent.trim()}`,
      input: request.task?.input ?? {},
    },
    budget: parseBudget(request.budget),
    permissions: defaultPermissions(),
    actions: defaultActions(),
    daytona: {
      image: "ghcr.io/opencompany/oc-session:milestone-1",
      workspacePath: "/workspace",
      ttlExpiresAt: isoFromNow(SESSION_TTL_SECONDS),
      bootstrapScript: "/usr/local/bin/oc-session-bootstrap",
      metadataEnv: ["OC_ORG_ID", "OC_WORKSPACE_ID", "OC_SESSION_ID", "OC_AGENT_ID"],
    },
    bootstrap: {
      platformSessionTokenExpiresAt: "",
    },
  };

  state.sessions.set(session.id, session);
  const sessionTokenEntry = issueSessionToken(state, session.id);
  session.bootstrap.platformSessionTokenExpiresAt = sessionTokenEntry.expiresAt;

  const apiBaseUrl = process.env.OC_API_BASE_URL ?? "http://localhost:3000";

  return {
    session: encodeSession(state, session),
    bootstrap: {
      sessionToken: sessionTokenEntry.token,
      sessionTokenExpiresAt: sessionTokenEntry.expiresAt,
      env: {
        OC_API_BASE_URL: apiBaseUrl,
        OC_SESSION_ID: session.id,
        OC_SESSION_TOKEN: sessionTokenEntry.token,
        OC_ORG_ID: org.id,
        OC_WORKSPACE_ID: workspace.id,
        OC_AGENT_ID: session.agent.id,
      },
    },
  };
}

export function listSessions(accessToken: string, workspaceId?: string): SessionRecord[] {
  const state = getState();
  runMaintenance(state);
  const { org, workspace: activeWorkspace } = getAuthContextByToken(accessToken);
  const scopedWorkspaceId = workspaceId ?? activeWorkspace.id;

  return [...state.sessions.values()]
    .filter((session) => session.orgId === org.id && session.workspaceId === scopedWorkspaceId)
    .sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return bTime - aTime;
    })
    .map((session) => encodeSession(state, session));
}

export function getSession(accessToken: string, sessionId: string): SessionRecord {
  const state = getState();
  runMaintenance(state);
  const { org } = getAuthContextByToken(accessToken);
  const session = state.sessions.get(sessionId);

  if (!session || session.orgId !== org.id) {
    throw new ControlPlaneError(404, {
      code: "SESSION_NOT_FOUND",
      message: `Session '${sessionId}' does not exist.`,
      retryable: false,
    });
  }

  return encodeSession(state, session);
}

export function getSessionByToken(token: string, sessionId: string): SessionRecord {
  const state = getState();
  runMaintenance(state);
  const session = state.sessions.get(sessionId);

  if (!session) {
    throw new ControlPlaneError(404, {
      code: "SESSION_NOT_FOUND",
      message: `Session '${sessionId}' does not exist.`,
      retryable: false,
    });
  }

  if (state.tokens.has(token)) {
    const { org } = getAuthContextByToken(token);
    if (session.orgId !== org.id) {
      throw new ControlPlaneError(404, {
        code: "SESSION_NOT_FOUND",
        message: `Session '${sessionId}' does not exist.`,
        retryable: false,
      });
    }

    return encodeSession(state, session);
  }

  const sessionToken = state.sessionTokens.get(token);
  if (!sessionToken) {
    throw new ControlPlaneError(401, {
      code: "AUTH_INVALID_TOKEN",
      message: "The access token is invalid.",
      retryable: false,
    });
  }

  if (sessionToken.sessionId !== sessionId) {
    throw new ControlPlaneError(403, {
      code: "AUTH_SCOPE_VIOLATION",
      message: "Session token can only access its own session.",
      retryable: false,
      details: {
        token_session_id: sessionToken.sessionId,
        requested_session_id: sessionId,
      },
    });
  }

  return encodeSession(state, session);
}

export function getDefaultWebViewer(): {
  org: {
    id: string;
    name: string;
  };
  workspace: {
    id: string;
    name: string;
  };
} {
  const state = getState();
  runMaintenance(state);
  const user = getDefaultUser(state);
  const org = state.orgs.get(user.orgId);
  const workspace = state.workspaces.get(user.currentWorkspaceId);

  if (!org || !workspace) {
    throw new ControlPlaneError(500, {
      code: "INVALID_STATE",
      message: "Web viewer references an unknown org/workspace.",
      retryable: false,
    });
  }

  return {
    org: {
      id: org.id,
      name: org.name,
    },
    workspace: {
      id: workspace.id,
      name: workspace.name,
    },
  };
}

export function listSessionsForWeb(orgId: string, workspaceId: string): SessionRecord[] {
  const state = getState();
  runMaintenance(state);
  return [...state.sessions.values()]
    .filter((session) => session.orgId === orgId && session.workspaceId === workspaceId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((session) => encodeSession(state, session));
}

export function listWorkspacesForWeb(orgId: string): WorkspaceSummary[] {
  const state = getState();
  runMaintenance(state);
  const org = state.orgs.get(orgId);
  if (!org) {
    return [];
  }

  return org.workspaceIds
    .map((workspaceId) => state.workspaces.get(workspaceId))
    .filter((workspace): workspace is InternalWorkspace => Boolean(workspace))
    .map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
    }));
}

export function getSessionForWeb(sessionId: string): SessionRecord | null {
  const state = getState();
  runMaintenance(state);
  const session = state.sessions.get(sessionId);
  if (!session) {
    return null;
  }
  return encodeSession(state, session);
}
