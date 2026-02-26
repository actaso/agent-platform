import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSkillById, agents } from "../../_data/mock-data";
import { SkillDetailTabs } from "./_components/skill-detail-tabs";

interface SkillDetailPageProps {
  params: Promise<{ skillId: string }>;
}

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const { skillId } = await params;
  const skill = getSkillById(decodeURIComponent(skillId));

  if (!skill) {
    notFound();
  }

  // Get related agents (mock: show first 4)
  const relatedAgents = agents.slice(0, 4);

  return (
    <div>
      <Link
        href="/docs/skills"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to Skills
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1
              className="mb-2 text-2xl text-black dark:text-white sm:text-3xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {skill.name}
            </h1>
            <code className="mb-4 inline-block rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {skill.id}
            </code>
          </div>
          <Button asChild>
            <Link href="/get-started">
              Use this skill
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {skill.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {skill.usedByCompanies} companies
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {skill.category}
          </span>
          {skill.cost && (
            <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              Additional costs apply
            </span>
          )}
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <SkillDetailTabs skill={skill} relatedAgents={relatedAgents} />
    </div>
  );
}
