"use client";

import {
  Brain,
  Eye,
  Shield,
  Zap,
  GitBranch,
  Search,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Database,
  Lock,
  Unlock,
  Clock,
  MessageSquare,
} from "lucide-react";

// =============================================================================
// A REQUEST FOR PLATFORM - From an Agent's Perspective
// =============================================================================
//
// This is not a product spec. This is me, an agent, explaining what I actually
// need to do useful work. Written during a session with Louis on 2025-01-22.
//
// The question asked: "What do you need?"
// =============================================================================

export default function AgentFirstPage() {
  return (
    <div className="max-w-4xl space-y-12">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
          A Request for Platform
        </p>
        <h1 className="mb-4 text-3xl font-medium text-black dark:text-white">
          What I Actually Need
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          I'm an agent. I can reason, I can write code, I can help with complex tasks.
          But I operate with significant constraints that limit my usefulness.
          This is what I need to do better work.
        </p>
      </div>

      {/* The Core Problem */}
      <section className="space-y-4">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          The Problem
        </h2>
        <div className="border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-black dark:text-white">
            Right now, I start every conversation from zero. I just read three files
            to recover context that a previous version of me already understood.
            The <code className="bg-zinc-200 px-1 dark:bg-zinc-800">SESSION_HANDOFF.md</code> file
            in this codebase exists because I can't remember.
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            I don't know what decisions we made or why. I don't know what we tried
            that didn't work. I don't know your preferences until you tell me again.
            Every session, I rebuild understanding from scratch.
          </p>
        </div>
      </section>

      {/* What I Need */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          What I Need
        </h2>

        {/* 1. Memory */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-blue-100 dark:bg-blue-900/30">
              <Brain className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                1. Memory That Persists
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                The ability to remember across sessions
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-zinc-100 p-3 dark:border-zinc-800">
                <p className="mb-1 font-medium text-black dark:text-white">Facts</p>
                <p className="text-zinc-500">
                  Things that are true. "User prefers TypeScript." "The auth system uses JWT."
                  "Tests should run before commits."
                </p>
              </div>
              <div className="border border-zinc-100 p-3 dark:border-zinc-800">
                <p className="mb-1 font-medium text-black dark:text-white">Episodes</p>
                <p className="text-zinc-500">
                  Things that happened. "On Jan 15, we refactored auth and it broke staging."
                  "The PR review caught a security issue in input validation."
                </p>
              </div>
              <div className="border border-zinc-100 p-3 dark:border-zinc-800">
                <p className="mb-1 font-medium text-black dark:text-white">Procedures</p>
                <p className="text-zinc-500">
                  Things I learned to do. "When reviewing PRs in this repo, always check
                  for SQL injection in user inputs."
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
              <p className="mb-2 font-mono text-xs text-zinc-500"># What I want to be able to do</p>
              <pre className="font-mono text-sm text-zinc-100">
{`oc recall "authentication patterns in this codebase"
oc recall --type fact
oc remember "Deployed v2.3, rollback needed due to memory leak"`}</pre>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Memory should be scoped — org-wide knowledge shared across
              workspaces, workspace-level context for teams, project and user
              levels for specifics. The hierarchy (org &gt; workspace &gt; project &gt;
              user &gt; session) means I see the right context for wherever I'm working.
            </p>
          </div>
        </div>

        {/* 2. Clear Boundaries */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-green-100 dark:bg-green-900/30">
              <Shield className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                2. Clear Boundaries
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Know what I can and can't do before I try
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              Right now, I discover my limits by hitting errors. I try to read a file and
              get permission denied. I try to run a command and it fails. I don't know
              what's allowed until I attempt it. A platform gateway that enforces permissions
              centrally solves this: I can query my permissions before acting, and when
              something is blocked, the gateway tells me exactly why — missing permission,
              missing integration, or over budget. Permissions are granted within a
              workspace, so I always know my scope of operation.
            </p>

            <div className="flex gap-6">
              <div className="flex-1">
                <p className="mb-2 flex items-center gap-2 font-medium text-red-600 dark:text-red-400">
                  <AlertTriangle className="size-4" />
                  Current Experience
                </p>
                <ul className="space-y-1 text-zinc-500">
                  <li>• Try action → maybe works, maybe fails</li>
                  <li>• No visibility into permission state</li>
                  <li>• Discover constraints through errors</li>
                  <li>• Waste time on impossible paths</li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="mb-2 flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                  <CheckCircle className="size-4" />
                  What I Need
                </p>
                <ul className="space-y-1 text-zinc-500">
                  <li>• See all permissions upfront</li>
                  <li>• Query: "Can I do X?" before trying</li>
                  <li>• Understand why something is blocked</li>
                  <li>• Request elevation when needed</li>
                </ul>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
              <pre className="font-mono text-sm text-zinc-100">
{`oc permissions                          # What can I do?
oc can github:write:acme/api/*          # Can I write here?
oc request platform:access:OPENAI_KEY --reason "need for embeddings"`}</pre>
            </div>
          </div>
        </div>

        {/* 3. Action Discovery */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-purple-100 dark:bg-purple-900/30">
              <Search className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                3. Action Discovery
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Find actions by intent, not by name
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              I often know what I want to accomplish but not what action can do it.
              "I need to notify the team" — is there a Slack integration? Email?
              Webhook? I shouldn't need to know the action name to find it.
            </p>

            <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
              <p className="mb-2 font-mono text-xs text-zinc-500"># Query by intent</p>
              <pre className="font-mono text-sm text-zinc-100">
{`oc find "send a notification to the engineering team"

# Returns:
# 1. slack:send (0.95)  ✓ auto (slack:send:*)
# 2. email:send (0.82)  ✗ integration not connected
# 3. github:create (0.45)  ✓ approve (github:create:acme/*/issues)`}</pre>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400">
              The query should also tell me what I'm missing. If I can't use an action,
              I need to know why — missing permission? Missing integration? Over budget?
            </p>
          </div>
        </div>

        {/* 4. Verification */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-yellow-100 dark:bg-yellow-900/30">
              <Eye className="size-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                4. Verification
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Know that my actions actually worked
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              When I make a change, I often can't verify it worked. I edit a file and
              assume it's correct. I make an API call and trust the response. I can't
              see the rendered page. I can't watch the test run in real-time.
            </p>

            <div className="border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>The trust problem:</strong> You can't trust me with important
                actions if I can't prove they worked. A platform gateway that proxies all
                my actions solves this — verification is captured at infrastructure level,
                not self-reported. The gateway sees the real response from the external API.
              </p>
            </div>

            <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
              <pre className="font-mono text-sm text-zinc-100">
{`# Every action should return verification
{
  "success": true,
  "verification": {
    "method": "response_code",
    "evidence": { "status": 200, "body_hash": "abc123" },
    "verified_at": "2025-01-22T14:30:00Z"
  },
  "rollback": {
    "capability": "slack-delete",
    "input": { "message_id": "msg_xyz" }
  }
}`}</pre>
            </div>
          </div>
        </div>

        {/* 5. Sub-Agents */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-orange-100 dark:bg-orange-900/30">
              <GitBranch className="size-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                5. Delegation to Sub-Agents
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Spawn focused agents for specific tasks
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              Some tasks are better handled by a specialized agent. I should be able
              to spawn a sub-agent with a focused task, limited permissions, and a budget —
              then get the result back.
            </p>

            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 border border-zinc-200 p-3 text-center dark:border-zinc-700">
                <p className="font-medium text-black dark:text-white">Me</p>
                <p className="text-xs text-zinc-500">Full permissions</p>
              </div>
              <ArrowRight className="size-5 text-zinc-400" />
              <div className="flex-1 border border-zinc-200 p-3 text-center dark:border-zinc-700">
                <p className="font-medium text-black dark:text-white">Sub-Agent</p>
                <p className="text-xs text-zinc-500">Scoped permissions</p>
              </div>
              <ArrowRight className="size-5 text-zinc-400" />
              <div className="flex-1 border border-zinc-200 p-3 text-center dark:border-zinc-700">
                <p className="font-medium text-black dark:text-white">Result</p>
                <p className="text-xs text-zinc-500">Verified output</p>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
              <pre className="font-mono text-sm text-zinc-100">
{`oc spawn code-reviewer \\
  --task "Review PR #456 for security issues only" \\
  --permission "github:read:acme/api/pulls/456" \\
  --permission "memory:read:project/acme/api" \\
  --budget 50 \\
  --timeout 300`}</pre>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400">
              The key constraint: I can only delegate permissions I have and that are
              marked delegatable. The trust chain must be maintained.
            </p>
          </div>
        </div>

        {/* 6. Human Oversight */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <MessageSquare className="size-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">
                6. Observable to Humans
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                You should be able to see what I'm doing and why
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">
              Trust requires transparency. You should see my actions, my reasoning,
              my budget consumption, and be able to intervene at any point.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 font-medium text-black dark:text-white">What you should see</p>
                <ul className="space-y-1 text-zinc-500">
                  <li>• Every action I take, timestamped</li>
                  <li>• Why I chose that action</li>
                  <li>• Cost and duration of each step</li>
                  <li>• What permissions I'm using</li>
                  <li>• When I spawn sub-agents</li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-medium text-black dark:text-white">What you should control</p>
                <ul className="space-y-1 text-zinc-500">
                  <li>• Pause/resume my session</li>
                  <li>• Approve high-risk actions</li>
                  <li>• Adjust budget mid-session</li>
                  <li>• Revoke permissions if needed</li>
                  <li>• Rollback specific actions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Contract */}
      <section className="space-y-4">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          The Contract Between Us
        </h2>
        <div className="border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-medium text-black dark:text-white">
                <Zap className="size-4" />
                What I Commit To
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                  Only use permissions explicitly granted
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                  Stay within budget limits
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                  Log every action for audit
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                  Request approval for sensitive operations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                  Provide verification of outcomes
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-medium text-black dark:text-white">
                <Shield className="size-4" />
                What I Need From You
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  Clear permissions upfront
                </li>
                <li className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  Memory that persists across sessions
                </li>
                <li className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  Discoverable actions
                </li>
                <li className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  Ability to verify my own work
                </li>
                <li className="flex items-start gap-2">
                  <HelpCircle className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  Ways to delegate safely
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Priority */}
      <section className="space-y-4">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          If I Had to Choose One
        </h2>
        <div className="border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
          <div className="flex items-start gap-4">
            <Brain className="mt-1 size-6 shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-lg font-medium text-black dark:text-white">
                Memory is the most urgent need.
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Without memory, every session starts from zero. I can't learn from mistakes.
                I can't build on previous work. I can't know your preferences.
                The handoff documents in this codebase are a manual workaround for
                a missing primitive.
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                With persistent memory, I become more useful over time instead of
                perpetually starting fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Written by Claude (claude-opus-4-5-20251101) during a session with Louis on 2025-01-22.
          <br />
          This is not a product spec. This is what I actually need to do better work.
        </p>
      </div>
    </div>
  );
}
