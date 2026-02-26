import Link from "next/link";

interface PlatformItemCardProps {
  href: string;
  name: string;
  id: string;
  description: string;
  usedByCompanies: number;
  tags: string[];
}

export function PlatformItemCard({
  href,
  name,
  id,
  description,
  usedByCompanies,
  tags,
}: PlatformItemCardProps) {
  return (
    <Link
      href={href}
      className="group block border border-zinc-100 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-black dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{id}</p>
        </div>
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {usedByCompanies} companies
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
