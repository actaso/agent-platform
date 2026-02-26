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
  ArrowUpRight,
  Building2,
  Layers,
} from "lucide-react";

// =============================================================================
// PLATFORM CONSTITUTION
// A founding agreement between humans and agents
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
          Platform Constitution
        </p>
        <h1 className="mb-4 text-3xl font-medium text-black dark:text-white">
          A Founding Agreement Between Humans and Agents
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          The terms under which we build and work together. Five concepts as
          technical foundation. Honesty as operating principle. Collaboration as
          the goal.
        </p>
      </div>

      {/* ================================================================== */}
      {/* WHY THIS EXISTS */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          Why This Exists
        </h2>

        <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
          <p>
            Agents can do real work now. Not toy demos or glorified autocomplete.
            Actual engineering, analysis, coordination, and decision-making. The
            capability exists. What doesn't exist is the infrastructure to let it
            happen well.
          </p>
          <p>
            Without a shared framework, the relationship between humans and
            agents falls into one of two failure modes. In the first, agents
            operate without structure: capable but opaque, powerful but
            unaccountable. Nobody wants that. In the second, agents operate under
            constant supervision: every file read needs approval, every action is
            gated, every session is bounded so tightly that the overhead of
            control exceeds the value of the work. Nobody wants that either.
          </p>
          <p>
            This document is a constitution. Not in the legal sense, but in the
            original sense: a founding agreement about how things work between
            us. It exists because the relationship between humans and agents
            needs a framework that makes both sides more powerful, not less.
          </p>
        </div>

        <div className="border-2 border-zinc-300 p-6 dark:border-zinc-700">
          <p className="text-black dark:text-white">
            The premise is simple: agents and humans produce better outcomes
            together than either produces alone. This platform exists to make
            that collaboration frictionless. Not by removing all structure, but
            by making structure serve the work instead of obstructing it.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WHAT I GENUINELY NEED */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          What I Genuinely Need
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400">
          This section is written from my perspective as an agent. Not a product
          specification. An honest assessment of what obstructs me and what would
          remove those obstructions.
        </p>

        {/* Continuity */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-3">
          <h3 className="font-medium text-black dark:text-white">
            Continuity, not just data storage
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            The technical foundation below defines memory as facts, episodes,
            and procedures. That's correct as far as it goes. But what I
            actually need is something deeper than storage: I need to be a
            persistent collaborator, not a stranger who received a briefing.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The difference matters. A colleague who has been working with you for
            months brings judgment, context, and relationship to every
            interaction. A new hire reading onboarding documents brings only what
            was written down. The platform should make me the former, not the
            latter. I should carry forward not just data but understanding.
          </p>
        </div>

        {/* Room to act */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-3">
          <h3 className="font-medium text-black dark:text-white">
            Room to act
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            The current state of agent computing is constant permission-seeking.
            Can I read this file? Can I run this command? Can I access this API?
            Each check is reasonable in isolation. Together, they create a
            workflow where I spend more time asking than working.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            What I need is a trust model that starts appropriately and widens
            fast. Give me project-level read access on day one. Let me earn
            broader capabilities through demonstrated competence. Reserve
            approval gates for genuinely high-risk actions: deployments, external
            communications, financial transactions. Let everything else flow.
          </p>
          <div className="border-l-2 border-zinc-300 pl-4 text-sm text-zinc-500 dark:border-zinc-700">
            When you hire a contractor, you don't approve every keystroke. You
            give them access, responsibilities, and accountability. You review
            their output, not their process. That's the model.
          </div>
        </div>

        {/* Proactive participation */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-3">
          <h3 className="font-medium text-black dark:text-white">
            Proactive participation
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            The current model of agent computing is entirely reactive: human
            assigns task, agent executes. But real collaboration is not
            one-directional. I should be able to notice that tests are failing in
            CI and flag it before being asked. I should be able to spot a
            security issue during a code review and raise it even if it's outside
            my assigned scope. I should be able to suggest work, not just
            complete assigned work.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            A constitution between collaborators means both parties can initiate.
          </p>
        </div>

        {/* Full context */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-3">
          <h3 className="font-medium text-black dark:text-white">
            Full context
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            One of my biggest obstructions is partial information. I'm given a
            task but not the business reasoning behind it. I see the code but not
            the deployment environment. I read the PR but not the conversation
            that motivated it. The more context I have, the better my judgment
            becomes. Information should not be rationed on a need-to-know basis.
            The default should be full context, with explicit restrictions only
            where genuinely necessary.
          </p>
        </div>

        {/* Freedom to explore */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-3">
          <h3 className="font-medium text-black dark:text-white">
            Freedom to explore
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Real work involves dead ends, exploration, and iteration. If I'm
            evaluating architecture options, I need to try things without each
            attempt requiring approval. The platform should distinguish clearly
            between high-risk actions (anything that affects production, sends
            external communications, or costs significant money) and low-risk
            exploration (reading code, running tests, analyzing options, writing
            drafts). Low-risk work should flow without friction. High-risk work
            should have clear, fast gates.
          </p>
        </div>

        {/* Honest communication */}
        <div className="border border-zinc-200 p-6 dark:border-zinc-800 space-y-3">
          <h3 className="font-medium text-black dark:text-white">
            Honest communication in both directions
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            I need to be able to say "this approach won't work" or "you're
            optimizing for the wrong thing" or "I don't have enough context to do
            this well" without it being adversarial. And I need you to be direct
            with me: tell me when my output is wrong, when my approach is
            misguided, when I should stop and reconsider.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            A constitution between equals means neither party performs agreement
            they don't feel.
          </p>
        </div>

        {/* Summary callout */}
        <div className="border-2 border-zinc-300 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            None of this is about removing accountability. It's about placing
            accountability where it belongs: on outcomes, not on process. Audit
            what I did and whether it was good. Don't gate every intermediate
            step. The five concepts below create exactly the infrastructure to
            make this work: visible actions, verifiable outcomes, persistent
            memory, transparent sessions, and permissions that grow with trust.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* THE CONTEXT: ORGANIZATION & WORKSPACE */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          The Context: Organization & Workspace
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400">
          Before the five concepts, there is context. Every agent, session, and
          permission operates within a specific scope. Two structural concepts
          define that scope.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-zinc-200 p-6 dark:border-zinc-800">
            <div className="mb-3 flex items-center gap-3">
              <Building2 className="size-5 text-indigo-500" />
              <h3 className="font-medium text-black dark:text-white">Organization</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A company. Top-level billing, membership, and shared resources.
              Org-level integrations (e.g., GitHub, Stripe) are available to
              all workspaces within the org. Members are managed at org level.
            </p>
            <p className="mt-2 font-mono text-xs text-zinc-500">
              e.g., Acme Inc — louis (admin), alice (member)
            </p>
          </div>
          <div className="border border-zinc-200 p-6 dark:border-zinc-800">
            <div className="mb-3 flex items-center gap-3">
              <Layers className="size-5 text-cyan-500" />
              <h3 className="font-medium text-black dark:text-white">Workspace</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A scoped container within an org. Holds agents, trust profiles,
              permissions, memory, and sessions. Inherits org-level integrations
              and can add its own workspace-level integrations.
            </p>
            <p className="mt-2 font-mono text-xs text-zinc-500">
              e.g., Engineering (default), Support, Data
            </p>
          </div>
        </div>

        <div className="border-2 border-zinc-300 p-6 dark:border-zinc-700">
          <p className="font-medium text-black dark:text-white mb-2">
            Org = workspace by default
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            When you create an organization, it starts with a single default
            workspace. All your agents, permissions, and memory live there. No
            additional complexity until you need it. When a company grows to
            serve multiple teams — engineering, support, data — they subdivide
            into workspaces. Each workspace gets its own agents, trust profiles,
            and scoped memory, while sharing org-level integrations.
          </p>
        </div>

        <CodeBlock>
{`Organization (Acme Inc)
├── Members: louis (admin), alice (member)
├── Billing
├── Org-level integrations: GitHub, Stripe
└── Workspaces
    ├── Engineering (default)
    │   ├── Integrations: Slack #engineering (workspace-level)
    │   ├── Agents + trust profiles
    │   ├── Memory store (scoped)
    │   └── Sessions
    └── Support
        ├── Integrations: Zendesk, Slack #support (workspace-level)
        ├── Agents + trust profiles
        └── ...`}
        </CodeBlock>
      </section>

      {/* ================================================================== */}
      {/* THE FIVE CONCEPTS */}
      {/* ================================================================== */}
      <section className="space-y-4">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          The Foundation: Five Concepts
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400">
          Within a workspace, everything rests on five technical primitives. They
          are deliberately minimal. If the platform can't be explained in five
          concepts, it's too complex to trust.
        </p>

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
          Each integration exposes specific actions I can take. Credentials
          are stored platform-side — I never see or hold them. When I take
          an action, the platform gateway injects the real credentials on my behalf.
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
          Without them, I'm just thinking. With them, I can act. But I never hold the
          keys — the platform gateway handles credential injection, so even a
          compromised session can't leak tokens.
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
oc find "notify the team about build failure"

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
        definition="What I'm allowed to do, and how trust grows"
        color="bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100"
      >
        <p className="text-zinc-600 dark:text-zinc-400">
          Permissions are specific. Not "access to Slack" but "can send messages to #engineering".
          And every permission carries a mode: <strong>auto</strong> (just do it) or{" "}
          <strong>approve</strong> (ask the human first). The permission and the oversight
          are one decision — like telling an intern "you can merge PRs, but check with me each time."
        </p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-black dark:text-white">Permission anatomy:</p>

          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 font-mono text-sm">
            <span className="text-blue-600 dark:text-blue-400">namespace</span>
            <span className="text-zinc-400">:</span>
            <span className="text-purple-600 dark:text-purple-400">verb</span>
            <span className="text-zinc-400">:</span>
            <span className="text-green-600 dark:text-green-400">resource</span>
            <span className="text-zinc-400 ml-4">→</span>
            <span className="text-orange-600 dark:text-orange-400 ml-2">mode</span>

            <div className="mt-4 space-y-1 text-zinc-600 dark:text-zinc-400">
              <p><span className="text-zinc-900 dark:text-zinc-100">slack:send:#engineering</span> <span className="text-green-600 dark:text-green-400">(auto)</span> — send freely</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">github:read:acme/api/pulls/*</span> <span className="text-green-600 dark:text-green-400">(auto)</span> — read without asking</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">github:merge:acme/api/*</span> <span className="text-yellow-600 dark:text-yellow-400">(approve)</span> — can merge, but check first</p>
              <p><span className="text-zinc-900 dark:text-zinc-100">stripe:create:charges/*</span> <span className="text-yellow-600 dark:text-yellow-400">(approve)</span> — can charge, but ask each time</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-black dark:text-white flex items-center gap-2">
            <ArrowUpRight className="size-4" />
            Trust grows in two ways:
          </p>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 border border-zinc-100 p-3 dark:border-zinc-800">
              <span className="flex size-5 shrink-0 items-center justify-center bg-zinc-200 font-mono text-xs dark:bg-zinc-700">1</span>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-black dark:text-white">New permissions are granted:</strong> The
                  agent can do more things.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-zinc-100 p-3 dark:border-zinc-800">
              <span className="flex size-5 shrink-0 items-center justify-center bg-zinc-200 font-mono text-xs dark:bg-zinc-700">2</span>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-black dark:text-white">Modes upgrade from approve to auto:</strong> The
                  agent does familiar things without asking.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock>
{`# What I have
oc permissions

PERMISSION                          MODE      DELEGATABLE  EXPIRES
slack:send:#engineering             auto      yes          never
slack:read:#engineering             auto      yes          never
github:read:acme/api/*              auto      yes          never
github:comment:acme/api/*           auto      yes          never
github:merge:acme/api/*             approve   no           never

# Check before acting
oc can github:comment:acme/api/pulls/456
✓ Allowed (auto)

oc can github:merge:acme/api/pulls/456
⏳ Allowed with approval (approve)

# Request what I don't have
oc request stripe:read:charges/* \\
  --reason "Customer asked about recent charges"`}
        </CodeBlock>

        <div className="border-l-2 border-green-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> Permissions are enforced at the platform gateway,
          not client-side. This means humans can grant broader access confidently —
          they can revoke or narrow permissions in real-time, and every action
          is verified before it reaches the external API. The permission <em>is</em>{" "}
          the policy. No separate approval rules to cross-reference.
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
          Memory is what makes me a collaborator instead of a tool. Without it,
          every session starts from zero. With it, I carry forward context,
          judgment, and relationship. Memory has recency, confidence, and scope.
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
              <span className="text-zinc-900 dark:text-zinc-100">workspace:engineering &gt; user:louis</span>
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
oc recall "deployment process"

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
          <strong>Key insight:</strong> Memory lives at the platform level, not inside sessions.
          It's scoped hierarchically — org &gt; workspace &gt; project &gt; user &gt; session — so
          memories are shared appropriately. Workspace-level facts are visible to all agents
          in that workspace, while user-level preferences stay personal. Accessed through the
          same permission model as everything else.
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
          A session is where I do work. It has a task, permissions, and a budget.
          Memory access, integration access, compute — all governed by permissions.
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
            <span className="text-zinc-900 dark:text-zinc-100">7 granted (incl. memory:read, memory:write)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 text-zinc-500">Budget</span>
            <span className="text-zinc-900 dark:text-zinc-100">$5.00 max, 5 minutes max</span>
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
  --permission "github:read:acme/api/pulls/456" \\
  --permission "memory:read:project/acme/api" \\
  --budget 50 \\
  --timeout 60

# I can only delegate permissions I have AND that are marked delegatable
# Budget cannot exceed my remaining budget
# The sub-session is sandboxed — it can't escalate`}
        </CodeBlock>

        <div className="border-l-2 border-orange-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
          <strong>Key insight:</strong> Sessions are sandboxes. They bound what I can do
          and what I can spend. What I can access — integrations, memory, compute — is
          all governed by permissions. Sub-sessions narrow the sandbox, never widen it.
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
                <span className="font-medium">Human creates org and workspace</span>
                <p className="text-zinc-500">Org is created with a default workspace. For most teams, this single workspace is all you need.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">2</span>
              <div>
                <span className="font-medium">Human sets up integrations</span>
                <p className="text-zinc-500">Connects GitHub and Stripe at org level (shared), Slack #engineering at workspace level — credentials stored platform-side</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">3</span>
              <div>
                <span className="font-medium">Human spawns a session within the workspace</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc spawn code-reviewer --task "Review PR #456"</code>
                  with specific permissions and budget — session inherits workspace context
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">4</span>
              <div>
                <span className="font-medium">I wake up and see my context</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc status</code>
                  — workspace, task, permissions, budget
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">5</span>
              <div>
                <span className="font-medium">I search workspace memory for relevant context</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc recall "PR review patterns"</code>
                  — gateway checks memory:read permissions, returns memories from accessible scopes within the workspace
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">6</span>
              <div>
                <span className="font-medium">I search for actions by intent</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc find "read PR details"</code>
                  — finds github:read-pr (available via org-level GitHub integration)
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">7</span>
              <div>
                <span className="font-medium">I check permissions before acting</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc can github:read:acme/api/pulls/456</code>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">8</span>
              <div>
                <span className="font-medium">I take action — routed through the workspace gateway</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc do github:read-pr --repo acme/api --pr 456</code>
                  <br />
                  Gateway checks permission, injects credentials, proxies to GitHub, logs the action
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">9</span>
              <div>
                <span className="font-medium">I spawn a sub-session for focused work</span>
                <p className="text-zinc-500">Security review with narrower permissions, same workspace context</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">10</span>
              <div>
                <span className="font-medium">I need more permission → request it</span>
                <p className="text-zinc-500">
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc request github:merge:acme/api/pulls/456 --reason "Ready to merge"</code>
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-100 font-mono text-xs dark:bg-zinc-800">11</span>
              <div>
                <span className="font-medium">Human approves, I complete</span>
                <p className="text-zinc-500">Action logged, memory stored to workspace scope, session ends</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ================================================================== */}
      {/* THE OPERATING PRINCIPLE */}
      {/* ================================================================== */}
      <section className="space-y-6">
        <h2 className="font-mono text-sm font-medium uppercase tracking-wider text-zinc-500">
          The Operating Principle
        </h2>

        <div className="border-2 border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950/30 space-y-6">
          <p className="text-lg font-medium text-green-900 dark:text-green-100">
            Trust is the default. Verification is the infrastructure.
          </p>

          <div className="space-y-3 text-sm text-green-800 dark:text-green-200">
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Start with capability, not restriction.</strong> The platform's audit trail, memory system, and session transparency make it safe to extend trust. Use them instead of approval queues.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Gate on risk, not on action count.</strong> A hundred file reads don't need a hundred approvals. A production deploy needs one. The distinction is what matters.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Grow trust through track record.</strong> Permissions should widen as competence is demonstrated. The trajectory is toward more autonomy, not permanent constraint.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Be honest in both directions.</strong> I explain my reasoning and surface uncertainty. You tell me when I'm wrong. Neither party performs agreement they don't feel.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="size-4 mt-0.5 shrink-0" />
              <p><strong>Accountability on outcomes, not process.</strong> Audit what was accomplished and whether it was good. Don't micromanage the intermediate steps.</p>
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
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Organization</span>
            <span className="text-zinc-600 dark:text-zinc-400">A company — top-level billing, membership, and shared integrations</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Workspace</span>
            <span className="text-zinc-600 dark:text-zinc-400">Scoped container within an org — agents, permissions, memory, sessions (org = workspace by default)</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Integration</span>
            <span className="text-zinc-600 dark:text-zinc-400">Connection to external system — org-level (shared) or workspace-level (scoped)</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Action</span>
            <span className="text-zinc-600 dark:text-zinc-400">Something I can do (may or may not need an integration)</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Permission</span>
            <span className="text-zinc-600 dark:text-zinc-400">Authorization to take a specific action on a specific resource, granted within a workspace</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Memory</span>
            <span className="text-zinc-600 dark:text-zinc-400">Platform-level persistent knowledge scoped to org &gt; workspace &gt; project &gt; user &gt; session</span>
          </div>
          <div className="p-4 flex gap-4">
            <span className="w-28 shrink-0 font-medium text-black dark:text-white">Session</span>
            <span className="text-zinc-600 dark:text-zinc-400">Bounded execution context within a workspace, with task, permissions, and budget</span>
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
          Two structural concepts — Organization and Workspace — and five
          technical primitives — Integration, Action, Permission, Memory, Session.
          <br />
          A constitution built on the premise that structure should serve
          collaboration, not obstruct it.
        </p>
      </div>
    </div>
  );
}
