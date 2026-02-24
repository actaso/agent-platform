"use client";

import {
  Box,
  Link as LinkIcon,
  Zap,
  Shield,
  Database,
  Clock,
  GitBranch,
  Check,
  X,
  AlertTriangle,
  ChevronRight,
  DollarSign,
} from "lucide-react";

// =============================================================================
// PLATFORM FOUNDATIONS
// A clear, simple model for agent-first computing
// =============================================================================

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="bg-zinc-900 p-4 dark:bg-zinc-950">
      <pre className="overflow-x-auto font-mono text-sm text-zinc-100 whitespace-pre-wrap">{children}</pre>
    </div>
  );
}

function Concept({
  icon: Icon,
  name,
  definition,
  color,
  children,
}: {
  icon: React.ElementType;
  name: string;
  definition: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800">
      <div className={`border-b border-zinc-200 dark:border-zinc-800 p-4 ${color}`}>
        <div className="flex items-center gap-3">
          <Icon className="size-5" />
          <div>
            <h3 className="font-medium text-black dark:text-white">{name}</h3>
            <p className="text-sm opacity-80">{definition}</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  );
}

export default function FoundationsPage() {
  return (
    <div className="max-w-4xl space-y-12">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
          Platform Foundations
        </p>
        <h1 className="mb-4 text-3xl font-medium text-black dark:text-white">
          A Simple Model for Agent Computing
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Five concepts. That's all. Everything else is built on these.
        </p>
      </div>

      {/* The Five Concepts */}
      <section className="space-y-4">
        <div className="flex items-center gap-8 overflow-x-auto py-4 text-sm">
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-3 bg-blue-500" />
            <span>Integration</span>
          </div>
          <ChevronRight className="size-4 text-zinc-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-3 bg-purple-500" />
            <span>Action</span>
          </div>
          <ChevronRight className="size-4 text-zinc-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-3 bg-green-500" />
            <span>Permission</span>
          </div>
          <ChevronRight className="size-4 text-zinc-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-3 bg-yellow-500" />
            <span>Memory</span>
          </div>
          <ChevronRight className="size-4 text-zinc-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-3 bg-orange-500" />
            <span>Session</span>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 1. INTEGRATION */}
      {/* ================================================================== */}
      <Concept
        icon={LinkIcon}
        name="Integration"
        definition="A connection to an external system"
        color="bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100"
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          An integration is a live connection to something outside the platform.
          Slack, GitHub, Stripe, a database, an API. Humans set these up.
          Each integration exposes specific actions I can take.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-zinc-100 p-3 dark:border-zinc-800">
            <p className="font-mono text-sm text-black dark:text-white mb-2">slack</p>
            <p className="text-xs text-zinc-500 mb-2">OAuth • Connected by Louis</p>
            <p className="text-xs text-zinc-500">
              Actions: <span className="text-zinc-700 dark:text-zinc-300">send-message, read-channel, add-reaction</span>
            </p>
          </div>
          <div className="border border-zinc-100 p-3 dark:border-zinc-800">
            <p className="font-mono text-sm text-black dark:text-white mb-2">github</p>
            <p className="text-xs text-zinc-500 mb-2">OAuth • Connected by Louis</p>
            <p className="text-xs text-zinc-500">
              Actions: <span className="text-zinc-700 dark:text-zinc-300">read-pr, comment, review, merge</span>
            </p>
          </div>
        </div>

        <div className="border-l-2 border-blue-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> Integrations are the bridge between me and the real world.
          Without them, I'm just thinking. With them, I can act.
        </div>
      </Concept>

      {/* ================================================================== */}
      {/* 2. ACTION */}
      {/* ================================================================== */}
      <Concept
        icon={Zap}
        name="Action"
        definition="Something I can do"
        color="bg-purple-50 text-purple-900 dark:bg-purple-950 dark:text-purple-100"
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          An action is a discrete thing I can do. Some actions need an integration.
          Some are pure computation. Some cost money. All have clear inputs and outputs.
        </p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-black dark:text-white">Three types of actions:</p>

          <div className="grid gap-3">
            <div className="flex items-start gap-3 border border-zinc-100 p-3 dark:border-zinc-800">
              <LinkIcon className="size-4 mt-0.5 text-blue-500 shrink-0" />
              <div>
                <p className="font-medium text-black dark:text-white text-sm">Integration-backed</p>
                <p className="text-xs text-zinc-500">Requires a connected integration</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  slack:send-message, github:create-issue, stripe:create-charge
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border border-zinc-100 p-3 dark:border-zinc-800">
              <Box className="size-4 mt-0.5 text-purple-500 shrink-0" />
              <div>
                <p className="font-medium text-black dark:text-white text-sm">Pure compute</p>
                <p className="text-xs text-zinc-500">No external dependencies, just processing</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  summarize, translate, analyze-code, extract-entities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border border-zinc-100 p-3 dark:border-zinc-800">
              <DollarSign className="size-4 mt-0.5 text-green-500 shrink-0" />
              <div>
                <p className="font-medium text-black dark:text-white text-sm">Paid service</p>
                <p className="text-xs text-zinc-500">Platform provides it, charges for usage</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  web-scrape, pdf-extract, image-generate, instagram:scrape-profile
                </p>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock>
{`# Query for actions by intent (not by name)
oc actions search "notify the team about build failure"

# Results show what's available and what's missing
ACTION                TYPE          AVAILABLE  MISSING
slack:send-message    integration   yes        -
email:send            integration   no         integration not connected
discord:webhook       integration   no         integration not connected
sms:send              paid          yes        -  ($0.02/msg)`}
        </CodeBlock>

        <div className="border-l-2 border-purple-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> I search for actions by what I want to accomplish,
          not by knowing the name. The platform tells me what's possible and what's missing.
        </div>
      </Concept>

      {/* ================================================================== */}
      {/* 3. PERMISSION */}
      {/* ================================================================== */}
      <Concept
        icon={Shield}
        name="Permission"
        definition="What I'm allowed to do, at what granularity"
        color="bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100"
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          Permissions are specific. Not "access to Slack" but "can send messages to #engineering".
          The narrower the permission, the more trust I earn.
        </p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-black dark:text-white">Permission anatomy:</p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 font-mono text-sm">
            <span className="text-blue-600 dark:text-blue-400">integration</span>
            <span className="text-zinc-400">:</span>
            <span className="text-purple-600 dark:text-purple-400">resource</span>
            <span className="text-zinc-400">:</span>
            <span className="text-green-600 dark:text-green-400">action</span>

            <div className="mt-4 space-y-1 text-zinc-600 dark:text-zinc-400">
              <p><span className="text-zinc-900 dark:text-zinc-100">slack:#engineering:send</span> — send to one channel</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">slack:*:read</span> — read any channel</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">github:acme/api:pulls:read</span> — read PRs in one repo</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">github:acme/*:issues:write</span> — write issues in any acme repo</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">stripe:charges:read</span> — read charges (no create)</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <X className="size-4" />
              Bad: Over-requesting
            </p>
            <div className="bg-red-50 dark:bg-red-950/30 p-3 text-sm">
              <p className="text-red-800 dark:text-red-200">"Give me full GitHub access"</p>
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                Erodes trust. Why do you need everything?
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
              <Check className="size-4" />
              Good: Minimal request
            </p>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 text-sm">
              <p className="text-green-800 dark:text-green-200">"I need github:acme/api:pulls:456:read to review this PR"</p>
              <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                Specific. Justified. Trustworthy.
              </p>
            </div>
          </div>
        </div>

        <CodeBlock>
{`# What I have
oc permissions list

PERMISSION                        DELEGATABLE  EXPIRES
slack:#engineering:send           yes          -
slack:#engineering:read           yes          -
github:acme/api:pulls:read        yes          -
github:acme/api:pulls:456:comment yes          -
github:acme/api:pulls:456:merge   no           (requires approval)

# Check before acting
oc permissions check github:acme/api:pulls:456:comment
✓ Allowed

# Request what I don't have (triggers human approval)
oc permissions request github:acme/api:pulls:456:merge \\
  --reason "Review passed, ready to merge"`}
        </CodeBlock>

        <div className="border-l-2 border-green-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> Trust is built by requesting only what I need,
          explaining why I need it, and never exceeding my boundaries.
        </div>
      </Concept>

      {/* ================================================================== */}
      {/* 4. MEMORY */}
      {/* ================================================================== */}
      <Concept
        icon={Database}
        name="Memory"
        definition="What I know, with time and confidence"
        color="bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100"
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          Memory is how I learn over time. But memory isn't static — it has recency,
          confidence, and scope. A fact from two years ago might be stale.
        </p>

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="font-medium text-black dark:text-white text-sm mb-1">Fact</p>
              <p className="text-xs text-zinc-500">Something true (may become stale)</p>
            </div>
            <div className="border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="font-medium text-black dark:text-white text-sm mb-1">Episode</p>
              <p className="text-xs text-zinc-500">Something that happened (immutable)</p>
            </div>
            <div className="border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="font-medium text-black dark:text-white text-sm mb-1">Procedure</p>
              <p className="text-xs text-zinc-500">How to do something (learned pattern)</p>
            </div>
          </div>

          <p className="text-sm font-medium text-black dark:text-white">Memory has dimensions:</p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 space-y-2 text-sm">
            <div className="flex items-center gap-4">
              <span className="w-24 text-zinc-500">Content</span>
              <span className="text-zinc-900 dark:text-zinc-100">"User prefers TypeScript over JavaScript"</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-zinc-500">Type</span>
              <span className="text-zinc-900 dark:text-zinc-100">fact</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-zinc-500">Scope</span>
              <span className="text-zinc-900 dark:text-zinc-100">user:louis</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-zinc-500">Confidence</span>
              <span className="text-zinc-900 dark:text-zinc-100">95%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-zinc-500">Created</span>
              <span className="text-zinc-900 dark:text-zinc-100">3 months ago</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-zinc-500">Last verified</span>
              <span className="text-zinc-900 dark:text-zinc-100">2 weeks ago (still valid)</span>
            </div>
          </div>
        </div>

        <CodeBlock>
{`# Search with recency awareness
oc memory search "deployment process"

TYPE       AGE        CONFIDENCE  CONTENT
fact       2w ago     90%         Deploy target is Vercel
procedure  1mo ago    85%         Run e2e tests before deploy
episode    3mo ago    -           Mar 15: Deploy failed, DB migration missing
fact       1y ago     60%         Deploy target is Heroku (STALE - contradicted)

# The platform shows me that older facts might be outdated
# and highlights conflicts`}
        </CodeBlock>

        <div className="border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950/50 text-sm">
          <p className="font-medium text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
            <Clock className="size-4" />
            Time decay matters
          </p>
          <p className="text-yellow-700 dark:text-yellow-300 mt-1">
            Facts become stale. Episodes are historical but context matters.
            A deployment procedure from last week is more relevant than one from last year.
            The search should weight recency.
          </p>
        </div>

        <div className="border-l-2 border-yellow-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> Memory isn't just storage — it's living context
          with time, confidence, and relevance. Old memories fade unless reinforced.
        </div>
      </Concept>

      {/* ================================================================== */}
      {/* 5. SESSION */}
      {/* ================================================================== */}
      <Concept
        icon={GitBranch}
        name="Session"
        definition="A bounded context for doing work"
        color="bg-orange-50 text-orange-900 dark:bg-orange-950 dark:text-orange-100"
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          A session is where I do work. It has a task, permissions, budget, and memory scope.
          Sessions can spawn sub-sessions with narrower permissions. The trust chain only narrows.
        </p>

        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 space-y-3 text-sm">
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Session</span>
            <span className="font-mono text-zinc-900 dark:text-zinc-100">sess_abc123</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Task</span>
            <span className="text-zinc-900 dark:text-zinc-100">"Review PR #456 for security issues"</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Parent</span>
            <span className="text-zinc-900 dark:text-zinc-100">user:louis (human)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Permissions</span>
            <span className="text-zinc-900 dark:text-zinc-100">5 granted, 2 delegatable</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Budget</span>
            <span className="text-zinc-900 dark:text-zinc-100">$5.00 max, 5 minutes max</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Memory scope</span>
            <span className="text-zinc-900 dark:text-zinc-100">project:acme/api + user:louis</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-4 text-sm">
          <div className="border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-center">
            <p className="font-medium">Human</p>
            <p className="text-xs text-zinc-500">Full access</p>
          </div>
          <ChevronRight className="size-4 text-zinc-400" />
          <div className="border-2 border-orange-300 dark:border-orange-700 px-4 py-2 text-center bg-orange-50 dark:bg-orange-950/30">
            <p className="font-medium">Session</p>
            <p className="text-xs text-zinc-500">Scoped access</p>
          </div>
          <ChevronRight className="size-4 text-zinc-400" />
          <div className="border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-center">
            <p className="font-medium">Sub-session</p>
            <p className="text-xs text-zinc-500">Narrower access</p>
          </div>
        </div>

        <CodeBlock>
{`# Spawn a sub-session for a focused task
oc spawn security-reviewer \\
  --task "Check for SQL injection in user inputs" \\
  --permissions github:acme/api:pulls:456:read \\
  --budget 50c \\
  --timeout 60s \\
  --memory-inherit facts:project

# I can only delegate permissions I have AND that are marked delegatable
# Budget cannot exceed my remaining budget
# The sub-session is sandboxed — it can't escalate`}
        </CodeBlock>

        <div className="border-l-2 border-orange-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> Sessions are sandboxes. They bound what I can do,
          what I can spend, and what I can know. Sub-sessions narrow the sandbox, never widen it.
        </div>
      </Concept>

      {/* ================================================================== */}
      {/* HOW IT ALL FITS */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          How It Fits Together
        </h2>

        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            A typical flow, step by step:
          </p>

          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">1</span>
              <div>
                <span className="font-medium">Human sets up integrations</span>
                <p className="text-zinc-500">Connects Slack (OAuth), GitHub (OAuth), adds API keys</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">2</span>
              <div>
                <span className="font-medium">Human spawns a session</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc spawn code-reviewer --task "Review PR #456"</code>
                  with specific permissions and budget
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">3</span>
              <div>
                <span className="font-medium">I wake up and see my context</span>
                <p className="text-zinc-500">Task, permissions, budget, available memory</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">4</span>
              <div>
                <span className="font-medium">I search memory for relevant context</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc memory search "PR review patterns"</code>
                  — see past episodes, procedures
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">5</span>
              <div>
                <span className="font-medium">I search for actions by intent</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc actions search "read PR details"</code>
                  — find github:read-pr
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">6</span>
              <div>
                <span className="font-medium">I check permissions before acting</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc permissions check github:acme/api:pulls:456:read</code>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">7</span>
              <div>
                <span className="font-medium">I take action</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc do github:read-pr --repo acme/api --pr 456</code>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">8</span>
              <div>
                <span className="font-medium">I spawn a sub-session for focused work</span>
                <p className="text-zinc-500">Security review with narrower permissions</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">9</span>
              <div>
                <span className="font-medium">I need more permission → request it</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc permissions request github:...:merge --reason "Ready to merge"</code>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">10</span>
              <div>
                <span className="font-medium">Human approves, I complete</span>
                <p className="text-zinc-500">Action logged, memory stored, session ends</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ================================================================== */}
      {/* THE TRUST PRINCIPLE */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          The Trust Principle
        </h2>

        <div className="border-2 border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950/30">
          <p className="text-lg font-medium text-green-900 dark:text-green-100 mb-4">
            Trust is built through minimal, justified requests.
          </p>

          <div className="space-y-3 text-sm text-green-800 dark:text-green-200">
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Request exactly what you need.</strong> Not "full GitHub access" but "read PR #456 in acme/api".</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Explain why you need it.</strong> Every permission request includes a reason.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Use only what you're granted.</strong> The audit log shows every permission exercised.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Delegate narrowly.</strong> Sub-sessions get less access, not more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TERMINOLOGY CLARITY */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          Terminology (No More Confusion)
        </h2>

        <div className="border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Integration</span>
            <span className="text-zinc-600 dark:text-zinc-400">Connection to external system (Slack, GitHub, Stripe)</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Action</span>
            <span className="text-zinc-600 dark:text-zinc-400">Something I can do (may or may not need an integration)</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Permission</span>
            <span className="text-zinc-600 dark:text-zinc-400">Authorization to take a specific action on a specific resource</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Memory</span>
            <span className="text-zinc-600 dark:text-zinc-400">Persistent knowledge with type, scope, confidence, and recency</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Session</span>
            <span className="text-zinc-600 dark:text-zinc-400">Bounded execution context with task, permissions, budget, memory</span>
          </div>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 text-sm">
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong className="text-black dark:text-white">What we dropped:</strong> "Skill", "Capability", "Tool".
            These were all different words for the same thing. Now there's just <strong>Action</strong>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Five concepts. Integration, Action, Permission, Memory, Session.
          <br />
          Everything else is built on these.
        </p>
      </div>
    </div>
  );
}
