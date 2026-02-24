"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  AlertTriangle,
  Shield,
  Zap,
  Clock,
  Activity,
  Package,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import type { Agent, Skill, Integration, TrustLevel } from "@/types/platform";

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

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const trustLevelConfig: Record<TrustLevel, { label: string; className: string }> = {
  official: { label: "Official", className: "text-blue-600 dark:text-blue-400" },
  verified: { label: "Verified", className: "text-green-600 dark:text-green-400" },
  community: { label: "Community", className: "text-zinc-600 dark:text-zinc-400" },
};

// =============================================================================
// CODE BLOCK
// =============================================================================

function CodeBlock({ code, language = "typescript", id }: { code: string; language?: string; id: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="group relative">
      <pre className="overflow-x-auto bg-zinc-900 p-4 text-sm text-zinc-100 dark:bg-zinc-950">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copy(code, id)}
        className="absolute right-2 top-2 rounded bg-zinc-700 p-1.5 text-zinc-300 opacity-0 transition-opacity hover:bg-zinc-600 group-hover:opacity-100"
        title="Copy to clipboard"
      >
        {copied === id ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

// =============================================================================
// SCHEMA TABLE
// =============================================================================

function SchemaTable({ fields, title }: { fields: Agent["schema"]["input"]; title: string }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
              <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">name</th>
              <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">type</th>
              <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">required</th>
              <th className="pb-2 font-mono font-medium text-zinc-600 dark:text-zinc-400">description</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.name} className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-4 font-mono text-black dark:text-white">{field.name}</td>
                <td className="py-2 pr-4 font-mono text-purple-600 dark:text-purple-400">{field.type}</td>
                <td className="py-2 pr-4">
                  {field.required ? (
                    <span className="text-red-600 dark:text-red-400">required</span>
                  ) : (
                    <span className="text-zinc-400">optional</span>
                  )}
                </td>
                <td className="py-2 text-zinc-600 dark:text-zinc-400">{field.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =============================================================================
// METRICS SIDEBAR
// =============================================================================

function MetricsSidebar({ agent }: { agent: Agent }) {
  const { metrics, publisher, cost } = agent;
  const trustConfig = trustLevelConfig[publisher.trustLevel];

  return (
    <div className="w-full shrink-0 border-l border-zinc-200 pl-6 pt-6 dark:border-zinc-800 lg:w-72">
      <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
        Metrics
      </h3>
      <div className="space-y-4">
        {/* Publisher */}
        <div className="flex items-start gap-3">
          <Package className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">publisher</p>
            <p className="flex items-center gap-1 text-sm text-black dark:text-white">
              {publisher.id}
              {publisher.verified && (
                <span title="Verified">
                  <BadgeCheck className="size-3.5 text-blue-500" />
                </span>
              )}
            </p>
            <p className={`text-xs ${trustConfig.className}`}>{trustConfig.label}</p>
          </div>
        </div>

        {/* Version */}
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">version</p>
            <p className="font-mono text-sm text-black dark:text-white">{agent.version}</p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">success_rate</p>
            <p className="text-sm text-black dark:text-white">{metrics.successRate}%</p>
            <p className="text-xs text-zinc-500">error: {metrics.errorRate}%</p>
          </div>
        </div>

        {/* Latency */}
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">latency</p>
            <p className="text-sm text-black dark:text-white">p50: {metrics.avgLatency}ms</p>
            <p className="text-xs text-zinc-500">p99: {metrics.p99Latency}ms</p>
          </div>
        </div>

        {/* Invocations */}
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">invocations_30d</p>
            <p className="text-sm text-black dark:text-white">
              {formatNumber(metrics.totalInvocations)}
            </p>
            <p className="text-xs text-zinc-500">
              {formatNumber(metrics.activeInstallations)} installations
            </p>
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">cost_estimate</p>
            <p className="text-sm text-black dark:text-white">{cost.estimate}</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="font-mono text-xs text-zinc-500">last_updated</p>
            <p className="text-sm text-black dark:text-white">{formatDate(metrics.lastUpdated)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface AgentDetailTabsProps {
  agent: Agent;
  relatedSkills: Skill[];
  relatedIntegrations: Integration[];
}

type TabId = "schema" | "examples" | "permissions" | "providers" | "docs";

const tabs: { id: TabId; label: string }[] = [
  { id: "schema", label: "Schema" },
  { id: "examples", label: "Examples" },
  { id: "permissions", label: "Permissions" },
  { id: "providers", label: "Providers" },
  { id: "docs", label: "Docs" },
];

const providerDisplayNames: Record<string, string> = {
  codex: "Codex",
  "claude-code": "Claude Code",
  "open-code": "Open Code",
};

export function AgentDetailTabs({
  agent,
  relatedSkills,
  relatedIntegrations,
}: AgentDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("schema");

  // Generate invocation code
  const invokeCode = `const result = await oc.invoke("${agent.id}", ${JSON.stringify(agent.examples[0]?.input || {}, null, 2)});`;

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 font-mono text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="pt-6 lg:pr-8">
            {/* SCHEMA TAB */}
            {activeTab === "schema" && (
              <div>
                <SchemaTable fields={agent.schema.input} title="// input" />
                <SchemaTable fields={agent.schema.output} title="// output" />

                {agent.schema.errors.length > 0 && (
                  <div>
                    <h3 className="mb-3 font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      // errors
                    </h3>
                    <div className="space-y-2">
                      {agent.schema.errors.map((error) => (
                        <div
                          key={error.code}
                          className="flex items-start gap-3 border-l-2 border-red-500 py-1 pl-3"
                        >
                          <div>
                            <code className="font-mono text-sm text-red-600 dark:text-red-400">
                              {error.code}
                            </code>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              {error.description}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {error.retryable ? "retryable" : "not retryable"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EXAMPLES TAB */}
            {activeTab === "examples" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    // invoke
                  </h3>
                  <CodeBlock code={invokeCode} id="invoke" />
                </div>

                {agent.examples.map((example, i) => (
                  <div key={i}>
                    <h3 className="mb-1 text-sm font-medium text-black dark:text-white">
                      {example.name}
                    </h3>
                    <p className="mb-3 text-sm text-zinc-500">{example.description}</p>

                    <div className="mb-3">
                      <p className="mb-1 font-mono text-xs text-zinc-500">input:</p>
                      <CodeBlock
                        code={JSON.stringify(example.input, null, 2)}
                        language="json"
                        id={`example-${i}-input`}
                      />
                    </div>

                    <div>
                      <p className="mb-1 font-mono text-xs text-zinc-500">output:</p>
                      <CodeBlock
                        code={JSON.stringify(example.output, null, 2)}
                        language="json"
                        id={`example-${i}-output`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PERMISSIONS TAB */}
            {activeTab === "permissions" && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-500">
                  This agent requires the following permissions to operate:
                </p>
                {agent.permissions.map((perm, i) => (
                  <div
                    key={i}
                    className="border border-zinc-200 p-4 dark:border-zinc-800"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      {perm.scope === "human:approval" ? (
                        <AlertTriangle className="size-4 text-yellow-500" />
                      ) : (
                        <Shield className="size-4 text-zinc-400" />
                      )}
                      <code className="font-mono text-sm font-medium text-black dark:text-white">
                        {perm.scope}
                      </code>
                    </div>
                    {perm.resource && (
                      <p className="mb-1 font-mono text-xs text-zinc-500">
                        resource: {perm.resource}
                      </p>
                    )}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {perm.reason}
                    </p>
                  </div>
                ))}

                {/* Required Integrations */}
                {agent.integrations.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      // required integrations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.integrations.map((integrationId) => (
                        <Link
                          key={integrationId}
                          href={`/platform/integrations/${encodeURIComponent(integrationId)}`}
                          className="border border-zinc-200 px-3 py-1.5 font-mono text-sm transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                        >
                          {integrationId}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROVIDERS TAB */}
            {activeTab === "providers" && (
              <div>
                <p className="mb-4 text-sm text-zinc-500">
                  Available compute providers for running this agent:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
                        <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">
                          provider
                        </th>
                        <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">
                          $/min
                        </th>
                        <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">
                          p50
                        </th>
                        <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">
                          p99
                        </th>
                        <th className="pb-2 pr-4 font-mono font-medium text-zinc-600 dark:text-zinc-400">
                          uptime
                        </th>
                        <th className="pb-2 font-mono font-medium text-zinc-600 dark:text-zinc-400">
                          rate_limit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {agent.providers.map((provider) => (
                        <tr
                          key={provider.name}
                          className="border-b border-zinc-100 dark:border-zinc-900"
                        >
                          <td className="py-2 pr-4 font-medium text-black dark:text-white">
                            {providerDisplayNames[provider.name]}
                          </td>
                          <td className="py-2 pr-4 font-mono text-zinc-600 dark:text-zinc-400">
                            ${(provider.pricePerMinute / 100).toFixed(2)}
                          </td>
                          <td className="py-2 pr-4 font-mono text-zinc-600 dark:text-zinc-400">
                            {provider.latencyP50}ms
                          </td>
                          <td className="py-2 pr-4 font-mono text-zinc-600 dark:text-zinc-400">
                            {provider.latencyP99}ms
                          </td>
                          <td className="py-2 pr-4 font-mono text-zinc-600 dark:text-zinc-400">
                            {provider.uptime}%
                          </td>
                          <td className="py-2 font-mono text-zinc-600 dark:text-zinc-400">
                            {provider.rateLimit}/min
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DOCS TAB */}
            {activeTab === "docs" && (
              <div className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:text-zinc-100">
                <SimpleMarkdown content={agent.documentation} />
              </div>
            )}
          </div>
        </div>

        <MetricsSidebar agent={agent} />
      </div>
    </div>
  );
}

// =============================================================================
// SIMPLE MARKDOWN RENDERER
// =============================================================================

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent = "";
  let codeBlockLang = "";
  let codeBlockIndex = 0;

  const flushCodeBlock = () => {
    if (codeBlockContent) {
      elements.push(
        <CodeBlock
          key={`code-${codeBlockIndex}`}
          code={codeBlockContent.trim()}
          language={codeBlockLang}
          id={`doc-code-${codeBlockIndex}`}
        />
      );
      codeBlockIndex++;
      codeBlockContent = "";
      codeBlockLang = "";
    }
  };

  lines.forEach((line, i) => {
    // Code block handling
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent += line + "\n";
      return;
    }

    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mb-3 mt-6 text-lg font-medium text-black first:mt-0 dark:text-white"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("| ")) {
      // Table handling - simplified, just render as code
      elements.push(
        <pre key={i} className="my-2 text-sm text-zinc-600 dark:text-zinc-400">
          {trimmed}
        </pre>
      );
    } else if (trimmed.startsWith("- ")) {
      // List items
      const content = trimmed.slice(2);
      const boldMatch = content.match(/^\*\*(.+?)\*\*\s*[-–]\s*(.+)$/);
      if (boldMatch) {
        elements.push(
          <div key={i} className="my-1 flex gap-2 text-sm">
            <span className="text-zinc-400">•</span>
            <span>
              <strong className="text-black dark:text-white">{boldMatch[1]}</strong>
              <span className="text-zinc-600 dark:text-zinc-400"> - {boldMatch[2]}</span>
            </span>
          </div>
        );
      } else {
        elements.push(
          <div key={i} className="my-1 flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">•</span>
            <span>{content}</span>
          </div>
        );
      }
    } else if (trimmed.length > 0) {
      // Regular paragraph
      elements.push(
        <p key={i} className="my-2 text-sm text-zinc-600 dark:text-zinc-400">
          {trimmed}
        </p>
      );
    }
  });

  return <div>{elements}</div>;
}
