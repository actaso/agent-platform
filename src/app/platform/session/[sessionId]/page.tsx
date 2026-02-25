import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertTriangle, CheckCircle, User, Bot } from "lucide-react";
import { getSessionForWeb } from "@/lib/milestone1/store";

export const dynamic = "force-dynamic";

interface SessionDetailPageProps {
  params: Promise<{ sessionId: string }>;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBudget(used: number, limit: number, suffix = ""): string {
  return `${used}${suffix} / ${limit}${suffix}`;
}

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  const { sessionId } = await params;
  const session = getSessionForWeb(decodeURIComponent(sessionId));

  if (!session) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-8">
      <Link
        href="/platform/session"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to sessions
      </Link>

      <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-green-100 px-2 py-0.5 font-mono text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {session.status}
          </span>
          <code className="font-mono text-xs text-zinc-500">{session.id}</code>
        </div>
        <h1 className="font-mono text-2xl text-black dark:text-white">
          {session.agent.id}
          <span className="text-zinc-500">@{session.agent.version}</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {session.org.name} / {session.workspace.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
            Spawn Context
          </h2>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="flex items-center gap-2">
              {session.parent.type === "human" ? (
                <User className="size-4" />
              ) : (
                <Bot className="size-4" />
              )}
              {session.parent.name} ({session.parent.id})
            </p>
            <p>Created: {formatDate(session.createdAt)}</p>
            <p>Updated: {formatDate(session.updatedAt)}</p>
            <p>Daytona image: {session.daytona.image}</p>
            <p>Bootstrap script: {session.daytona.bootstrapScript}</p>
            <p>Workspace path: {session.daytona.workspacePath}</p>
            <p>Metadata env: {session.daytona.metadataEnv.join(", ")}</p>
            <p>Session token expires: {formatDate(session.bootstrap.platformSessionTokenExpiresAt)}</p>
          </div>
        </div>

        <div className="border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
            Budget
          </h2>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Cost: {formatCurrency(session.budget.costCents.used)} /{" "}
              {formatCurrency(session.budget.costCents.limit)}
            </p>
            <p>
              Duration: {formatBudget(session.budget.durationSeconds.used, session.budget.durationSeconds.limit, "s")}
            </p>
            <p>Actions: {formatBudget(session.budget.actions.used, session.budget.actions.limit)}</p>
          </div>
        </div>
      </div>

      <div className="border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">Task</h2>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{session.task.description}</p>
        <pre className="overflow-x-auto bg-zinc-900 p-3 font-mono text-xs text-zinc-100">
          {JSON.stringify(session.task.input, null, 2)}
        </pre>
      </div>

      <div className="border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
          Permissions ({session.permissions.length})
        </h2>
        <div className="space-y-2">
          {session.permissions.map((permission) => (
            <div key={permission.permission} className="flex items-start gap-2 text-sm">
              {permission.mode === "approve" ? (
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
              ) : (
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
              )}
              <div>
                <code className="font-mono text-zinc-700 dark:text-zinc-300">{permission.permission}</code>
                <p className="text-xs text-zinc-500">
                  mode={permission.mode}, delegatable={permission.delegatable ? "true" : "false"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
