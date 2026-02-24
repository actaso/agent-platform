"use client";

import {
  Link as LinkIcon,
  Zap,
  Shield,
  Database,
  GitBranch,
  User,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Server,
  Lock,
  Eye,
  Clock,
  XCircle,
  Building2,
  Layers,
} from "lucide-react";

// =============================================================================
// ARCHITECTURE REFERENCE DIAGRAM
// Full-screen visual map: Human → Platform → Session
// =============================================================================

function ConceptNode({
  icon: Icon,
  name,
  definition,
  color,
  borderColor,
  children,
}: {
  icon: React.ElementType;
  name: string;
  definition: string;
  color: string;
  borderColor: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`border-2 ${borderColor} bg-white dark:bg-zinc-950`}>
      <div className={`${color} px-4 py-3`}>
        <div className="flex items-center gap-2.5">
          <Icon className="size-4 shrink-0" />
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs opacity-75">{definition}</p>
          </div>
        </div>
      </div>
      {children && (
        <div className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      )}
    </div>
  );
}

function ConnectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
      {children}
    </span>
  );
}

export default function ArchitecturePage() {
  return (
    <div className="-ml-8 -mt-8 min-h-[calc(100vh-3.5rem)] bg-zinc-50 dark:bg-zinc-950">
      {/* Title bar */}
      <div className="border-b border-zinc-200 bg-white px-8 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              Architecture Reference
            </p>
            <h1 className="text-lg font-medium text-black dark:text-white">
              Platform Architecture
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span>
              Organization + Workspace + Human + Platform + Session
            </span>
          </div>
        </div>
      </div>

      {/* Diagram area */}
      <div className="flex min-h-[calc(100vh-7.5rem)] items-start justify-center overflow-auto px-8 py-10">
        <div className="w-full max-w-5xl space-y-0">

          {/* ============================================================ */}
          {/* ORGANIZATION — outermost container                            */}
          {/* ============================================================ */}
          <div className="border-2 border-indigo-400 bg-indigo-50/30 dark:border-indigo-600 dark:bg-indigo-950/20">
            {/* Org header */}
            <div className="flex items-center justify-between border-b border-indigo-300 bg-indigo-100 px-5 py-3 dark:border-indigo-700 dark:bg-indigo-950/50">
              <div className="flex items-center gap-2.5">
                <Building2 className="size-4 text-indigo-600 dark:text-indigo-300" />
                <div>
                  <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                    Organization
                  </span>
                  <span className="ml-3 text-xs text-indigo-700 dark:text-indigo-300">
                    Acme Inc — top-level billing, membership, shared resources
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                <span>members</span>
                <span className="text-indigo-300 dark:text-indigo-700">|</span>
                <span>billing</span>
                <span className="text-indigo-300 dark:text-indigo-700">|</span>
                <span>org integrations</span>
              </div>
            </div>

            {/* Org interior */}
            <div className="p-4 space-y-0">

              {/* Org-level integrations row */}
              <div className="mb-3 flex items-center gap-3 border border-dashed border-indigo-300 bg-white/60 px-4 py-2 dark:border-indigo-700 dark:bg-zinc-900/40">
                <LinkIcon className="size-3.5 text-indigo-500" />
                <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">Org-level Integrations</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400">— shared across all workspaces</span>
                <div className="ml-auto flex items-center gap-3 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-green-500" /> GitHub</span>
                  <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-green-500" /> Stripe</span>
                </div>
              </div>

              {/* ============================================================ */}
              {/* WORKSPACE — scoped container within org                       */}
              {/* ============================================================ */}
              <div className="border-2 border-cyan-400 bg-white/50 dark:border-cyan-700 dark:bg-zinc-950/30">
                {/* Workspace header */}
                <div className="flex items-center justify-between border-b border-cyan-300 bg-cyan-50 px-5 py-2.5 dark:border-cyan-800 dark:bg-cyan-950/40">
                  <div className="flex items-center gap-2.5">
                    <Layers className="size-4 text-cyan-600 dark:text-cyan-300" />
                    <div>
                      <span className="text-sm font-semibold text-cyan-900 dark:text-cyan-100">
                        Workspace
                      </span>
                      <span className="ml-3 text-xs text-cyan-700 dark:text-cyan-300">
                        Engineering (default) — scoped container for agents, permissions, memory
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[10px] text-cyan-600 dark:text-cyan-400">
                    <span>agents</span>
                    <span className="text-cyan-300 dark:text-cyan-700">|</span>
                    <span>trust profiles</span>
                    <span className="text-cyan-300 dark:text-cyan-700">|</span>
                    <span>workspace integrations</span>
                  </div>
                </div>

                {/* Workspace interior */}
                <div className="p-4 space-y-0">

          {/* LAYER 0: HUMAN */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 border-2 border-zinc-300 bg-white px-6 py-3 dark:border-zinc-600 dark:bg-zinc-900">
              <User className="size-5 text-zinc-700 dark:text-zinc-300" />
              <div>
                <p className="text-sm font-semibold text-black dark:text-white">
                  Human
                </p>
                <p className="text-xs text-zinc-500">
                  Connects integrations, grants permissions, spawns sessions, approves escalations
                </p>
              </div>
            </div>
          </div>

          {/* Connector: Human → Platform */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-6">
                <ConnectionLabel>connects</ConnectionLabel>
                <ConnectionLabel>configures</ConnectionLabel>
                <ConnectionLabel>observes</ConnectionLabel>
              </div>
              <ArrowDown className="size-3.5 text-zinc-400" />
            </div>
          </div>

          {/* ============================================================ */}
          {/* PLATFORM INFRASTRUCTURE                                       */}
          {/* Contains: Integration Store + Gateway                         */}
          {/* ============================================================ */}
          <div className="border-2 border-zinc-400 bg-white dark:border-zinc-500 dark:bg-zinc-900/80">
            {/* Platform header */}
            <div className="flex items-center justify-between border-b border-zinc-300 bg-zinc-100 px-5 py-3 dark:border-zinc-600 dark:bg-zinc-800">
              <div className="flex items-center gap-2.5">
                <Server className="size-4 text-zinc-600 dark:text-zinc-300" />
                <div>
                  <span className="text-sm font-semibold text-black dark:text-white">
                    Platform
                  </span>
                  <span className="ml-3 text-xs text-zinc-500">
                    Infrastructure that makes trust safe to extend
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-500">
                <span>credential store</span>
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <span>gateway</span>
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <span>audit log</span>
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <span>memory store</span>
              </div>
            </div>

            {/* Platform interior */}
            <div className="p-6">
              <div className="grid grid-cols-[1fr_auto_1.8fr] items-stretch gap-0">
                {/* INTEGRATION CREDENTIAL STORE */}
                <ConceptNode
                  icon={LinkIcon}
                  name="Integration Store"
                  definition="Org + workspace credentials"
                  color="bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100"
                  borderColor="border-blue-300 dark:border-blue-800"
                >
                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-green-500" />
                        <span>Slack #engineering</span>
                        <span className="ml-auto font-mono text-[10px] text-cyan-500">
                          workspace
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-green-500" />
                        <span>GitHub</span>
                        <span className="ml-auto font-mono text-[10px] text-indigo-500">
                          org
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-green-500" />
                        <span>Stripe</span>
                        <span className="ml-auto font-mono text-[10px] text-indigo-500">
                          org
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        <span className="text-zinc-400">Email</span>
                        <span className="ml-auto font-mono text-[10px] text-zinc-400">
                          not connected
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-blue-100 pt-2 dark:border-blue-900">
                      <p className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400">
                        <Lock className="size-2.5" />
                        Inherits org integrations + workspace-level
                      </p>
                    </div>
                  </div>
                </ConceptNode>

                {/* Arrow: Store → Gateway */}
                <div className="flex flex-col items-center justify-center px-3">
                  <ConnectionLabel>injects into</ConnectionLabel>
                  <div className="mt-1 flex items-center">
                    <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                    <ArrowRight className="size-3 text-zinc-400" />
                  </div>
                </div>

                {/* PLATFORM GATEWAY */}
                <div className="border-2 border-red-300 bg-white dark:border-red-800 dark:bg-zinc-950">
                  <div className="bg-red-50 px-4 py-3 dark:bg-red-950">
                    <div className="flex items-center gap-2.5">
                      <Shield className="size-4 shrink-0 text-red-700 dark:text-red-300" />
                      <div>
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                          Platform Gateway
                        </p>
                        <p className="text-xs text-red-700 dark:text-red-300">
                          Every action flows through here — the single enforcement point
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <Shield className="mt-0.5 size-3 shrink-0 text-green-500" />
                        <div>
                          <p className="font-medium text-black dark:text-white">
                            Permission enforcement
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            Checks session permissions against
                            namespace:verb:resource on every request
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <Lock className="mt-0.5 size-3 shrink-0 text-blue-500" />
                        <div>
                          <p className="font-medium text-black dark:text-white">
                            Credential injection
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            Retrieves real tokens from store, injects into
                            outbound requests
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <Eye className="mt-0.5 size-3 shrink-0 text-yellow-500" />
                        <div>
                          <p className="font-medium text-black dark:text-white">
                            Audit logging
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            Every request logged with session, permission used,
                            cost, duration
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <XCircle className="mt-0.5 size-3 shrink-0 text-red-500" />
                        <div>
                          <p className="font-medium text-black dark:text-white">
                            Real-time revocation
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            Permissions can be revoked mid-session — takes
                            effect on next request
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* The flow */}
                    <div className="mt-3 border-t border-red-100 pt-3 dark:border-red-900/50">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-mono text-zinc-400">
                          oc do slack:send
                        </span>
                        <ArrowRight className="size-2.5 text-zinc-400" />
                        <span className="text-green-600 dark:text-green-400">
                          permission check
                        </span>
                        <ArrowRight className="size-2.5 text-zinc-400" />
                        <span className="text-blue-600 dark:text-blue-400">
                          credential inject
                        </span>
                        <ArrowRight className="size-2.5 text-zinc-400" />
                        <span className="text-zinc-600 dark:text-zinc-300">
                          api.slack.com
                        </span>
                        <ArrowRight className="size-2.5 text-zinc-400" />
                        <span className="text-yellow-600 dark:text-yellow-400">
                          audit log
                        </span>
                        <ArrowRight className="size-2.5 text-zinc-400" />
                        <span className="font-mono text-zinc-400">
                          response
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connector: Platform → Session */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-6">
                <ConnectionLabel>spawns into</ConnectionLabel>
                <ConnectionLabel>enforces for</ConnectionLabel>
              </div>
              <ArrowDown className="size-3.5 text-zinc-400" />
            </div>
          </div>

          {/* ============================================================ */}
          {/* LAYER 2: SESSION                                             */}
          {/* The agent's runtime — calls gateway, never external APIs     */}
          {/* ============================================================ */}
          <div className="border-2 border-orange-300 bg-white dark:border-orange-800 dark:bg-zinc-900/50">
            {/* Session header */}
            <div className="flex items-center justify-between border-b border-orange-200 bg-orange-50 px-5 py-3 dark:border-orange-900 dark:bg-orange-950/30">
              <div className="flex items-center gap-2.5">
                <GitBranch className="size-4 text-orange-600 dark:text-orange-400" />
                <div>
                  <span className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                    Session
                  </span>
                  <span className="ml-3 text-xs text-orange-700 dark:text-orange-300">
                    Agent's runtime — calls gateway, never external APIs directly
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] text-orange-600 dark:text-orange-400">
                <span>task</span>
                <span className="text-orange-300 dark:text-orange-700">|</span>
                <span>permissions</span>
                <span className="text-orange-300 dark:text-orange-700">|</span>
                <span>budget</span>
                <span className="text-orange-300 dark:text-orange-700">|</span>
                <span>memory scope</span>
              </div>
            </div>

            {/* Session interior */}
            <div className="space-y-5 p-6">
              {/* ======================================================== */}
              {/* ROW 1: Action + Permission (what the agent sees)          */}
              {/* ======================================================== */}
              <div className="grid grid-cols-[1.2fr_auto_1fr_auto_1fr] items-start gap-0">
                {/* ACTION */}
                <ConceptNode
                  icon={Zap}
                  name="Action"
                  definition="Something I can do (via gateway)"
                  color="bg-purple-50 text-purple-900 dark:bg-purple-950 dark:text-purple-100"
                  borderColor="border-purple-300 dark:border-purple-800"
                >
                  <div className="space-y-2">
                    <div>
                      <p className="mb-1 font-medium text-black dark:text-white">
                        Three types:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border border-zinc-100 px-2 py-1 dark:border-zinc-800">
                          <p className="font-medium text-blue-600 dark:text-blue-400">
                            Integration
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            slack:send
                          </p>
                        </div>
                        <div className="border border-zinc-100 px-2 py-1 dark:border-zinc-800">
                          <p className="font-medium text-purple-600 dark:text-purple-400">
                            Compute
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            summarize
                          </p>
                        </div>
                        <div className="border border-zinc-100 px-2 py-1 dark:border-zinc-800">
                          <p className="font-medium text-green-600 dark:text-green-400">
                            Paid
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            web-scrape
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] italic text-zinc-400">
                      Discovered by intent via oc find
                    </p>
                  </div>
                </ConceptNode>

                {/* Arrow: Action ← Permission */}
                <div className="flex flex-col items-center justify-center self-center px-2">
                  <ConnectionLabel>gated by</ConnectionLabel>
                  <div className="mt-1 flex items-center">
                    <div className="h-px w-6 bg-zinc-300 dark:bg-zinc-700" />
                    <ArrowRight className="size-3 text-zinc-400" />
                  </div>
                </div>

                {/* PERMISSION */}
                <ConceptNode
                  icon={Shield}
                  name="Permission"
                  definition="What I'm allowed to do"
                  color="bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100"
                  borderColor="border-green-300 dark:border-green-800"
                >
                  <div className="space-y-2">
                    <p className="font-mono text-[10px]">
                      <span className="text-blue-500">namespace</span>
                      <span className="text-zinc-400">:</span>
                      <span className="text-purple-500">verb</span>
                      <span className="text-zinc-400">:</span>
                      <span className="text-green-500">resource</span>
                    </p>
                    <div className="space-y-1 font-mono text-[10px]">
                      <p>slack:send:#engineering</p>
                      <p>github:read:acme/api/*</p>
                      <p className="text-zinc-400">
                        github:merge:* (approve)
                      </p>
                    </div>
                    <p className="text-[10px] italic text-green-600 dark:text-green-400">
                      Enforced at gateway, not client-side
                    </p>
                  </div>
                </ConceptNode>

                {/* Arrow → Trust Escalation */}
                <div className="flex flex-col items-center justify-center self-center px-2">
                  <div className="h-px w-6 bg-zinc-300 dark:bg-zinc-700" />
                </div>

                {/* Trust escalation */}
                <div className="border border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
                  <div className="px-4 py-3">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-300">
                      <ArrowUpRight className="size-3" />
                      Trust Escalation
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-[10px]">
                        <span className="flex size-4 shrink-0 items-center justify-center bg-green-100 font-mono text-[9px] font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
                          1
                        </span>
                        <div>
                          <span className="font-medium text-black dark:text-white">New</span>
                          <span className="ml-1 text-zinc-400">— scoped, approval for writes</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-[10px]">
                        <span className="flex size-4 shrink-0 items-center justify-center bg-green-100 font-mono text-[9px] font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
                          2
                        </span>
                        <div>
                          <span className="font-medium text-black dark:text-white">Established</span>
                          <span className="ml-1 text-zinc-400">— broad read, familiar writes</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-[10px]">
                        <span className="flex size-4 shrink-0 items-center justify-center bg-green-100 font-mono text-[9px] font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
                          3
                        </span>
                        <div>
                          <span className="font-medium text-black dark:text-white">Trusted</span>
                          <span className="ml-1 text-zinc-400">— wide, gates on high-risk only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* Connector to Memory                                       */}
              {/* ======================================================== */}
              <div className="flex justify-center">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <ChevronDown className="size-3.5 text-zinc-400" />
                    <ConnectionLabel>logs to</ConnectionLabel>
                  </div>
                  <div className="flex flex-col items-center">
                    <ConnectionLabel>recalls from</ConnectionLabel>
                    <ChevronDown className="size-3.5 rotate-180 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* ROW 2: MEMORY                                            */}
              {/* ======================================================== */}
              <div className="border-2 border-yellow-300 bg-white dark:border-yellow-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between border-b border-yellow-200 bg-yellow-50 px-5 py-2.5 dark:border-yellow-900 dark:bg-yellow-950/30">
                  <div className="flex items-center gap-2.5">
                    <Database className="size-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                      Memory
                    </span>
                    <span className="ml-2 text-xs text-yellow-700 dark:text-yellow-300">
                      What I know, with time and confidence
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-yellow-600 dark:text-yellow-400">
                    persists across sessions (stored platform-side)
                  </span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="size-2 bg-yellow-500" />
                        <span className="text-xs font-semibold text-black dark:text-white">
                          Fact
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        Something true (may become stale)
                      </p>
                      <div className="border-l-2 border-yellow-200 pl-2 font-mono text-[10px] text-zinc-400 dark:border-yellow-800">
                        "Deploy target is Vercel"
                        <br />
                        confidence: 90% · 2w ago
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="size-2 bg-yellow-500" />
                        <span className="text-xs font-semibold text-black dark:text-white">
                          Episode
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        Something that happened (immutable)
                      </p>
                      <div className="border-l-2 border-yellow-200 pl-2 font-mono text-[10px] text-zinc-400 dark:border-yellow-800">
                        "Mar 15: Deploy failed,
                        <br />
                        DB migration missing"
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="size-2 bg-yellow-500" />
                        <span className="text-xs font-semibold text-black dark:text-white">
                          Procedure
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        How to do something (learned)
                      </p>
                      <div className="border-l-2 border-yellow-200 pl-2 font-mono text-[10px] text-zinc-400 dark:border-yellow-800">
                        "Run e2e tests before
                        <br />
                        deploy" · confidence: 85%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-yellow-100 pt-3 text-[10px] text-zinc-400 dark:border-yellow-900/50">
                    <span className="font-medium text-zinc-500">
                      Scope hierarchy:
                    </span>
                    <span className="border border-indigo-200 px-1.5 py-0.5 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400">
                      org:acme
                    </span>
                    <span className="text-zinc-300">&gt;</span>
                    <span className="border border-cyan-200 px-1.5 py-0.5 text-cyan-600 dark:border-cyan-800 dark:text-cyan-400">
                      workspace:engineering
                    </span>
                    <span className="text-zinc-300">&gt;</span>
                    <span className="border border-zinc-200 px-1.5 py-0.5 dark:border-zinc-800">
                      project:acme/api
                    </span>
                    <span className="text-zinc-300">&gt;</span>
                    <span className="border border-zinc-200 px-1.5 py-0.5 dark:border-zinc-800">
                      user:louis
                    </span>
                    <span className="text-zinc-300">&gt;</span>
                    <span className="border border-zinc-200 px-1.5 py-0.5 dark:border-zinc-800">
                      session:sess_abc
                    </span>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* ROW 3: SUB-SESSION                                       */}
              {/* ======================================================== */}
              <div className="border border-dashed border-orange-300 bg-orange-50/30 dark:border-orange-800 dark:bg-orange-950/10">
                <div className="flex items-center gap-2 border-b border-dashed border-orange-200 px-4 py-2 dark:border-orange-900">
                  <GitBranch className="size-3 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-800 dark:text-orange-200">
                    Sub-Session
                  </span>
                  <span className="text-[10px] text-orange-600 dark:text-orange-400">
                    — same gateway, narrower permissions, scoped budget
                  </span>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 text-[10px]">
                  <div className="space-y-1 text-zinc-500">
                    <p>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        Task:
                      </span>{" "}
                      "Check for SQL injection"
                    </p>
                    <p>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        Permission:
                      </span>{" "}
                      github:read:acme/api/pulls/456
                    </p>
                    <p>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        Budget:
                      </span>{" "}
                      $0.50 max · 60s timeout
                    </p>
                  </div>
                  <div className="ml-auto text-zinc-400">
                    <p className="text-[10px] italic">
                      Routes through same gateway.
                      <br />
                      Gateway knows sub-session has narrower scope.
                      <br />
                      Trust chain only narrows, never widens.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session footer */}
            <div className="border-t border-orange-200 bg-orange-50/50 px-5 py-3 dark:border-orange-900 dark:bg-orange-950/20">
              <p className="text-center text-xs font-medium text-orange-800 dark:text-orange-200">
                Trust is the default. The gateway is the verification infrastructure.
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* EXTERNAL WORLD (below session)                               */}
          {/* ============================================================ */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <ArrowDown className="size-3.5 text-zinc-400" />
              <ConnectionLabel>gateway proxies to</ConnectionLabel>
              <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <div className="border border-zinc-200 bg-zinc-50 px-4 py-2 text-center dark:border-zinc-700 dark:bg-zinc-800">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">api.slack.com</p>
            </div>
            <div className="border border-zinc-200 bg-zinc-50 px-4 py-2 text-center dark:border-zinc-700 dark:bg-zinc-800">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">api.github.com</p>
            </div>
            <div className="border border-zinc-200 bg-zinc-50 px-4 py-2 text-center dark:border-zinc-700 dark:bg-zinc-800">
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">api.stripe.com</p>
            </div>
            <div className="border border-dashed border-zinc-200 bg-zinc-50 px-4 py-2 text-center dark:border-zinc-700 dark:bg-zinc-800">
              <p className="text-xs text-zinc-400">+ any integration</p>
            </div>
          </div>

                </div>{/* end Workspace interior */}

                {/* Workspace footer */}
                <div className="border-t border-cyan-200 bg-cyan-50/50 px-5 py-2 dark:border-cyan-800 dark:bg-cyan-950/20">
                  <p className="text-center text-[10px] text-cyan-700 dark:text-cyan-300">
                    Workspace scopes: agents, permissions, memory, sessions. Org = workspace by default.
                  </p>
                </div>
              </div>{/* end Workspace */}

            </div>{/* end Org interior */}
          </div>{/* end Organization */}

          {/* ============================================================ */}
          {/* LEGEND                                                        */}
          {/* ============================================================ */}
          <div className="mt-8 border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              {/* Concept legend */}
              <div className="space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Components
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950" />
                    <span className="font-medium text-black dark:text-white">
                      Organization
                    </span>
                    <span className="text-zinc-400">
                      — billing, members, shared integrations
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-cyan-400 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-950" />
                    <span className="font-medium text-black dark:text-white">
                      Workspace
                    </span>
                    <span className="text-zinc-400">
                      — scoped container (org = workspace by default)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950" />
                    <span className="font-medium text-black dark:text-white">
                      Integration
                    </span>
                    <span className="text-zinc-400">
                      — org-level or workspace-level
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950" />
                    <span className="font-medium text-black dark:text-white">
                      Gateway
                    </span>
                    <span className="text-zinc-400">
                      — enforcement, injection, audit
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-purple-300 bg-purple-50 dark:border-purple-800 dark:bg-purple-950" />
                    <span className="font-medium text-black dark:text-white">
                      Action
                    </span>
                    <span className="text-zinc-400">
                      — routed through gateway
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950" />
                    <span className="font-medium text-black dark:text-white">
                      Permission
                    </span>
                    <span className="text-zinc-400">
                      — enforced at gateway
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950" />
                    <span className="font-medium text-black dark:text-white">
                      Memory
                    </span>
                    <span className="text-zinc-400">
                      — persists across sessions
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 border-2 border-orange-300 bg-orange-50 dark:border-orange-800 dark:bg-orange-950" />
                    <span className="font-medium text-black dark:text-white">
                      Session
                    </span>
                    <span className="text-zinc-400">
                      — agent runtime
                    </span>
                  </div>
                </div>
              </div>

              {/* Key relationships */}
              <div className="shrink-0 space-y-3 pl-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Key Relationships
                </p>
                <div className="space-y-1 text-[10px] text-zinc-500">
                  <p>
                    Organization{" "}
                    <span className="font-mono text-zinc-400">—contains→</span>{" "}
                    Workspaces (org = workspace by default)
                  </p>
                  <p>
                    Workspace{" "}
                    <span className="font-mono text-zinc-400">—inherits→</span>{" "}
                    Org-level integrations + own integrations
                  </p>
                  <p>
                    Session{" "}
                    <span className="font-mono text-zinc-400">—calls→</span>{" "}
                    Gateway{" "}
                    <span className="font-mono text-zinc-400">—proxies→</span>{" "}
                    External API
                  </p>
                  <p>
                    Gateway{" "}
                    <span className="font-mono text-zinc-400">—checks→</span>{" "}
                    Permission{" "}
                    <span className="font-mono text-zinc-400">—before→</span>{" "}
                    every Action
                  </p>
                  <p>
                    Memory{" "}
                    <span className="font-mono text-zinc-400">
                      —scoped to→
                    </span>{" "}
                    org &gt; workspace &gt; project &gt; user &gt; session
                  </p>
                  <p>
                    Sub-session{" "}
                    <span className="font-mono text-zinc-400">—uses same→</span>{" "}
                    Gateway (narrower scope)
                  </p>
                </div>
              </div>
            </div>

            {/* Principles row */}
            <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <div className="flex items-center gap-6 text-[10px] text-zinc-400">
                <span className="font-mono uppercase tracking-widest">
                  Why Gateway
                </span>
                <span>
                  Humans grant broader permissions because they can revoke instantly
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <span>Sessions never hold credentials — blast radius bounded</span>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <span>
                  Complete audit trail at one point
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <span>
                  Permission changes take effect immediately
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
