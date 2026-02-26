"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Shield,
  DollarSign,
  Clock,
  TrendingUp,
  User,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Skill, Agent, SecurityScore } from "@/types/platform";

const securityScoreConfig: Record<
  SecurityScore,
  { label: string; className: string }
> = {
  low: { label: "Low", className: "text-red-600 dark:text-red-400" },
  medium: { label: "Medium", className: "text-yellow-600 dark:text-yellow-400" },
  high: { label: "High", className: "text-green-600 dark:text-green-400" },
};

const costTypeLabels: Record<string, string> = {
  "per-use": "per use",
  "per-minute": "per minute",
  "per-request": "per request",
};

interface SkillDetailTabsProps {
  skill: Skill;
  relatedAgents: Agent[];
}

type TabId = "about" | "capabilities" | "agents";

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "agents", label: "Compatible Agents" },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="mb-4 list-disc space-y-1 pl-6">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={i}
          className="mb-3 mt-6 text-lg font-medium text-black first:mt-0 dark:text-white"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- **")) {
      inList = true;
      const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
      if (match) {
        listItems.push(
          <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong className="font-medium text-black dark:text-white">
              {match[1]}
            </strong>
            {match[2] && `: ${match[2]}`}
          </li>
        );
      }
    } else if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(
        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">
          {trimmed.slice(2)}
        </li>
      );
    } else if (trimmed.length > 0) {
      flushList();
      elements.push(
        <p key={i} className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {trimmed}
        </p>
      );
    }
  });

  flushList();
  return <div>{elements}</div>;
}

function StatsSidebar({ skill }: { skill: Skill }) {
  const { stats, cost } = skill;
  const developer = skill.id.split("/")[0];

  if (!stats) {
    return (
      <div className="w-full shrink-0 border-l border-zinc-200 pl-6 dark:border-zinc-800 lg:w-64">
        <h3 className="mb-4 text-sm font-medium text-black dark:text-white">Stats</h3>
        <div className="flex items-start gap-3">
          <User className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Developer</p>
            <p className="text-sm text-black dark:text-white">{developer}</p>
          </div>
        </div>
      </div>
    );
  }

  const securityConfig = securityScoreConfig[stats.securityScore];

  return (
    <div className="w-full shrink-0 border-l border-zinc-200 pl-6 dark:border-zinc-800 lg:w-64">
      <h3 className="mb-4 text-sm font-medium text-black dark:text-white">Stats</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Developer</p>
            <p className="text-sm text-black dark:text-white">{developer}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Download className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Active Installations</p>
            <p className="text-sm text-black dark:text-white">
              {stats.activeInstallations.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Security Score</p>
            <p className={`text-sm font-medium ${securityConfig.className}`}>
              {securityConfig.label}
            </p>
          </div>
        </div>
        {cost && cost.amount && cost.type && (
          <div className="flex items-start gap-3">
            <DollarSign className="mt-0.5 size-4 text-zinc-400" />
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">Additional Cost</p>
              <p className="text-sm text-black dark:text-white">
                ${(cost.amount / 100).toFixed(2)} {costTypeLabels[cost.type]}
              </p>
              {cost.description && (
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                  {cost.description}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Avg Execution Time</p>
            <p className="text-sm text-black dark:text-white">
              {formatDuration(stats.avgExecutionTime)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Success Rate</p>
            <p className="text-sm text-black dark:text-white">{stats.successRate}%</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 size-4 text-zinc-400" />
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Last Updated</p>
            <p className="text-sm text-black dark:text-white">
              {formatDate(stats.lastUpdated)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillDetailTabs({ skill, relatedAgents }: SkillDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  return (
    <div>
      <div className="mb-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          {activeTab === "about" && skill.about && <SimpleMarkdown content={skill.about} />}

          {activeTab === "capabilities" && (
            <div className="space-y-6">
              {skill.capabilities && skill.capabilities.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {skill.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {capability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {skill.requirements && skill.requirements.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {skill.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {skill.cost && skill.cost.amount && skill.cost.type && (
                <div className="border border-zinc-200 p-4 dark:border-zinc-800">
                  <h3 className="mb-2 text-sm font-medium text-black dark:text-white">
                    Additional Costs
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    This skill incurs additional costs of{" "}
                    <span className="font-medium text-black dark:text-white">
                      ${(skill.cost.amount / 100).toFixed(2)}{" "}
                      {costTypeLabels[skill.cost.type]}
                    </span>{" "}
                    {skill.cost.description && `(${skill.cost.description})`}.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "agents" && (
            <div>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                This skill can be attached to any of the following agents to extend
                their capabilities.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedAgents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/docs/agents/${encodeURIComponent(agent.id)}`}
                    className="group border border-zinc-200 p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-black dark:text-white">
                        {agent.name}
                      </h3>
                      <ArrowRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {agent.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {agent.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <StatsSidebar skill={skill} />
      </div>
    </div>
  );
}
