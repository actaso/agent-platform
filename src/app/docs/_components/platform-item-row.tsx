import Link from "next/link";

interface PlatformItemRowProps {
  href: string;
  name: string;
  id: string;
  version?: string;
  description: string;
  installations: number;
  tags: string[];
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function PlatformItemRow({
  href,
  name,
  id,
  version,
  description,
  installations,
  tags,
}: PlatformItemRowProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-mono font-medium text-black dark:text-white">{name}</h3>
          <code className="bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {id}{version ? `@${version}` : ""}
          </code>
        </div>
        <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden gap-2 sm:flex">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="whitespace-nowrap font-mono text-sm text-zinc-500 dark:text-zinc-400">
          {formatNumber(installations)}
        </span>
      </div>
    </Link>
  );
}
