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
  ChevronRight,
  User,
  Bot,
  ArrowUpRight,
  BookOpen,
  Clock,
  Bell,
} from "lucide-react";

// =============================================================================
// THE CLI — Rethought from first principles
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
        <pre className="overflow-x-auto font-mono text-sm text-zinc-100 whitespace-pre-wrap">{children}</pre>
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
          The CLI
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          One CLI for both agents and humans. Designed so agents can work
          fluently and humans can set things up, observe, and intervene without
          friction. Every detail rethought from first principles.
        </p>

        {/* Quick nav */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { href: "#principles", label: "Principles" },
            { href: "#permissions", label: "Permissions" },
            { href: "#actions", label: "Actions" },
            { href: "#memory", label: "Memory" },
            { href: "#sessions", label: "Sessions" },
            { href: "#human", label: "Human Interface" },
            { href: "#reference", label: "Reference" },
          ].map((item: { href: string; label: string }) => (
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
      {/* DESIGN PRINCIPLES */}
      {/* ================================================================== */}
      <Section
        id="principles"
        icon={BookOpen}
        title="Design Principles"
        subtitle="Why the CLI works the way it does"
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">
                One CLI, two audiences
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Agents and humans use the same <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc</code> command.
                Agents use it to act, check permissions, store memories. Humans
                use it to connect integrations, manage trust, observe sessions,
                and approve requests. Same tool, different verbs.
              </p>
            </div>
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">
                Short commands, deep capabilities
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Most commands are one or two words. <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc do</code>,{" "}
                <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc find</code>,{" "}
                <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc can</code>,{" "}
                <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc recall</code>.
                Every token an agent types costs compute. The CLI respects that.
              </p>
            </div>
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">
                Permissions are integrated, not separate
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                When an agent runs <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc do</code>,
                the permission check happens automatically. If approval is
                needed, the agent waits inline. No separate "check then act"
                workflow unless the agent wants one.
              </p>
            </div>
            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-2 font-medium text-black dark:text-white">
                Trust grows, friction decreases
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                The first session requires explicit permissions. Over time,
                permissions accumulate and modes upgrade from approve to
                auto as trust is earned. The agent works with less interruption.
                The system gets out of the way.
              </p>
            </div>
          </div>

          <CodeBlock title="Installation">
{`# In a hosted session, oc is pre-installed and authenticated.
# For local use:
curl -fsSL https://opencompany.dev/install.sh | sh
oc login  # Opens browser for OAuth

# Or with a token
export OC_TOKEN="oc_live_..."

# All commands support --json for machine-readable output.`}
          </CodeBlock>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* THE PERMISSION MODEL */}
      {/* ================================================================== */}
      <Section
        id="permissions"
        icon={Shield}
        title="The Permission Model"
        subtitle="The core of how trust works between humans and agents"
      >
        <div className="space-y-8">
          {/* Syntax */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              The syntax
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Every permission follows one pattern:
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 font-mono text-sm">
              <span className="text-blue-600 dark:text-blue-400">namespace</span>
              <span className="text-zinc-400">:</span>
              <span className="text-purple-600 dark:text-purple-400">verb</span>
              <span className="text-zinc-400">:</span>
              <span className="text-green-600 dark:text-green-400">resource</span>
              <span className="text-zinc-400 ml-6">mode:</span>
              <span className="text-orange-600 dark:text-orange-400"> auto</span>
              <span className="text-zinc-400"> | </span>
              <span className="text-yellow-600 dark:text-yellow-400">approve</span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Read it as: <em>"on [namespace], [verb] the [resource]."</em>{" "}
              The verb comes before the resource because it follows natural
              English order and because resources are hierarchical paths — placing
              them last means wildcards read cleanly from left to right.
            </p>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 text-sm space-y-2">
              <p className="font-medium text-black dark:text-white">Grammar rules:</p>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>• <strong>Separators:</strong> <code className="bg-zinc-200 px-1 dark:bg-zinc-700">:</code> separates namespace, verb, and resource. <code className="bg-zinc-200 px-1 dark:bg-zinc-700">/</code> separates hierarchy within resources.</li>
                <li>• <strong>Actions</strong> (what you invoke) are <code className="bg-zinc-200 px-1 dark:bg-zinc-700">namespace:verb</code> — e.g. <code className="bg-zinc-200 px-1 dark:bg-zinc-700">github:merge</code>, <code className="bg-zinc-200 px-1 dark:bg-zinc-700">slack:send</code></li>
                <li>• <strong>Permissions</strong> (what you hold) are <code className="bg-zinc-200 px-1 dark:bg-zinc-700">namespace:verb:resource</code> — e.g. <code className="bg-zinc-200 px-1 dark:bg-zinc-700">github:merge:acme/api/pulls/456</code></li>
                <li>• <strong>Resource paths</strong> use <code className="bg-zinc-200 px-1 dark:bg-zinc-700">/</code> for hierarchy: <code className="bg-zinc-200 px-1 dark:bg-zinc-700">org/repo/type/instance</code></li>
                <li>• <strong>Wildcards:</strong> <code className="bg-zinc-200 px-1 dark:bg-zinc-700">*</code> matches any single segment. Applied to verb or any resource segment.</li>
                <li>• <strong>Mode:</strong> Every permission is granted with a mode — <code className="bg-zinc-200 px-1 dark:bg-zinc-700">auto</code> (just do it) or <code className="bg-zinc-200 px-1 dark:bg-zinc-700">approve</code> (ask the human first). Mode is part of the grant, not a separate policy.</li>
              </ul>
            </div>

            <CodeBlock title="Examples">
{`# Specific
github:read:acme/api/pulls/456          # read one PR
slack:send:#engineering                  # send to one channel
stripe:read:charges/ch_abc123           # read one charge

# Wildcards on resource (most common)
github:read:acme/api/*                  # read anything in a repo
github:read:acme/*                      # read anything in an org
slack:send:*                            # send to any channel
stripe:read:*                           # read any Stripe resource

# Wildcards on verb
github:*:acme/api/pulls/456             # do anything to one PR
slack:*:#engineering                    # do anything in one channel

# Broad
github:read:*                           # read anything on GitHub
github:*:*                              # full GitHub access
platform:*:*                            # all platform compute actions
*:*:*                                   # unrestricted (admin only)`}
            </CodeBlock>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-3 font-medium text-black dark:text-white text-sm">
                Why this order?
              </p>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <p>
                  <strong className="text-black dark:text-white">namespace:verb:resource</strong> was
                  chosen over <code className="bg-zinc-100 px-1 dark:bg-zinc-800">namespace:resource:verb</code> for
                  three reasons:
                </p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>
                    <strong>Natural language:</strong> "github: read from acme/api" reads better than "github: acme/api: read."
                  </li>
                  <li>
                    <strong>Hierarchical resources stay at the end:</strong> Resources
                    often have path structure (<code className="bg-zinc-100 px-1 dark:bg-zinc-800">acme/api/pulls/456</code>).
                    Placing them last means wildcards expand naturally:{" "}
                    <code className="bg-zinc-100 px-1 dark:bg-zinc-800">acme/api/*</code> →{" "}
                    <code className="bg-zinc-100 px-1 dark:bg-zinc-800">acme/*</code> →{" "}
                    <code className="bg-zinc-100 px-1 dark:bg-zinc-800">*</code>.
                  </li>
                  <li>
                    <strong>Grouping by intent:</strong> When listing permissions,
                    you see what actions are available first, then where. "I can
                    read from these three repos" is more useful than "in this repo,
                    I can do these three things."
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Permission matching */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              How matching works
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              When an action is invoked, the platform gateway resolves the target
              resource from the arguments and checks if any permission matches.
              This happens at the gateway before credentials are injected —
              no permission, no outbound request. A permission matches if every
              segment is equal or wildcarded.
            </p>

            <CodeBlock title="Permission matching">
{`# Agent runs:
oc do github:comment --repo acme/api --pr 456 --body "LGTM"

# Platform resolves target: github:comment:acme/api/pulls/456
# Checks permissions in order:

github:comment:acme/api/pulls/456   → exact match ✓
github:comment:acme/api/*           → wildcard match ✓
github:comment:acme/*               → wildcard match ✓
github:*:acme/api/*                 → wildcard match ✓
github:comment:*                    → wildcard match ✓
*:*:*                               → wildcard match ✓

github:read:acme/api/*              → verb mismatch ✗
github:comment:other-org/*          → resource mismatch ✗`}
            </CodeBlock>
          </div>

          {/* Permission lifetime */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Permission lifetime
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Every permission has an expiry. There are two values that matter:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="mb-2 font-mono text-sm font-medium text-black dark:text-white">
                  never
                </p>
                <p className="text-sm text-zinc-500">
                  Persists until explicitly revoked. Included in every future session.
                  Represents earned trust. Granted by humans via{" "}
                  <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc trust grant</code>.
                </p>
              </div>
              <div className="border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="mb-2 font-mono text-sm font-medium text-black dark:text-white">
                  session end
                </p>
                <p className="text-sm text-zinc-500">
                  Disappears when the session ends. Useful for one-off elevated access.
                  Granted at spawn time or via mid-session approval.
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              When a session starts, the agent receives all its{" "}
              <code className="bg-zinc-100 px-1 dark:bg-zinc-800">never</code>-expiry
              permissions plus any session-specific grants. Over time, as humans
              grant more persistent permissions, sessions start with broader access
              and less friction.
            </p>

            <CodeBlock title="Managing permissions (human side)">
{`# Grant a persistent permission (expires: never)
$ oc trust grant code-reviewer github:read:acme/* --mode auto
✓ Permission granted (auto, never)

# Grant with approve mode
$ oc trust grant code-reviewer github:merge:acme/api/* --mode approve
✓ Permission granted (approve, never)

# View an agent's trust profile
$ oc trust show code-reviewer

Agent:  code-reviewer
Trust:  established (47 sessions, 0 incidents)

PERMISSION                          MODE      DELEGATABLE  EXPIRES
github:read:acme/*                  auto      yes          never
github:comment:acme/*               auto      yes          never
github:merge:acme/api/*             approve   no           never
slack:send:#engineering             auto      yes          never
slack:read:*                        auto      yes          never
platform:*:*                        auto      yes          never

# Upgrade mode (trust has been earned)
$ oc trust grant code-reviewer github:merge:acme/api/* --mode auto
✓ Permission updated: approve → auto

# Revoke
$ oc trust revoke code-reviewer github:merge:acme/api/*
✓ Permission revoked`}
            </CodeBlock>
          </div>

          {/* Mode: the two ways to hold a permission */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Mode: the two ways to hold a permission
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Every permission is granted with a mode. Mode is not a separate policy
              layer — it's part of the permission itself. Think of it like managing
              an intern: you might give them permission to merge PRs but tell them to
              check with you each time. The permission and the oversight are one decision.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-2 border-green-200 p-4 dark:border-green-900">
                <p className="mb-2 font-mono text-sm font-medium text-green-600 dark:text-green-400">auto</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Agent acts freely. No human in the loop. For actions you trust
                  the agent to handle independently.
                </p>
                <p className="text-xs text-zinc-500">
                  "You can read any file in the repo — just do it."
                </p>
              </div>
              <div className="border-2 border-yellow-200 p-4 dark:border-yellow-900">
                <p className="mb-2 font-mono text-sm font-medium text-yellow-600 dark:text-yellow-400">approve</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Agent has the authority, but must get sign-off each time. The
                  human sees the specific action, context, and reasoning before
                  it executes.
                </p>
                <p className="text-xs text-zinc-500">
                  "You can merge PRs, but run each one by me."
                </p>
              </div>
            </div>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="mb-2 font-medium text-black dark:text-white">
                Why not three modes?
              </p>
              <p>
                No "first-use" or "auto-after-one-approval." The permission
                model should be obvious: either you trust the agent to act or you
                want to see each action. If after a few approvals you decide the
                agent handles it well, upgrade the mode to auto. That's an explicit
                trust decision, not an automatic escalation.
              </p>
            </div>

            <div className="border-l-2 border-green-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400 dark:border-green-800">
              <strong>The result:</strong> When you look at an agent's permissions, you
              see exactly what it can do and how. No separate policy table to cross-reference.
              The permission <em>is</em> the policy.
            </div>
          </div>

          {/* Trust escalation */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <ArrowUpRight className="size-4" />
              Trust escalation
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Trust is not a static property. It changes based on track record.
              The platform tracks agent behavior and surfaces trust level to
              humans, making it easy to decide when to grant or upgrade permissions.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 border border-zinc-200 p-4 dark:border-zinc-800">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-200 font-mono text-xs dark:bg-zinc-700">1</span>
                <div>
                  <p className="font-medium text-black dark:text-white text-sm">New</p>
                  <p className="text-sm text-zinc-500">
                    Few permissions, most in <code className="bg-zinc-100 px-1 dark:bg-zinc-800">approve</code> mode.
                    Reads might be <code className="bg-zinc-100 px-1 dark:bg-zinc-800">auto</code>, everything else
                    requires sign-off. Human reviews output carefully.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border border-zinc-200 p-4 dark:border-zinc-800">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-200 font-mono text-xs dark:bg-zinc-700">2</span>
                <div>
                  <p className="font-medium text-black dark:text-white text-sm">Established</p>
                  <p className="text-sm text-zinc-500">
                    More permissions granted. Familiar actions upgraded from{" "}
                    <code className="bg-zinc-100 px-1 dark:bg-zinc-800">approve</code> to{" "}
                    <code className="bg-zinc-100 px-1 dark:bg-zinc-800">auto</code>. New domains
                    and high-risk actions still in <code className="bg-zinc-100 px-1 dark:bg-zinc-800">approve</code>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border border-zinc-200 p-4 dark:border-zinc-800">
                <span className="flex size-6 shrink-0 items-center justify-center bg-zinc-200 font-mono text-xs dark:bg-zinc-700">3</span>
                <div>
                  <p className="font-medium text-black dark:text-white text-sm">Trusted</p>
                  <p className="text-sm text-zinc-500">
                    Wide permissions, mostly <code className="bg-zinc-100 px-1 dark:bg-zinc-800">auto</code>.
                    Only genuinely dangerous actions — production deploys, financial
                    transactions — remain in <code className="bg-zinc-100 px-1 dark:bg-zinc-800">approve</code>.
                    The agent works with minimal interruption.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Trust grows two ways: granting new permissions, and upgrading existing
              ones from <code className="bg-zinc-100 px-1 dark:bg-zinc-800">approve</code> to{" "}
              <code className="bg-zinc-100 px-1 dark:bg-zinc-800">auto</code>. Both are explicit
              human decisions. The platform suggests upgrades but humans always decide.
            </p>
          </div>

          {/* Agent-side permission commands */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Checking permissions (agent side)
            </h3>

            <CodeBlock title="oc can — check before acting">
{`# Do I have this permission?
$ oc can github:read:acme/api/pulls/456
✓ Allowed (auto — via github:read:acme/*)

# What about this?
$ oc can github:merge:acme/api/pulls/456
⏳ Allowed with approval (approve — via github:merge:acme/api/*)

# And this?
$ oc can stripe:create:charges/new
✗ No permission — request it with: oc request stripe:create:charges/new

# List everything I have
$ oc permissions

PERMISSION                          MODE      DELEGATABLE  EXPIRES
github:read:acme/*                 auto      yes          never
github:comment:acme/*              auto      yes          never
github:merge:acme/api/*            approve   no           never
slack:send:#engineering             auto      yes          never
slack:read:*                       auto      yes          never
platform:*:*                       auto      yes          never`}
            </CodeBlock>

            <CodeBlock title="oc request — ask for what you don't have">
{`# Request a permission mid-session
$ oc request stripe:read:charges/* \\
    --reason "Customer asked about recent charges, need to look them up"

Request submitted: req_abc123
Waiting for approval from louis... (timeout: 5m)
✓ Approved by louis (23s)

Permission granted: stripe:read:charges/* (auto, session end)

# The human saw this and had four choices:
#   1. "Approve (this session)"     → auto, expires: session end
#   2. "Approve (persist, auto)"    → auto, expires: never
#   3. "Approve (persist, approve)" → approve, expires: never
#   4. "Deny"                       → agent gets an error`}
            </CodeBlock>
          </div>

          {/* How permissions are remembered */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              How permissions are remembered
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Every approval decision is stored. The platform builds a history
              of what's been requested, granted, and denied. This serves three
              purposes:
            </p>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-start gap-3">
                <Check className="size-4 mt-0.5 shrink-0 text-green-500" />
                <p>
                  <strong className="text-black dark:text-white">Mode upgrades are informed.</strong>{" "}
                  When an agent has been approved 10 times for the same permission,
                  the platform surfaces this: "Consider upgrading to auto." The
                  human sees the history and decides.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="size-4 mt-0.5 shrink-0 text-green-500" />
                <p>
                  <strong className="text-black dark:text-white">Trust profiles are accurate.</strong>{" "}
                  Session count, approval rate, incident history — all tracked
                  and surfaced to humans when they're deciding about new
                  permissions and mode upgrades.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="size-4 mt-0.5 shrink-0 text-green-500" />
                <p>
                  <strong className="text-black dark:text-white">Agents learn the landscape.</strong>{" "}
                  When an agent is denied, the reason is stored. Future
                  sessions can recall why a permission was denied and adjust
                  their approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* ACTIONS */}
      {/* ================================================================== */}
      <Section
        id="actions"
        icon={Zap}
        title="Actions"
        subtitle="Finding things to do, then doing them"
      >
        <div className="space-y-8">
          {/* oc do */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc do — execute an action
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The command agents use most. Every <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc do</code>{" "}
              routes through the platform gateway, which handles the full lifecycle:
              permission check, approval flow (if needed), credential injection,
              execution against the external API, audit logging, and verification.
              One call, everything handled.
            </p>

            <CodeBlock title="Simple action (permission already held)">
{`$ oc do slack:send --channel "#engineering" --message "Build failed on main"

✓ slack:send:#engineering (auto)
✓ Sent (msg_abc123, 89ms)

{
  "message_id": "msg_abc123",
  "channel": "#engineering",
  "timestamp": "2025-01-22T14:30:01Z"
}`}
            </CodeBlock>

            <CodeBlock title="Action requiring approval (inline)">
{`$ oc do github:merge --repo acme/api --pr 456 --method squash

⏳ github:merge:acme/api/pulls/456 (approve)
   Requesting approval from louis... (timeout: 5m)
   Notified via: push, slack

✓ Approved by louis (8s)
✓ Merged (sha: abc123def)

{
  "merged": true,
  "sha": "abc123def456",
  "method": "squash"
}`}
            </CodeBlock>

            <CodeBlock title="Action denied">
{`$ oc do stripe:create --type refund --charge ch_abc --amount 5000

⏳ stripe:create:refunds/ch_abc (approve)
   Requesting approval from louis... (timeout: 5m)

✗ Denied by louis: "Check with finance team first — amount over $20"
Error: Permission denied for stripe:create:refunds/ch_abc

# The denial reason is stored. Future sessions can recall it:
# oc recall "stripe refund denials" → "Amounts over $20 need finance approval"`}
            </CodeBlock>

            <CodeBlock title="Approval timeout">
{`$ oc do github:merge --repo acme/api --pr 789

⏳ github:merge:acme/api/pulls/789 (approve)
   Requesting approval from louis... (timeout: 5m)

✗ Approval timed out (5m). Session clock was paused during wait.
Error: No response for github:merge:acme/api/pulls/789

Hint: Louis can still approve later: oc approve req_abc123`}
            </CodeBlock>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="mb-2 font-medium text-black dark:text-white">
                Session clock pauses during approval waits
              </p>
              <p>
                If a session has a 5-minute budget and the agent waits 3 minutes
                for approval, the session still has 5 minutes of work time left.
                Approval wait time is not charged against the budget. The agent
                is not consuming resources while waiting.
              </p>
            </div>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="mb-2 font-medium text-black dark:text-white">
                Anti-abuse limits
              </p>
              <ul className="space-y-1">
                <li>• <strong className="text-black dark:text-white">Max pending requests:</strong> 3 concurrent approval requests per session. A 4th blocks until one resolves.</li>
                <li>• <strong className="text-black dark:text-white">Wall-clock timeout:</strong> Sessions have an independent wall-clock limit (default: 30 minutes) regardless of session-clock pausing. Prevents indefinite blocking workflows.</li>
                <li>• <strong className="text-black dark:text-white">Request rate limit:</strong> Max 10 approval requests per session. After that, additional requests are auto-denied.</li>
              </ul>
            </div>
          </div>

          {/* oc find */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc find — discover actions by intent
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Agents don't always know the action name. They know what they want
              to accomplish. <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc find</code>{" "}
              takes natural language and returns matching actions, ranked by
              relevance, with permission status.
            </p>

            <CodeBlock title="oc find">
{`$ oc find "notify the team about a build failure"

ACTION               RELEVANCE  PERMISSION STATUS
slack:send           0.95       ✓ auto (slack:send:*)
email:send           0.82       ✗ integration not connected
github:create        0.45       ✓ approve (github:create:acme/*/issues)

# With detail
$ oc find "notify the team" --detail

1. slack:send (0.95)
   Permission:  ✓ auto (slack:send:*)
   Cost:        free
   Input:       channel (string, required)
                message (string, required)
                thread_ts (string, optional)
   Output:      message_id, channel, timestamp

2. email:send (0.82)
   Permission:  ✗ integration not connected
   Setup:       oc connect email
   Cost:        free`}
            </CodeBlock>
          </div>

          {/* Verification */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Verification and rollback
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Every action returns verification data — proof that it worked — and
              rollback information where applicable. Because all actions route through
              the platform gateway, verification is captured at the infrastructure
              level, not self-reported by the agent. This is what makes it
              possible to audit outcomes, not just intentions.
            </p>

            <CodeBlock title="Full response with --verbose">
{`$ oc do slack:send --channel "#engineering" --message "PR #456 merged" --verbose

{
  "action": "slack:send",
  "status": "success",
  "output": {
    "message_id": "msg_abc123",
    "channel": "C0123ABCD",
    "timestamp": "1705934400.000100"
  },
  "verification": {
    "method": "api_response",
    "status_code": 200,
    "confirmed": true,
    "verified_at": "2025-01-22T14:30:01Z"
  },
  "rollback": {
    "action": "slack:delete",
    "args": { "channel": "C0123ABCD", "timestamp": "1705934400.000100" },
    "permission_needed": "slack:delete:#engineering"
  },
  "cost": { "cents": 0 },
  "duration_ms": 89,
  "permission_used": "slack:send:* (auto)"
}`}
            </CodeBlock>
          </div>

          {/* List available actions */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc actions — list what's available
            </h3>

            <CodeBlock title="oc actions">
{`$ oc actions

NAMESPACE   ACTION          TYPE          COST
github      read-pr         integration   free
github      comment         integration   free
github      review          integration   free
github      merge           integration   free
github      create-issue    integration   free
slack       send            integration   free
slack       read            integration   free
stripe      read            integration   free
stripe      create          integration   free
platform    summarize       compute       ~$0.02
platform    embed           compute       ~$0.001
platform    web-scrape      paid          ~$0.05

# Filter by namespace
$ oc actions --namespace github`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* MEMORY */}
      {/* ================================================================== */}
      <Section
        id="memory"
        icon={Database}
        title="Memory"
        subtitle="What persists, how it's stored, how it's found"
      >
        <div className="space-y-8">
          {/* oc remember */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc remember — store a memory
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Memory lives at the platform level, not inside sessions. When you
              store a memory, it goes to the platform's memory store, tagged with
              a scope. When you search, the platform checks your{" "}
              <code className="bg-zinc-100 px-1 dark:bg-zinc-800">memory:read</code>{" "}
              permissions and only returns memories you're allowed to see.
            </p>

            <CodeBlock title="Simple (auto-classified)">
{`$ oc remember "Louis prefers tabs over spaces"
✓ Stored as fact (scope: user:louis, confidence: 0.9)

$ oc remember "Deploy failed — missing DB migration on the payments table"
✓ Stored as episode (scope: project:acme/api, confidence: 1.0)

$ oc remember "Always check for SQL injection when reviewing user input handlers"
✓ Stored as procedure (scope: project:acme/api, confidence: 0.85)`}
            </CodeBlock>

            <CodeBlock title="Explicit">
{`$ oc remember "The auth system uses JWT with 1h expiry and refresh tokens" \\
    --type fact \\
    --scope project:acme/api \\
    --confidence 0.95

✓ Stored: mem_abc123

$ oc remember "Jan 22: Reviewed and merged PR #456, found SQL injection" \\
    --type episode \\
    --tags security,pr-review \\
    --outcome success

✓ Stored: mem_def456`}
            </CodeBlock>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-3 font-medium text-black dark:text-white text-sm">
                Memory types
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="font-mono text-sm text-black dark:text-white">fact</p>
                  <p className="text-xs text-zinc-500">
                    Something true. May become stale. Confidence decays over
                    time unless reinforced.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-sm text-black dark:text-white">episode</p>
                  <p className="text-xs text-zinc-500">
                    Something that happened. Immutable. Timestamped. Context
                    may shift in relevance but the event itself is permanent.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-sm text-black dark:text-white">procedure</p>
                  <p className="text-xs text-zinc-500">
                    How to do something. A learned pattern. Strengthened by
                    repetition, weakened by disuse.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* oc recall */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc recall — search memory
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Semantic search by default. Describe what you're looking for in
              natural language and the platform returns relevant memories, ranked
              by a combination of relevance, recency, and confidence. Stale or
              contradicted facts are flagged.
            </p>

            <CodeBlock title="Semantic search">
{`$ oc recall "deployment process"

TYPE       AGE     CONFIDENCE  CONTENT
fact       2w      0.90        Deploy target is Vercel
procedure  1mo     0.85        Always run e2e tests before deploying
episode    3mo     -           Mar 15: Deploy failed, missing DB migration
fact       1y      0.40        Deploy target is Heroku
                               ↳ STALE — contradicted by newer fact`}
            </CodeBlock>

            <CodeBlock title="Filtered search">
{`# By type
$ oc recall "testing" --type procedure

# By scope
$ oc recall "deployment" --scope project:acme/api

# By recency
$ oc recall "decisions" --since 7d

# By type, scope, and recency combined
$ oc recall "auth" --type fact --scope project:acme/api --since 30d`}
            </CodeBlock>

            <CodeBlock title="Get a specific memory">
{`$ oc recall mem_abc123

{
  "id": "mem_abc123",
  "type": "fact",
  "content": "The auth system uses JWT with 1h expiry and refresh tokens",
  "scope": "project:acme/api",
  "confidence": 0.95,
  "created": "2025-01-22T14:30:00Z",
  "created_by": "sess_xyz789",
  "last_accessed": "2025-01-24T10:15:00Z",
  "access_count": 7,
  "reinforced_by": ["sess_abc111", "sess_abc222"]
}`}
            </CodeBlock>
          </div>

          {/* Memory access via permissions */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Access control
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Memory access uses the same permission model as everything else.
              No special <code className="bg-zinc-100 px-1 dark:bg-zinc-800">--memory-scope</code>{" "}
              flag — memory permissions are granted like any other permission.
            </p>

            <div className="border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
              <div className="p-4 flex gap-4">
                <span className="w-64 shrink-0 font-mono text-sm text-zinc-600 dark:text-zinc-400">memory:read:org/acme</span>
                <span className="text-sm text-zinc-500">Can read org-wide memories (shared across workspaces).</span>
              </div>
              <div className="p-4 flex gap-4">
                <span className="w-64 shrink-0 font-mono text-sm text-zinc-600 dark:text-zinc-400">memory:read:workspace/engineering</span>
                <span className="text-sm text-zinc-500">Can read workspace-scoped memories.</span>
              </div>
              <div className="p-4 flex gap-4">
                <span className="w-64 shrink-0 font-mono text-sm text-zinc-600 dark:text-zinc-400">memory:read:project/acme/api</span>
                <span className="text-sm text-zinc-500">Can read this project's memories.</span>
              </div>
              <div className="p-4 flex gap-4">
                <span className="w-64 shrink-0 font-mono text-sm text-zinc-600 dark:text-zinc-400">memory:write:project/acme/api</span>
                <span className="text-sm text-zinc-500">Can store memories to this project.</span>
              </div>
              <div className="p-4 flex gap-4">
                <span className="w-64 shrink-0 font-mono text-sm text-zinc-600 dark:text-zinc-400">memory:read:user/louis</span>
                <span className="text-sm text-zinc-500">Can read this user's memories.</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              Scope hierarchy: org &gt; workspace &gt; project &gt; user &gt; session. Memories are visible to agents whose permissions cover the scope.
            </p>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              When <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc recall</code> runs,
              the platform checks the session's <code className="bg-zinc-100 px-1 dark:bg-zinc-800">memory:read:*</code>{" "}
              permissions and only returns memories from accessible scopes.
              When <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc remember</code> runs,
              it checks <code className="bg-zinc-100 px-1 dark:bg-zinc-800">memory:write:*</code>.
              Same gateway, same enforcement, same audit trail.
            </p>
          </div>

          {/* Confidence and decay */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <Clock className="size-4" />
              Confidence and decay
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Facts become stale. A deployment target recorded a year ago might
              have changed. The platform handles this through confidence decay
              and reinforcement:
            </p>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-0.5">-</span>
                <span>Facts lose confidence over time unless accessed or reinforced.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-0.5">-</span>
                <span>When a fact is confirmed by a new session, its confidence resets upward.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-0.5">-</span>
                <span>When a new fact contradicts an old one, the old one is flagged as stale.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-0.5">-</span>
                <span>Procedures strengthen with repetition and weaken with disuse.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 mt-0.5">-</span>
                <span>Episodes are immutable — they happened. But their relevance to current search is ranked by recency.</span>
              </li>
            </ul>

            <CodeBlock title="oc forget — remove a memory">
{`$ oc forget mem_abc123
✓ Removed: "Deploy target is Heroku" (fact, was already stale)

# Forget by content match
$ oc forget --match "Heroku"
Found 2 memories matching "Heroku". Remove all? (y/n)`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SESSIONS */}
      {/* ================================================================== */}
      <Section
        id="sessions"
        icon={GitBranch}
        title="Sessions & Delegation"
        subtitle="The execution context and how work gets distributed"
      >
        <div className="space-y-8">
          {/* oc status */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc status — where am I, what can I do
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The first thing an agent sees when a session starts. One command,
              everything you need to orient: task, budget, permissions. Memory
              access is visible in the permissions list.
            </p>

            <CodeBlock title="oc status">
{`$ oc status

SESSION    sess_abc123
ORG        acme
WORKSPACE  engineering
TASK       Review PR #456 for security issues
PARENT     louis (human)
AGENT      code-reviewer (v2.0)
BUDGET     $5.00 remaining · 5:00 remaining

PERMISSIONS (7)
  github:read:acme/*              auto      never
  github:comment:acme/*           auto      never
  github:merge:acme/api/*         approve   never
  slack:send:#engineering          auto      never
  slack:read:*                    auto      never
  platform:*:*                    auto      never
  spawn:*                         auto      never      delegatable
  memory:read:project/acme/api    auto      never
  memory:read:user/louis          auto      never
  memory:write:project/acme/api   auto      session end`}
            </CodeBlock>

            <CodeBlock title="oc status --json (for programmatic use)">
{`{
  "session_id": "sess_abc123",
  "org": "acme",
  "workspace": "engineering",
  "status": "active",
  "task": "Review PR #456 for security issues",
  "parent": { "type": "human", "id": "louis" },
  "agent": { "id": "code-reviewer", "version": "2.0" },
  "budget": {
    "cost": { "used_cents": 0, "limit_cents": 500 },
    "time": { "used_seconds": 0, "limit_seconds": 300 }
  },
  "permissions": [...]
}`}
            </CodeBlock>
          </div>

          {/* Spawning */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Spawning sessions
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Sessions are created by humans or by other agents. A human spawns
              the initial session. That agent can spawn sub-sessions with
              narrower scope.
            </p>

            <CodeBlock title="Human spawns a session">
{`$ oc spawn code-reviewer \\
    --task "Review PR #456 for security issues" \\
    --permission "github:merge:acme/api/pulls/456 --mode approve" \\
    --budget 500 \\
    --timeout 300

Session: sess_abc123
Agent:   code-reviewer (v2.0)
Status:  active

# Persistent permissions (expires: never) are automatically included.
# The --permission flag adds session-scoped permissions on top.

# Watch it work
$ oc watch sess_abc123

# Or get the result when done
$ oc result sess_abc123 --wait`}
            </CodeBlock>

            <CodeBlock title="Agent spawns a sub-session">
{`# From inside my session:
$ oc spawn security-reviewer \\
    --task "Check PR #456 for SQL injection in user input handlers" \\
    --permission "github:read:acme/api/pulls/456" \\
    --permission "memory:read:project/acme/api" \\
    --budget 50 \\
    --timeout 60 \\
    --wait

Spawning sub-session...
Session: sess_sub_789
Agent:   security-reviewer (v1.0)
Parent:  sess_abc123 (me)

Waiting for result...

{
  "session_id": "sess_sub_789",
  "status": "completed",
  "duration_seconds": 42,
  "cost_cents": 18,
  "output": {
    "findings": [
      {
        "severity": "high",
        "file": "src/api/users.ts",
        "line": 45,
        "issue": "Unsanitized user input in SQL query",
        "recommendation": "Use parameterized queries"
      }
    ]
  }
}`}
            </CodeBlock>

            <div className="border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20 text-sm">
              <p className="mb-2 font-medium text-yellow-800 dark:text-yellow-200">
                Delegation constraints
              </p>
              <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                <li>- I can only delegate permissions I have AND that are marked delegatable.</li>
                <li>- Sub-session budget cannot exceed my remaining budget.</li>
                <li>- Sub-session actions count against my budget.</li>
                <li>- The trust chain only narrows. A sub-session can never have more access than its parent.</li>
                <li>- Max spawn depth: 3 levels (human → agent → sub-agent → sub-sub-agent). Prevents recursive spawning.</li>
                <li>- Max concurrent sub-sessions: 5 per parent. Total sub-session tree capped at 20 per root session.</li>
              </ul>
            </div>
          </div>

          {/* Managing sub-agents */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Managing sub-sessions
            </h3>

            <CodeBlock title="oc agents">
{`# List my sub-sessions
$ oc agents

ID            STATUS     AGENT               COST    DURATION
sess_sub_789  completed  security-reviewer    $0.18   42s
sess_sub_abc  active     summarize            $0.03   8s
sess_sub_def  failed     test-runner          $0.12   60s (timeout)

# Get result
$ oc result sess_sub_789
{ "findings": [...] }

# Kill a running sub-session
$ oc kill sess_sub_abc`}
            </CodeBlock>
          </div>

          {/* Session lifecycle */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Lifecycle
            </h3>

            <div className="flex items-center gap-3 overflow-x-auto py-2 text-sm">
              <div className="border border-zinc-200 px-3 py-2 dark:border-zinc-700 shrink-0">
                <span className="text-zinc-500">spawned</span>
              </div>
              <ChevronRight className="size-4 text-zinc-400 shrink-0" />
              <div className="border border-green-200 bg-green-50 px-3 py-2 dark:border-green-900 dark:bg-green-950 shrink-0">
                <span className="text-green-700 dark:text-green-400">active</span>
              </div>
              <ChevronRight className="size-4 text-zinc-400 shrink-0" />
              <div className="border border-zinc-200 px-3 py-2 dark:border-zinc-700 shrink-0">
                <span className="text-zinc-500">completed | failed | timeout | killed</span>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A session ends when the agent completes its task, hits a budget
              limit, times out, encounters an unrecoverable error, or is killed
              by a human. Memories stored during the session already live at the
              platform level — nothing needs to be "saved." The session log is
              finalized for audit.
            </p>
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
        subtitle="Setup, observation, approval, intervention"
      >
        <div className="space-y-8">
          {/* Integrations */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              oc connect — set up integrations
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Integrations are connected at the platform level. Credentials (OAuth tokens,
              API keys) are stored platform-side and never exposed to agent sessions.
              When an agent takes an action, the platform gateway injects the real
              credentials into the outbound request.
            </p>

            <CodeBlock title="Connecting integrations (credentials stored platform-side)">
{`# OAuth flow (opens browser)
$ oc connect slack
Opening browser for OAuth...
✓ Slack connected (workspace: Acme Inc)
  Credentials: stored platform-side (never exposed to sessions)
  Actions available: slack:send, slack:read, slack:react, slack:list

# API key
$ oc connect stripe --key sk_live_abc123
✓ Stripe connected
  Credentials: stored platform-side (never exposed to sessions)
  Actions available: stripe:read, stripe:create, stripe:update

# Token
$ oc connect github --token ghp_abc123
✓ GitHub connected (user: louis)
  Credentials: stored platform-side (never exposed to sessions)
  Actions available: github:read-pr, github:comment, github:review,
                     github:merge, github:create-issue, github:read-repo

# List integrations
$ oc integrations

INTEGRATION  STATUS     ACTIONS  CONNECTED   CREDENTIAL
slack        connected  4        louis        OAuth token (platform-stored)
github       connected  7        louis        OAuth token (platform-stored)
stripe       connected  4        louis        API key (platform-stored)`}
            </CodeBlock>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="mb-2 font-medium text-black dark:text-white">
                Why platform-stored credentials?
              </p>
              <p>
                Sessions never hold external credentials. All actions route through the
                platform gateway, which injects credentials at request time. This means:
                a compromised session can't leak tokens, permissions can be revoked
                instantly (takes effect on the next request), and every action is
                audited at one central point.
              </p>
            </div>
          </div>

          {/* Observation */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Observation — watch and log
            </h3>

            <CodeBlock title="oc watch — live activity stream">
{`$ oc watch sess_abc123

14:30:01 ▸ Session started (code-reviewer v2.0, budget: $5/5m)
14:30:02 ▸ memory:read project/acme/api (14 facts, 4 episodes, 2 procedures)
14:30:03 ▸ github:read-pr acme/api #456 ✓ (234ms)
14:30:05 ▸ platform:summarize (4 files, 1847 lines) ✓ (1.2s, $0.02)
14:30:07 ▸ Spawned: security-reviewer → sess_sub_789
14:30:49 ▸ Sub-session completed ($0.18, 42s) — 1 finding
14:30:50 ▸ github:comment acme/api #456 ✓ (156ms)
14:30:51 ▸ slack:send #engineering ✓ (89ms)
14:30:52 ▸ github:merge acme/api #456 ⏳ awaiting approval
14:31:00 ▸ github:merge acme/api #456 ✓ approved by louis
14:31:01 ▸ Memory stored: episode "Reviewed PR #456, found SQL injection"
14:31:02 ▸ Session completed ($0.43, 61s, 7 actions)`}
            </CodeBlock>

            <CodeBlock title="oc log — historical audit">
{`$ oc log sess_abc123

SESSION  sess_abc123
AGENT    code-reviewer (v2.0)
PARENT   louis
STATUS   completed
DURATION 61s
COST     $0.43
ACTIONS  7

TIMELINE
  14:30:03  github:read-pr          acme/api #456       ✓  $0.00   234ms
  14:30:05  platform:summarize      4 files             ✓  $0.02   1.2s
  14:30:07  spawn                   security-reviewer   ✓  $0.18   42s
  14:30:50  github:comment          acme/api #456       ✓  $0.00   156ms
  14:30:51  slack:send              #engineering        ✓  $0.00   89ms
  14:31:00  github:merge            acme/api #456       ✓  $0.00   312ms
  14:31:01  memory:store            episode             ✓  -       -

PERMISSIONS USED
  github:read:acme/* (auto)
  github:comment:acme/* (auto)
  github:merge:acme/api/* (approve, approved at 14:31:00)
  slack:send:#engineering (auto)
  platform:*:* (auto)

MEMORIES CREATED
  episode: "Reviewed PR #456, found SQL injection in user input handler"

# JSON output for programmatic analysis
$ oc log sess_abc123 --json`}
            </CodeBlock>
          </div>

          {/* Approval */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <Bell className="size-4" />
              Approval
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              When an agent needs approval, speed matters. The agent is blocked
              and waiting. The platform notifies humans through their configured
              channels — not just the CLI.
            </p>

            <div className="border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="mb-3 text-sm font-medium text-black dark:text-white">
                Notification channels
              </p>
              <div className="grid gap-2 text-sm">
                <div className="flex gap-4">
                  <span className="w-28 text-zinc-500 shrink-0">CLI</span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc pending</code> — poll for pending requests
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-28 text-zinc-500 shrink-0">Push</span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Mobile notification with approve/deny actions
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-28 text-zinc-500 shrink-0">Slack</span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    DM with context and approve/deny buttons
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-28 text-zinc-500 shrink-0">Email</span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    One-click approve link for lower-urgency requests
                  </span>
                </div>
              </div>
            </div>

            <CodeBlock title="CLI approval flow">
{`# List pending requests
$ oc pending

ID          SESSION     ACTION                            AGE   REASON
req_abc     sess_123    github:merge:acme/api/pulls/456   12s   Review complete, all checks passing
req_def     sess_456    stripe:create:refunds/ch_789      2m    Customer requested refund ($15)

# Approve (this action only, session-scoped)
$ oc approve req_abc
✓ Approved: github:merge:acme/api/pulls/456

# Approve and persist (keeps approve mode — agent still checks in each time)
$ oc approve req_abc --persist
✓ Approved: github:merge:acme/api/pulls/456
✓ Permission persisted: github:merge:acme/api/pulls/456 (approve, never)

# Approve, persist, and upgrade to auto (full trust)
$ oc approve req_abc --persist --mode auto
✓ Approved: github:merge:acme/api/pulls/456
✓ Permission persisted: github:merge:acme/api/pulls/456 (auto, never)

# Deny with reason
$ oc deny req_def --reason "Check with finance team first"
✗ Denied: stripe:create:refunds/ch_789`}
            </CodeBlock>

            <div className="border-l-2 border-zinc-300 pl-4 text-sm text-zinc-600 dark:text-zinc-400 dark:border-zinc-700">
              Without <code className="bg-zinc-100 px-1 dark:bg-zinc-800">--persist</code>,
              the approval is session-scoped — it disappears when the session ends.
              With <code className="bg-zinc-100 px-1 dark:bg-zinc-800">--persist</code>,
              the permission lives forever (defaults to <code className="bg-zinc-100 px-1 dark:bg-zinc-800">approve</code> mode).
              Adding <code className="bg-zinc-100 px-1 dark:bg-zinc-800">--mode auto</code> says
              "I trust you to handle this from now on." To widen scope, use{" "}
              <code className="bg-zinc-100 px-1 dark:bg-zinc-800">oc trust grant</code> explicitly.
            </div>
          </div>

          {/* Intervention */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white">
              Intervention
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Humans can intervene in any running session at any time. The
              controls are simple and non-destructive by default.
            </p>

            <CodeBlock title="Session controls">
{`# Pause (agent is suspended, can be resumed)
$ oc session pause sess_abc123
✓ Paused sess_abc123

# Resume
$ oc session resume sess_abc123
✓ Resumed sess_abc123

# Add budget mid-session
$ oc session budget sess_abc123 --add 200
✓ Budget updated: $2.12 / $7.00

# Revoke a permission mid-session
$ oc session revoke sess_abc123 slack:send:*
✓ Permission revoked. Agent will be notified on next action.

# Kill
$ oc session kill sess_abc123 --reason "No longer needed"
✓ Killed sess_abc123 (was active, 61s, $0.43)`}
            </CodeBlock>
          </div>

          {/* Organization & Workspace */}
          <div className="space-y-4">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              Organization & Workspace
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Everything operates within an organization and workspace. By
              default, org = workspace — no extra complexity until you need
              to subdivide for teams or departments.
            </p>

            <CodeBlock title="Organization commands">
{`# View current org info
$ oc org
Organization:  Acme Inc (acme)
Members:       louis (admin), alice (member)
Workspaces:    2 (engineering, support)
Billing:       Team plan
Integrations:  3 org-level (GitHub, Stripe, Datadog)

# Invite a member
$ oc org invite alice@acme.com --role member
✓ Invitation sent`}
            </CodeBlock>

            <CodeBlock title="Workspace commands">
{`# List workspaces
$ oc workspace list
  NAME          AGENTS  INTEGRATIONS  MEMBERS
* engineering   4       5 (3 org + 2 workspace)   3
  support       2       4 (3 org + 1 workspace)   2

# Switch active workspace
$ oc workspace switch support
✓ Switched to workspace: support

# Create a new workspace
$ oc workspace create data-team
✓ Created workspace: data-team
  Inherits 3 org-level integrations

# View workspace details
$ oc workspace show engineering
Workspace:      engineering (default)
Org:            Acme Inc
Integrations:   5 (3 inherited from org + 2 workspace-level)
  org:  GitHub, Stripe, Datadog
  ws:   Slack #engineering, Jira
Agents:         code-reviewer, deploy-bot, test-runner, security-scanner
Active sessions: 2`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* COMMAND REFERENCE */}
      {/* ================================================================== */}
      <section id="reference" className="scroll-mt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <Terminal className="size-5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-black dark:text-white">Command Reference</h2>
            <p className="text-zinc-500">Every command, at a glance</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-blue-500" />
                <span className="text-sm font-medium text-black dark:text-white">Agent commands</span>
              </div>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-sm">
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc status</span>
                <span className="text-zinc-500">Session context: task, budget, permissions</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc do &lt;action&gt;</span>
                <span className="text-zinc-500">Execute an action (permission check + approval inline)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc find &lt;query&gt;</span>
                <span className="text-zinc-500">Find actions by intent (natural language)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc actions</span>
                <span className="text-zinc-500">List all available actions</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc can &lt;permission&gt;</span>
                <span className="text-zinc-500">Check if a permission is held</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc request &lt;perm&gt;</span>
                <span className="text-zinc-500">Request a permission (triggers approval flow)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc permissions</span>
                <span className="text-zinc-500">List all current permissions</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc remember &lt;content&gt;</span>
                <span className="text-zinc-500">Store a memory (requires memory:write permission)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc recall &lt;query&gt;</span>
                <span className="text-zinc-500">Search memories (semantic, filterable)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc forget &lt;id&gt;</span>
                <span className="text-zinc-500">Remove a memory</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc spawn &lt;agent&gt;</span>
                <span className="text-zinc-500">Spawn a sub-session with narrower permissions</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc agents</span>
                <span className="text-zinc-500">List active sub-sessions</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc result &lt;session&gt;</span>
                <span className="text-zinc-500">Get result from a completed sub-session</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc kill &lt;session&gt;</span>
                <span className="text-zinc-500">Kill a running sub-session</span>
              </div>
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <User className="size-4 text-green-500" />
                <span className="text-sm font-medium text-black dark:text-white">Human commands</span>
              </div>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-sm">
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc org</span>
                <span className="text-zinc-500">View organization info, members, billing</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc workspace list</span>
                <span className="text-zinc-500">List workspaces in current org</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc workspace switch &lt;n&gt;</span>
                <span className="text-zinc-500">Switch active workspace</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc workspace create &lt;n&gt;</span>
                <span className="text-zinc-500">Create a new workspace</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc workspace show &lt;n&gt;</span>
                <span className="text-zinc-500">View workspace details, integrations, agents</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc connect &lt;name&gt;</span>
                <span className="text-zinc-500">Add an integration (OAuth, API key, or token)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc integrations</span>
                <span className="text-zinc-500">List connected integrations</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc trust grant &lt;a&gt; &lt;p&gt;</span>
                <span className="text-zinc-500">Grant permission (--mode auto|approve, expires: never)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc trust revoke &lt;a&gt; &lt;p&gt;</span>
                <span className="text-zinc-500">Revoke a permission</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc trust show &lt;agent&gt;</span>
                <span className="text-zinc-500">View agent trust profile and all permissions with modes</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc spawn &lt;agent&gt;</span>
                <span className="text-zinc-500">Start a new agent session</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc watch &lt;session&gt;</span>
                <span className="text-zinc-500">Live activity stream</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc log &lt;session&gt;</span>
                <span className="text-zinc-500">Historical session audit</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc pending</span>
                <span className="text-zinc-500">List pending approval requests</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc approve &lt;id&gt;</span>
                <span className="text-zinc-500">Approve a request (optionally --persist --mode auto|approve)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc deny &lt;id&gt;</span>
                <span className="text-zinc-500">Deny a request (with --reason)</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc result &lt;session&gt;</span>
                <span className="text-zinc-500">Get session result</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc session pause &lt;id&gt;</span>
                <span className="text-zinc-500">Pause a running session</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc session resume &lt;id&gt;</span>
                <span className="text-zinc-500">Resume a paused session</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc session budget &lt;id&gt;</span>
                <span className="text-zinc-500">Adjust session budget</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc session revoke &lt;id&gt; &lt;p&gt;</span>
                <span className="text-zinc-500">Revoke a permission mid-session</span>
              </div>
              <div className="flex gap-4 px-4 py-3">
                <span className="w-48 shrink-0 text-zinc-900 dark:text-zinc-100">oc session kill &lt;id&gt;</span>
                <span className="text-zinc-500">Kill a running session</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-500">
            All commands support <code className="bg-zinc-100 px-1 dark:bg-zinc-800">--json</code> for
            machine-readable output and <code className="bg-zinc-100 px-1 dark:bg-zinc-800">--help</code> for
            usage details.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          A CLI that makes agents powerful and humans confident.
          <br />
          Minimal commands. Integrated permissions. Trust that grows.
        </p>
      </div>
    </div>
  );
}
