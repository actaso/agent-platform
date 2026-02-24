"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Zap,
  Clock,
  DollarSign,
  Database,
  Terminal,
  Copy,
  Check,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  User,
  Bot,
} from "lucide-react";

// =============================================================================
// MOCK SESSION DATA - What an agent sees when it "wakes up"
// =============================================================================

const mockSession = {
  id: "sess_abc123def456",
  created: "2025-01-22T14:30:00Z",

  agent: {
    id: "opencompany/code-reviewer",
    version: "2.0.0",
    instance: "inst_789xyz",
  },

  parent: {
    type: "human" as const,
    id: "user_louis",
    name: "Louis",
  },

  permissions: [
    { scope: "read:network", resource: "api.github.com/acme/*", delegatable: true },
    { scope: "write:network", resource: "api.github.com/acme/*", delegatable: true },
    { scope: "write:network", resource: "slack.com/api/*", delegatable: false },
    { scope: "access:secrets", resource: "GITHUB_TOKEN", delegatable: false },
    { scope: "human:approval", resource: "github:merge", delegatable: false },
  ],

  capabilities: [
    "opencompany/github-pr-read",
    "opencompany/github-pr-comment",
    "opencompany/github-review",
    "opencompany/code-review",
    "opencompany/summarize",
    "opencompany/slack-send",
    "opencompany/spawn-agent",
  ],

  budget: {
    cost: { used: 12, limit: 500 },       // cents
    duration: { used: 45, limit: 300 },   // seconds
    actions: { used: 3, limit: 100 },
  },

  memory: {
    facts: 47,
    episodes: 12,
    procedures: 3,
    lastSession: {
      when: "2025-01-20T10:15:00Z",
      summary: "Reviewed auth refactor PR, approved with minor comments",
    },
  },

  task: {
    description: "Review PR #456 for security issues and code quality",
    input: {
      prUrl: "https://github.com/acme/api/pull/456",
      focus: ["security", "performance"],
    },
  },

  status: "active" as const,
};

// =============================================================================
// HELPERS
// =============================================================================

function useCopyToClipboard() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  return { copied, copy };
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function formatTimeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 0) return `${hours}h ago`;
  const mins = Math.floor(diff / (1000 * 60));
  return `${mins}m ago`;
}

function ProgressBar({ used, limit, color }: { used: number; limit: number; color: string }) {
  const pct = Math.min((used / limit) * 100, 100);
  return (
    <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SessionPage() {
  const { copied, copy } = useCopyToClipboard();
  const session = mockSession;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
                {session.status}
              </span>
              <button
                onClick={() => copy(session.id, "session-id")}
                className="flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                {session.id}
                {copied === "session-id" ? (
                  <Check className="size-3" />
                ) : (
                  <Copy className="size-3" />
                )}
              </button>
            </div>
            <h1 className="font-mono text-2xl text-black dark:text-white">
              {session.agent.id}
              <span className="text-zinc-500">@{session.agent.version}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            {session.parent.type === "human" ? (
              <User className="size-4" />
            ) : (
              <Bot className="size-4" />
            )}
            <span>
              spawned by <span className="text-black dark:text-white">{session.parent.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Task */}
      <div className="border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
          Task
        </h2>
        <p className="mb-3 text-black dark:text-white">{session.task.description}</p>
        <div className="bg-zinc-900 p-3 dark:bg-zinc-950">
          <pre className="font-mono text-sm text-zinc-100">
            {JSON.stringify(session.task.input, null, 2)}
          </pre>
        </div>
      </div>

      {/* Grid: Permissions + Budget */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Permissions */}
        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
            Permissions ({session.permissions.length})
          </h2>
          <div className="space-y-2">
            {session.permissions.map((perm, i) => (
              <div key={i} className="flex items-start gap-2">
                {perm.scope === "human:approval" ? (
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                ) : (
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm text-black dark:text-white">
                      {perm.scope}
                    </code>
                    {perm.delegatable && (
                      <span className="text-xs text-zinc-400">delegatable</span>
                    )}
                  </div>
                  <p className="truncate font-mono text-xs text-zinc-500">{perm.resource}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
            Budget
          </h2>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <DollarSign className="size-4" />
                  Cost
                </span>
                <span className="font-mono text-black dark:text-white">
                  ${(session.budget.cost.used / 100).toFixed(2)} / ${(session.budget.cost.limit / 100).toFixed(2)}
                </span>
              </div>
              <ProgressBar
                used={session.budget.cost.used}
                limit={session.budget.cost.limit}
                color="bg-blue-500"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Clock className="size-4" />
                  Duration
                </span>
                <span className="font-mono text-black dark:text-white">
                  {formatDuration(session.budget.duration.used)} / {formatDuration(session.budget.duration.limit)}
                </span>
              </div>
              <ProgressBar
                used={session.budget.duration.used}
                limit={session.budget.duration.limit}
                color="bg-green-500"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Zap className="size-4" />
                  Actions
                </span>
                <span className="font-mono text-black dark:text-white">
                  {session.budget.actions.used} / {session.budget.actions.limit}
                </span>
              </div>
              <ProgressBar
                used={session.budget.actions.used}
                limit={session.budget.actions.limit}
                color="bg-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Capabilities + Memory */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Capabilities */}
        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
            Capabilities ({session.capabilities.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {session.capabilities.map((cap) => (
              <Link
                key={cap}
                href={`/platform/skills/${encodeURIComponent(cap)}`}
                className="group flex items-center gap-1 border border-zinc-200 px-2 py-1 font-mono text-sm transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                {cap.split("/")[1]}
                <ChevronRight className="size-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Memory */}
        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
            Memory
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Database className="size-4" />
                Facts
              </span>
              <span className="font-mono text-sm text-black dark:text-white">
                {session.memory.facts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Terminal className="size-4" />
                Episodes
              </span>
              <span className="font-mono text-sm text-black dark:text-white">
                {session.memory.episodes}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Zap className="size-4" />
                Procedures
              </span>
              <span className="font-mono text-sm text-black dark:text-white">
                {session.memory.procedures}
              </span>
            </div>
            {session.memory.lastSession && (
              <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-900">
                <p className="text-xs text-zinc-500">
                  Last session: {formatTimeAgo(session.memory.lastSession.when)}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {session.memory.lastSession.summary}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-2">
          <button className="border border-zinc-200 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            oc query "review this PR"
          </button>
          <button className="border border-zinc-200 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            oc invoke github-pr-read
          </button>
          <button className="border border-zinc-200 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            oc spawn --help
          </button>
          <button className="border border-zinc-200 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            oc memory search "auth"
          </button>
        </div>
      </div>
    </div>
  );
}
