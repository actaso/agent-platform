import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgentById, skills, integrations } from "../../_data/mock-data";
import { AgentDetailTabs } from "./_components/agent-detail-tabs";

interface AgentDetailPageProps {
  params: Promise<{ agentId: string }>;
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { agentId } = await params;
  const agent = getAgentById(decodeURIComponent(agentId));

  if (!agent) {
    notFound();
  }

  // Get related skills and integrations
  const relatedSkills = skills.slice(0, 4);
  const relatedIntegrations = integrations.slice(0, 4);

  return (
    <div>
      <Link
        href="/platform/agents"
        className="mb-6 inline-flex items-center gap-1.5 font-mono text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        agents
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-2 font-mono text-2xl text-black dark:text-white">
              {agent.name}
            </h1>
            <div className="mb-4 flex items-center gap-2">
              <code className="bg-zinc-100 px-2 py-1 font-mono text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {agent.id}@{agent.version}
              </code>
            </div>
          </div>
          <Button asChild>
            <Link href="/get-started">
              <Copy className="mr-2 size-4" />
              oc install {agent.id}
            </Link>
          </Button>
        </div>
        <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {agent.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {agent.category}
          </span>
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="bg-zinc-50 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <AgentDetailTabs
        agent={agent}
        relatedSkills={relatedSkills}
        relatedIntegrations={relatedIntegrations}
      />
    </div>
  );
}
