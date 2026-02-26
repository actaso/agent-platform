import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIntegrationById, agents } from "../../_data/mock-data";
import { IntegrationDetailTabs } from "./_components/integration-detail-tabs";

interface IntegrationDetailPageProps {
  params: Promise<{ integrationId: string }>;
}

export default async function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const { integrationId } = await params;
  const integration = getIntegrationById(decodeURIComponent(integrationId));

  if (!integration) {
    notFound();
  }

  // Get related agents (mock: show first 4)
  const relatedAgents = agents.slice(0, 4);

  return (
    <div>
      <Link
        href="/docs/integrations"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to Integrations
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1
              className="mb-2 text-2xl text-black dark:text-white sm:text-3xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {integration.name}
            </h1>
            <code className="mb-4 inline-block rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {integration.id}
            </code>
          </div>
          <Button asChild>
            <Link href="/get-started">
              Connect {integration.name}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {integration.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {integration.usedByCompanies && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {integration.usedByCompanies} companies
            </span>
          )}
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {integration.category}
          </span>
          {integration.stats && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {integration.stats.uptime}% uptime
            </span>
          )}
          {integration.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <IntegrationDetailTabs
        integration={integration}
        relatedAgents={relatedAgents}
      />
    </div>
  );
}
