import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocsSidebar } from "./_components/platform-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/docs"
              className="flex items-center gap-2 font-medium text-black dark:text-white"
            >
              <div className="size-6 bg-black dark:bg-white" />
              <span>Agent Platform</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/docs"
                className="text-sm font-medium text-black dark:text-white"
              >
                Docs
              </Link>
              <Link
                href="/docs/agents"
                className="text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Agents
              </Link>
              <Link
                href="/docs/skills"
                className="text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Skills
              </Link>
              <Link
                href="/docs/integrations"
                className="text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Integrations
              </Link>
              <Link
                href="/docs/foundations"
                className="text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                Foundations
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/session">Session Demo</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto flex max-w-screen-xl gap-0 px-4 sm:px-6 lg:px-8">
        <DocsSidebar />
        <main className="flex-1 py-8 md:pl-8">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="size-5 bg-black dark:bg-white" />
              <span className="text-sm font-medium text-black dark:text-white">
                Agent Platform
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              An open platform for agent-first computing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
