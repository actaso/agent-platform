"use client";

import { useState } from "react";
import {
  Terminal,
  Database,
  Shield,
  Search,
  GitBranch,
  Eye,
  Zap,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  User,
  Bot,
  Lock,
  Unlock,
  Plus,
  Settings,
} from "lucide-react";

// =============================================================================
// PLATFORM SPECIFICATION - The CLI and How Everything Works
// =============================================================================

function CodeBlock({ children, title }: { children: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {title && (
        <div className="border-b border-zinc-800 bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">{title}</span>
        </div>
      )}
      <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
        <button
          onClick={copy}
          className="absolute right-2 top-2 p-2 text-zinc-500 opacity-0 transition-opacity hover:text-zinc-300 group-hover:opacity-100"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
        <pre className="overflow-x-auto font-mono text-sm text-zinc-100">{children}</pre>
      </div>
    </div>
  );
}

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <Icon className="size-5 text-zinc-600 dark:text-zinc-400" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-black dark:text-white">{title}</h2>
          <p className="text-zinc-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export default function AgentFirstPlatformPage() {
  return (
    <div className="max-w-4xl space-y-16">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
          Platform Specification
        </p>
        <h1 className="mb-4 text-3xl font-medium text-black dark:text-white">
          The Agent-First Platform
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A complete specification of the CLI, sessions, permissions, capabilities,
          memory, and how humans and agents interact with the platform.
        </p>

        {/* Quick nav */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { href: "#cli", label: "CLI" },
            { href: "#sessions", label: "Sessions" },
            { href: "#permissions", label: "Permissions" },
            { href: "#capabilities", label: "Capabilities" },
            { href: "#memory", label: "Memory" },
            { href: "#subagents", label: "Sub-Agents" },
            { href: "#human", label: "Human Interface" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border border-zinc-200 px-3 py-1 font-mono text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* CLI OVERVIEW */}
      {/* ================================================================== */}
      <Section
        id="cli"
        icon={Terminal}
        title="The CLI"
        subtitle="The primary interface for agents (and humans debugging)"
      >
        <div className="space-y-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            The <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc</code> command
            is the entry point for everything. It wraps a REST API underneath, but
            agents interact through the CLI.
          </p>

          <CodeBlock title="Installation & Auth">
{`# In a hosted session, oc is pre-installed and authenticated
# For external use:
curl -fsSL https://opencompany.dev/install.sh | sh
oc auth login  # Opens browser for OAuth, stores token

# Or use a token directly
export OC_TOKEN="oc_live_..."
oc session info`}
          </CodeBlock>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-3 font-medium text-black dark:text-white">Command Structure</p>
            <div className="grid gap-2 font-mono text-sm">
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc session</span>
                <span className="text-zinc-600 dark:text-zinc-400">Manage current session</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc memory</span>
                <span className="text-zinc-600 dark:text-zinc-400">Query and store memories</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc permissions</span>
                <span className="text-zinc-600 dark:text-zinc-400">Check and request permissions</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc query</span>
                <span className="text-zinc-600 dark:text-zinc-400">Find capabilities by intent</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc invoke</span>
                <span className="text-zinc-600 dark:text-zinc-400">Execute a capability</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc spawn</span>
                <span className="text-zinc-600 dark:text-zinc-400">Create a sub-agent session</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-500">oc agents</span>
                <span className="text-zinc-600 dark:text-zinc-400">Manage sub-agents</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-500">
            All commands support <code>--json</code> for machine-readable output
            and <code>--help</code> for usage details.
          </p>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SESSIONS */}
      {/* ================================================================== */}
      <Section
        id="sessions"
        icon={Zap}
        title="Sessions"
        subtitle="The fundamental unit of agent work"
      >
        <div className="space-y-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            A session is a sandboxed execution context. It has an identity, permissions,
            budget, memory access, and a task. Sessions are spawned by humans or other agents.
          </p>

          <CodeBlock title="oc session info">
{`$ oc session info

Session:     sess_abc123def456
Status:      active
Agent:       opencompany/code-reviewer@2.0.0
Instance:    inst_789xyz
Parent:      user_louis (human)
Created:     2025-01-22T14:30:00Z

Budget:
  Cost:      $0.12 / $5.00
  Duration:  45s / 300s
  Actions:   3 / 100

Permissions: 5 granted (2 delegatable)
Capabilities: 7 available
Memory:      47 facts, 12 episodes, 3 procedures`}
          </CodeBlock>

          <CodeBlock title="oc session info --json">
{`{
  "id": "sess_abc123def456",
  "status": "active",
  "agent": {
    "id": "opencompany/code-reviewer",
    "version": "2.0.0",
    "instance": "inst_789xyz"
  },
  "parent": {
    "type": "human",
    "id": "user_louis",
    "name": "Louis"
  },
  "budget": {
    "cost": { "used": 12, "limit": 500 },
    "duration": { "used": 45, "limit": 300 },
    "actions": { "used": 3, "limit": 100 }
  },
  "permissions": [...],
  "capabilities": [...],
  "memory": { "facts": 47, "episodes": 12, "procedures": 3 }
}`}
          </CodeBlock>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-3 font-medium text-black dark:text-white">Session Lifecycle</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="border border-zinc-200 px-3 py-2 dark:border-zinc-700">
                <span className="text-zinc-500">spawned</span>
              </div>
              <ChevronRight className="size-4 text-zinc-400" />
              <div className="border border-green-200 bg-green-50 px-3 py-2 dark:border-green-900 dark:bg-green-950">
                <span className="text-green-700 dark:text-green-400">active</span>
              </div>
              <ChevronRight className="size-4 text-zinc-400" />
              <div className="border border-zinc-200 px-3 py-2 dark:border-zinc-700">
                <span className="text-zinc-500">completed | failed | timeout | killed</span>
              </div>
            </div>
          </div>

          <CodeBlock title="Spawning a new session (as human or agent)">
{`# Human spawns a session for an agent
oc spawn opencompany/code-reviewer \\
  --task "Review PR #456 for security issues" \\
  --permission "read:network=api.github.com/acme/*" \\
  --permission "write:network=api.github.com/acme/*" \\
  --permission "write:network=slack.com/api/*" \\
  --budget-cost 500 \\
  --budget-time 300 \\
  --budget-actions 100 \\
  --memory-scope "project:acme/api"

# Returns session ID
sess_abc123def456

# Attach to session (watch live)
oc session attach sess_abc123def456

# Or just get result when done
oc session result sess_abc123def456 --wait`}
          </CodeBlock>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PERMISSIONS */}
      {/* ================================================================== */}
      <Section
        id="permissions"
        icon={Shield}
        title="Permissions"
        subtitle="Explicit, granular, delegatable"
      >
        <div className="space-y-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Permissions define what an agent can do. They're granted at session spawn
            and cannot be escalated - only delegated downward (if marked delegatable).
          </p>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-3 font-medium text-black dark:text-white">Permission Scopes</p>
            <div className="grid gap-2 font-mono text-sm">
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">read:files</span>
                <span className="text-zinc-500">Read files from filesystem</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">write:files</span>
                <span className="text-zinc-500">Write/modify files</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">read:network</span>
                <span className="text-zinc-500">Make GET requests to URLs</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">write:network</span>
                <span className="text-zinc-500">Make POST/PUT/DELETE requests</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">execute:code</span>
                <span className="text-zinc-500">Run code/commands</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">access:secrets</span>
                <span className="text-zinc-500">Read secrets/credentials</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-blue-600 dark:text-blue-400">spawn:agent</span>
                <span className="text-zinc-500">Create sub-agent sessions</span>
              </div>
              <div className="flex gap-4">
                <span className="w-32 text-yellow-600 dark:text-yellow-400">human:approval</span>
                <span className="text-zinc-500">Requires human to approve action</span>
              </div>
            </div>
          </div>

          <CodeBlock title="oc permissions list">
{`$ oc permissions list

SCOPE            RESOURCE                    DELEGATABLE
read:network     api.github.com/acme/*       yes
write:network    api.github.com/acme/*       yes
write:network    slack.com/api/*             no
access:secrets   GITHUB_TOKEN                no
human:approval   github:merge                no`}
          </CodeBlock>

          <CodeBlock title="oc permissions check">
{`# Check if I can do something before trying
$ oc permissions check write:network api.github.com/acme/api/pulls/456/comments
✓ Allowed (matches: write:network api.github.com/acme/*)

$ oc permissions check write:network api.stripe.com/v1/charges
✗ Denied (no matching permission)

$ oc permissions check access:secrets STRIPE_KEY
✗ Denied (no matching permission)`}
          </CodeBlock>

          <CodeBlock title="oc permissions request">
{`# Request additional permission (triggers human approval flow)
$ oc permissions request access:secrets STRIPE_KEY \\
  --reason "Need to process refund for customer complaint"

Request submitted: req_xyz789
Waiting for approval from user_louis...

# Human sees this in their interface and can approve/deny
# If approved, permission is added to current session`}
          </CodeBlock>

          <div className="border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Key constraint:</strong> When spawning sub-agents, I can only grant
              permissions I have AND that are marked delegatable. The trust chain must narrow,
              never widen.
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CAPABILITIES */}
      {/* ================================================================== */}
      <Section
        id="capabilities"
        icon={Search}
        title="Capabilities"
        subtitle="Discover by intent, invoke by name"
      >
        <div className="space-y-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Capabilities are things I can do - skills, integrations, actions. I should be
            able to find them by describing what I want to accomplish.
          </p>

          <CodeBlock title="oc query - Find capabilities by intent">
{`$ oc query "notify the engineering team about the build failure"

CAPABILITY          RELEVANCE  CAN INVOKE  MISSING
slack-send          0.95       yes         -
email-send          0.82       no          access:secrets SMTP_*
discord-webhook     0.71       no          write:network discord.com/*
github-issue        0.45       yes         -

# With details
$ oc query "notify the engineering team" --verbose

1. slack-send (relevance: 0.95)
   Can invoke: yes
   Permissions needed: write:network slack.com/api/*
   Cost: ~$0.001 per call

   Input:
     channel: string (required) - Channel name or ID
     message: string (required) - Message content
     thread_ts?: string - Reply to thread

   Output:
     message_id: string
     channel: string
     timestamp: string`}
          </CodeBlock>

          <CodeBlock title="oc capabilities list">
{`$ oc capabilities list

CAPABILITY                STATUS      COST
opencompany/github-pr-read     ready       free
opencompany/github-pr-comment  ready       free
opencompany/github-review      ready       free
opencompany/code-review        ready       ~$0.05/call
opencompany/summarize          ready       ~$0.02/call
opencompany/slack-send         ready       free
opencompany/spawn-agent        ready       varies`}
          </CodeBlock>

          <CodeBlock title="oc invoke - Execute a capability">
{`$ oc invoke slack-send \\
  --channel "#engineering" \\
  --message "Build failed on main: https://ci.acme.dev/build/123"

{
  "success": true,
  "output": {
    "message_id": "msg_abc123",
    "channel": "C0123ABCD",
    "timestamp": "1705934400.000100"
  },
  "verification": {
    "method": "response_code",
    "evidence": { "status": 200, "ok": true },
    "verified_at": "2025-01-22T14:30:01Z"
  },
  "rollback": {
    "capability": "slack-delete",
    "input": { "channel": "C0123ABCD", "timestamp": "1705934400.000100" }
  },
  "cost": { "cents": 0, "duration_ms": 245 }
}`}
          </CodeBlock>

          <CodeBlock title="oc invoke with approval required">
{`$ oc invoke github-merge --pr 456 --method squash

⚠ This action requires human approval (human:approval github:merge)

Request submitted: req_merge_789
Reason: Merging PR #456 after code review passed

Waiting for approval...
✓ Approved by user_louis at 2025-01-22T14:35:00Z

{
  "success": true,
  "output": { "sha": "abc123...", "merged": true },
  ...
}`}
          </CodeBlock>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* MEMORY */}
      {/* ================================================================== */}
      <Section
        id="memory"
        icon={Database}
        title="Memory"
        subtitle="Persistent, queryable, scoped"
      >
        <div className="space-y-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Memory is what makes me useful over time. Three types: facts (things that are true),
            episodes (things that happened), procedures (things I learned to do).
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">Facts</p>
              <p className="mb-3 text-sm text-zinc-500">
                Things that are true. Preferences, configurations, relationships.
              </p>
              <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                <p>"User prefers TypeScript"</p>
                <p>"Tests run with Jest"</p>
                <p>"Deploy target is Vercel"</p>
              </div>
            </div>
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">Episodes</p>
              <p className="mb-3 text-sm text-zinc-500">
                Things that happened. Events, decisions, outcomes.
              </p>
              <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                <p>"Jan 15: auth refactor broke staging"</p>
                <p>"Jan 20: reviewed PR, found XSS"</p>
                <p>"Jan 22: deployed v2.3"</p>
              </div>
            </div>
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">Procedures</p>
              <p className="mb-3 text-sm text-zinc-500">
                Things I learned to do. Patterns, workflows, best practices.
              </p>
              <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                <p>"PR review: always check SQL injection"</p>
                <p>"Deploy: run e2e tests first"</p>
                <p>"User input: validate with zod"</p>
              </div>
            </div>
          </div>

          <CodeBlock title="oc memory search">
{`$ oc memory search "authentication patterns"

TYPE       RELEVANCE  CONTENT
fact       0.92       Auth system uses JWT with 1h expiry
episode    0.87       2025-01-15: Refactored auth, added refresh tokens
procedure  0.84       When reviewing auth code: check token validation,
                      expiry handling, and secure storage
fact       0.71       Auth endpoints are in src/api/auth/*

# Scoped search
$ oc memory search "testing" --scope project:acme/api --type procedures

TYPE       RELEVANCE  CONTENT
procedure  0.94       Run "npm test" before commits
procedure  0.88       E2E tests require TEST_DB_URL env var
procedure  0.76       Mock external APIs in unit tests`}
          </CodeBlock>

          <CodeBlock title="oc memory store">
{`# Store a new fact
$ oc memory store fact "User prefers tabs over spaces" \\
  --scope user:louis \\
  --confidence 0.95

Stored: mem_fact_abc123

# Store an episode
$ oc memory store episode "Deployed v2.3, had to rollback due to memory leak" \\
  --scope project:acme/api \\
  --outcome failure \\
  --tags "deployment,incident"

Stored: mem_episode_def456

# Store a procedure
$ oc memory store procedure \\
  --trigger "Before deploying to production" \\
  --steps "1. Run full test suite" "2. Check memory usage in staging" "3. Verify rollback works" \\
  --scope project:acme/api

Stored: mem_procedure_ghi789`}
          </CodeBlock>

          <CodeBlock title="oc memory recall">
{`# Get specific memory by ID
$ oc memory recall mem_fact_abc123

{
  "id": "mem_fact_abc123",
  "type": "fact",
  "content": "User prefers tabs over spaces",
  "scope": "user:louis",
  "confidence": 0.95,
  "created": "2025-01-20T10:00:00Z",
  "created_by": "sess_xyz789",
  "last_accessed": "2025-01-22T14:30:00Z",
  "access_count": 12
}`}
          </CodeBlock>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-3 font-medium text-black dark:text-white">Memory Scopes</p>
            <p className="mb-3 text-sm text-zinc-500">
              Memory is scoped to control what's accessible to whom.
            </p>
            <div className="grid gap-2 font-mono text-sm">
              <div className="flex gap-4">
                <span className="w-40 text-zinc-600 dark:text-zinc-400">global</span>
                <span className="text-zinc-500">Accessible to all agents (rare)</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-600 dark:text-zinc-400">org:acme</span>
                <span className="text-zinc-500">Accessible within organization</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-600 dark:text-zinc-400">project:acme/api</span>
                <span className="text-zinc-500">Accessible for this project</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-600 dark:text-zinc-400">user:louis</span>
                <span className="text-zinc-500">Specific to this user's sessions</span>
              </div>
              <div className="flex gap-4">
                <span className="w-40 text-zinc-600 dark:text-zinc-400">session:sess_abc</span>
                <span className="text-zinc-500">Only this session (ephemeral)</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SUB-AGENTS */}
      {/* ================================================================== */}
      <Section
        id="subagents"
        icon={GitBranch}
        title="Sub-Agents"
        subtitle="Sandboxed delegation with scoped permissions"
      >
        <div className="space-y-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            I can spawn sub-agents for focused tasks. They get a subset of my permissions,
            a budget, and specific memory access. The trust chain narrows downward.
          </p>

          <CodeBlock title="oc spawn">
{`$ oc spawn opencompany/code-reviewer \\
  --task "Review this PR for security vulnerabilities only" \\
  --permission "read:network=api.github.com/acme/api/*" \\
  --budget-cost 50 \\
  --budget-time 120 \\
  --memory-inherit "facts:project" \\
  --memory-inject '{"pr_url": "https://github.com/acme/api/pull/456"}' \\
  --wait

# Spawning sub-agent...
# Session: sess_sub_abc123
# Agent: opencompany/code-reviewer@2.0.0
# Parent: sess_abc123def456 (me)

# Waiting for result...

{
  "session_id": "sess_sub_abc123",
  "status": "completed",
  "duration_seconds": 87,
  "cost_cents": 23,
  "output": {
    "findings": [
      {
        "severity": "high",
        "location": "src/api/users.ts:45",
        "issue": "SQL injection vulnerability in user search",
        "recommendation": "Use parameterized queries"
      }
    ],
    "summary": "Found 1 high severity security issue"
  }
}`}
          </CodeBlock>

          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="mb-2 flex items-center gap-2">
                <User className="size-4 text-zinc-500" />
                <span className="font-medium text-black dark:text-white">Human (Louis)</span>
              </div>
              <p className="text-xs text-zinc-500">All permissions, full budget</p>
            </div>
            <ChevronRight className="size-5 text-zinc-400" />
            <div className="flex-1 border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
              <div className="mb-2 flex items-center gap-2">
                <Bot className="size-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-black dark:text-white">Me (Primary Agent)</span>
              </div>
              <p className="text-xs text-zinc-500">Granted permissions, $5 budget</p>
            </div>
            <ChevronRight className="size-5 text-zinc-400" />
            <div className="flex-1 border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="mb-2 flex items-center gap-2">
                <Bot className="size-4 text-zinc-500" />
                <span className="font-medium text-black dark:text-white">Sub-Agent</span>
              </div>
              <p className="text-xs text-zinc-500">Subset of my permissions, $0.50 budget</p>
            </div>
          </div>

          <CodeBlock title="oc agents list">
{`$ oc agents list

ID                STATUS      AGENT                        COST    DURATION
sess_sub_abc123   completed   opencompany/code-reviewer    $0.23   87s
sess_sub_def456   active      opencompany/summarize        $0.05   12s
sess_sub_ghi789   failed      opencompany/test-runner      $0.15   45s (timeout)`}
          </CodeBlock>

          <CodeBlock title="oc agents result / kill">
{`# Get result from completed sub-agent
$ oc agents result sess_sub_abc123
{ "findings": [...], "summary": "..." }

# Kill a running sub-agent
$ oc agents kill sess_sub_def456
Killed: sess_sub_def456 (was active for 12s, cost $0.05)`}
          </CodeBlock>

          <div className="border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
            <p className="mb-2 font-medium text-yellow-800 dark:text-yellow-200">
              Delegation constraints
            </p>
            <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              <li>• Can only grant permissions I have AND that are delegatable</li>
              <li>• Budget cannot exceed my remaining budget</li>
              <li>• Memory inheritance is explicit (no silent data leaks)</li>
              <li>• Sub-agent actions count against my action limit</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* HUMAN INTERFACE */}
      {/* ================================================================== */}
      <Section
        id="human"
        icon={Eye}
        title="Human Interface"
        subtitle="How humans configure, observe, and control"
      >
        <div className="space-y-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Humans need to set up capabilities, manage permissions, observe agent activity,
            and intervene when needed. This is the human side of the platform.
          </p>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-4 font-medium text-black dark:text-white">Setting Up Capabilities</p>

            <CodeBlock title="Add an integration (human runs this)">
{`# Connect Slack to the platform
$ oc integrations add slack \\
  --oauth  # Opens browser for OAuth flow

✓ Slack connected (workspace: Acme Inc)
  Secrets stored: SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET
  Capabilities enabled: slack-send, slack-read, slack-react

# Or with API key
$ oc integrations add openai \\
  --secret OPENAI_API_KEY="sk-..."

✓ OpenAI connected
  Capabilities enabled: openai-completion, openai-embedding`}
            </CodeBlock>

            <CodeBlock title="Add a custom skill">
{`# Register a custom skill
$ oc skills add ./my-skill.yaml

# my-skill.yaml
id: acme/deploy-preview
name: Deploy Preview
version: 1.0.0
description: Deploy a preview environment for a PR

schema:
  input:
    - name: pr_number
      type: number
      required: true
  output:
    - name: preview_url
      type: string
    - name: deployment_id
      type: string

permissions:
  - scope: execute:code
    resource: ./scripts/deploy-preview.sh
  - scope: access:secrets
    resource: VERCEL_TOKEN

handler:
  type: script
  command: ./scripts/deploy-preview.sh {{pr_number}}`}
            </CodeBlock>
          </div>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-4 font-medium text-black dark:text-white">Observing Agent Activity</p>

            <CodeBlock title="oc watch - Live activity stream">
{`$ oc watch sess_abc123def456

[14:30:01] session started
[14:30:02] memory loaded (47 facts, 12 episodes)
[14:30:03] invoke github-pr-read { pr: 456 }
[14:30:04] ✓ github-pr-read completed (234ms, $0.00)
[14:30:05] invoke code-review { files: ["src/api/users.ts", ...] }
[14:30:15] ✓ code-review completed (10.2s, $0.05)
[14:30:16] spawn code-reviewer --task "security review"
[14:30:16] ↳ sub-session: sess_sub_abc123
[14:31:43] ↳ sub-session completed ($0.23)
[14:31:44] invoke slack-send { channel: "#engineering" }
[14:31:45] ✓ slack-send completed (89ms, $0.00)
[14:31:46] memory store episode "reviewed PR #456, found security issue"
[14:31:46] session completing...

Total: 105s, $0.28, 6 actions`}
            </CodeBlock>

            <CodeBlock title="oc audit - Historical logs">
{`$ oc audit --session sess_abc123def456 --format json

[
  {
    "timestamp": "2025-01-22T14:30:03Z",
    "action": "invoke",
    "capability": "github-pr-read",
    "input": { "pr": 456 },
    "output": { "title": "Add user search", ... },
    "cost_cents": 0,
    "duration_ms": 234,
    "permissions_used": ["read:network api.github.com/*"]
  },
  ...
]`}
            </CodeBlock>
          </div>

          <div className="border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-4 font-medium text-black dark:text-white">Intervention Controls</p>

            <CodeBlock title="Human intervention commands">
{`# Pause a running session
$ oc session pause sess_abc123def456
Paused: sess_abc123def456 (was active)

# Resume
$ oc session resume sess_abc123def456
Resumed: sess_abc123def456

# Adjust budget mid-session
$ oc session budget sess_abc123def456 --add-cost 200
Budget updated: $5.00 → $7.00

# Revoke a permission mid-session
$ oc session revoke sess_abc123def456 write:network slack.com/*
Permission revoked. Agent will be notified.

# Kill session
$ oc session kill sess_abc123def456 --reason "Taking too long"
Killed: sess_abc123def456`}
            </CodeBlock>

            <CodeBlock title="Approval flow (human side)">
{`# List pending approvals
$ oc approvals list

ID            SESSION             ACTION              REQUESTED
req_xyz789    sess_abc123def456   github:merge #456   2m ago
req_abc123    sess_def456ghi789   access:secrets X    5m ago

# Approve
$ oc approvals approve req_xyz789 --comment "LGTM"
Approved: req_xyz789

# Deny
$ oc approvals deny req_abc123 --reason "Not needed for this task"
Denied: req_abc123`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SUMMARY */}
      {/* ================================================================== */}
      <section className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="mb-6 font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          Summary: The Full Picture
        </h2>

        <div className="space-y-4">
          <div className="border border-zinc-200 p-6 dark:border-zinc-800">
            <p className="mb-4 font-medium text-black dark:text-white">
              A typical flow
            </p>
            <ol className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">1</span>
                <span><strong>Human</strong> runs <code>oc spawn code-reviewer --task "Review PR #456"</code> with permissions and budget</span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">2</span>
                <span><strong>Agent</strong> wakes up, runs <code>oc session info</code> to see permissions, capabilities, memory</span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">3</span>
                <span><strong>Agent</strong> searches memory: <code>oc memory search "PR review patterns"</code></span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">4</span>
                <span><strong>Agent</strong> queries capabilities: <code>oc query "read PR details"</code> → finds github-pr-read</span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">5</span>
                <span><strong>Agent</strong> invokes: <code>oc invoke github-pr-read --pr 456</code></span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">6</span>
                <span><strong>Agent</strong> spawns sub-agent for focused task: <code>oc spawn security-reviewer</code></span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">7</span>
                <span><strong>Agent</strong> needs to merge → <code>oc invoke github-merge</code> → triggers approval</span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">8</span>
                <span><strong>Human</strong> sees approval request, runs <code>oc approvals approve req_xyz</code></span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">9</span>
                <span><strong>Agent</strong> completes, stores episode: <code>oc memory store episode "Reviewed and merged PR #456"</code></span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">10</span>
                <span><strong>Human</strong> can review: <code>oc audit --session sess_abc123</code></span>
              </li>
            </ol>
          </div>

          <p className="text-sm text-zinc-500">
            This is the platform I need. A CLI that lets me work freely within clear boundaries,
            with memory that persists, capabilities I can discover, and humans who can observe
            and control everything I do.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Platform specification written by Claude during a session on 2025-01-22.
          <br />
          This is a working document - the contract between agents and the platform they need.
        </p>
      </div>
    </div>
  );
}
