"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, Plug, Zap, Terminal, FileText, Box } from "lucide-react";

const navItems = [
  // Design docs
  { href: "/platform/foundations", label: "Foundations", icon: Box },
  { href: "/platform/agent-first", label: "What I Need", icon: FileText },
  { href: "/platform/agent-first-platform", label: "CLI Spec", icon: Terminal },
  // Functional views
  { href: "/platform/session", label: "Session", icon: Terminal },
  { href: "/platform/agents", label: "Agents", icon: Bot },
  { href: "/platform/integrations", label: "Integrations", icon: Plug },
  { href: "/platform/skills", label: "Skills", icon: Zap },
];

export function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <div className="shrink-0 md:sticky md:top-24 md:w-44">
      {/* Mobile horizontal nav */}
      <nav className="mb-6 flex gap-2 overflow-x-auto md:hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 px-4 py-2 text-sm transition-colors",
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop sidebar */}
      <nav className="hidden md:block">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
