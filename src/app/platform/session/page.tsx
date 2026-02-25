import Link from "next/link";
import { ArrowRight, Clock3, DollarSign, User, Bot } from "lucide-react";
import {
  getDefaultWebViewer,
  listSessionsForWeb,
  listWorkspacesForWeb,
} from "@/lib/milestone1/store";

export const dynamic = "force-dynamic";

interface SessionsPageProps {
  searchParams: Promise<{
    error?: string;
    created?: string;
    workspace?: string;
  }>;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCost(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function getNotice(params: { error?: string; created?: string; workspace?: string }) {
  if (params.created === "1") {
    return {
      type: "success" as const,
      text: "Session created successfully.",
    };
  }

  if (params.workspace === "updated") {
    return {
      type: "success" as const,
      text: "Workspace switched successfully.",
    };
  }

  if (params.error) {
    return {
      type: "error" as const,
      text: "Action failed. Check inputs and try again.",
    };
  }

  return null;
}

export default async function SessionsPage({ searchParams }: SessionsPageProps) {
  const params = await searchParams;
  const viewer = getDefaultWebViewer();
  const workspaces = listWorkspacesForWeb(viewer.org.id);
  const sessions = listSessionsForWeb(viewer.org.id, viewer.workspace.id);
  const notice = getNotice(params);

  return (
    <div className="max-w-5xl space-y-8">
      <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
          Milestone 1
        </p>
        <h1 className="text-3xl text-black dark:text-white">Sessions</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Session list and detail view backed by `/v1/sessions`, plus direct web controls for workspace switching and session spawn.
        </p>
      </div>

      {notice && (
        <div
          className={
            notice.type === "success"
              ? "border border-green-300 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
              : "border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          }
        >
          {notice.text}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
            Active Context
          </h2>
          <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
            Org: {viewer.org.name} ({viewer.org.id})
          </p>
          <form action="/platform/session/workspace" method="post" className="space-y-3">
            <label className="block text-xs text-zinc-500">Workspace</label>
            <select
              name="workspaceId"
              defaultValue={viewer.workspace.id}
              className="w-full border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              {workspaces.map((workspace) => (
                <option key={workspace.id} value={workspace.id}>
                  {workspace.name} ({workspace.id})
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full border border-zinc-300 px-3 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Switch Workspace
            </button>
          </form>
        </div>

        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
            Spawn Session
          </h2>
          <form action="/platform/session/spawn" method="post" className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Agent</label>
              <input
                name="agent"
                required
                placeholder="opencompany/code-reviewer"
                className="w-full border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Task (optional)</label>
              <input
                name="task"
                placeholder="Review PR #123"
                className="w-full border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Workspace</label>
              <select
                name="workspaceId"
                defaultValue={viewer.workspace.id}
                className="w-full border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                {workspaces.map((workspace) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Cost (cents)</label>
                <input
                  type="number"
                  min={1}
                  name="costLimitCents"
                  defaultValue={500}
                  className="w-full border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Duration (s)</label>
                <input
                  type="number"
                  min={1}
                  name="durationLimitSeconds"
                  defaultValue={300}
                  className="w-full border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Actions</label>
                <input
                  type="number"
                  min={1}
                  name="actionLimit"
                  defaultValue={100}
                  className="w-full border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-black px-3 py-2 text-sm text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
            >
              Spawn
            </button>
          </form>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="border border-dashed border-zinc-300 p-8 text-zinc-500 dark:border-zinc-700">
          No sessions in this workspace yet. Run{" "}
          <code className="bg-zinc-100 px-1 dark:bg-zinc-800">
            oc spawn &lt;agent&gt;
          </code>{" "}
          or use the Spawn Session form.
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/platform/session/${session.id}`}
              className="group block border border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded bg-green-100 px-2 py-0.5 font-mono text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {session.status}
                    </span>
                    <code className="font-mono text-xs text-zinc-500">{session.id}</code>
                  </div>
                  <h2 className="font-mono text-base text-black dark:text-white">
                    {session.agent.id}
                    <span className="text-zinc-500">@{session.agent.version}</span>
                  </h2>
                </div>
                <ArrowRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
              </div>

              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {session.task.description}
              </p>

              <div className="grid gap-3 text-xs text-zinc-500 sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  {session.parent.type === "human" ? (
                    <User className="size-3.5" />
                  ) : (
                    <Bot className="size-3.5" />
                  )}
                  <span>{session.parent.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-3.5" />
                  <span>
                    {formatCost(session.budget.costCents.used)} /{" "}
                    {formatCost(session.budget.costCents.limit)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="size-3.5" />
                  <span>
                    {session.budget.durationSeconds.used}s /{" "}
                    {session.budget.durationSeconds.limit}s
                  </span>
                </div>
                <div>created {formatDate(session.createdAt)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
