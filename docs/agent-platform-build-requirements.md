# Agent Platform Build Requirements (Implementation Handoff)

## 1) Intent and constraints already decided

This plan is based on the current platform intent documented in:
- `/src/app/platform/foundations/page.tsx`
- `/src/app/platform/architecture/page.tsx`
- `/src/app/platform/agent-first-platform/page.tsx`
- `/src/app/platform/agent-first/page.tsx`

Non-negotiable principles already established:
- Trust is default; verification is infrastructure.
- Single gateway enforcement point for all actions.
- Sessions never hold integration credentials.
- Permission model is `namespace:verb:resource` with mode `auto|approve`.
- Memory is platform-level, scoped by hierarchy, and governed by permissions.
- Sub-sessions only narrow trust and permissions.
- Humans can observe and intervene at any point.

## 2) Recommended stack

- Control plane web: Next.js (App Router) + TypeScript.
- CLI: Go (`cobra` + `viper`) as `oc`.
- Core APIs: Go services (or one modular Go service initially).
- DB: Postgres (primary system of record).
- Cache/coordination: Redis (approval wait state, rate limits, session counters).
- Async jobs: Temporal (preferred) or a queue + worker pattern.
- Search: Postgres FTS first for `find`; upgrade to vector search later.
- Infra runtime: Daytona for isolated session execution.
- Auth: OAuth 2.1/OIDC for users; short-lived session tokens for agents.

## 3) System components (MVP-to-prod path)

- `control-plane` (Next.js): auth UI, session list, approvals, integrations, registries.
- `api-gateway` (Go): authN/authZ, permission match, approval orchestration, audit.
- `session-manager` (Go): Daytona lifecycle, budgets, parent-child tree, status.
- `credential-service` (Go): encrypted token storage + provider connectors.
- `memory-service` (Go): facts/episodes/procedures, scoring, recall.
- `action-registry` (Go): skills/agents/action metadata + runnable bindings.
- `oc-cli` (Go): thin API wrapper with strong UX + JSON output.

## 4) Milestone plan

## Milestone 0 (added): foundations before feature work
Goal: reduce rework and secure later milestones.

Scope:
- Define canonical IDs and tenancy model (`org`, `workspace`, `agent`, `session`).
- Define API error model (`code`, `message`, `retryable`, `details`).
- Define audit event schema and immutable event log table.
- Define permission parser/matcher library as shared module.

Acceptance:
- OpenAPI published for core endpoints.
- Permission matching test matrix committed.
- Audit events emitted for all API mutations.

---

## Milestone 1: Simple CLI + Daytona session spawn + auth + session overview
Matches your step `1`.

Scope:
- `oc login` (human auth via browser; token cached locally).
- `oc whoami`, `oc org`, `oc workspace switch`.
- `oc spawn <agent>` spawns Daytona session with preinstalled `oc`.
- Session bootstrap injects short-lived platform session token.
- `oc status` and `oc status --json` from inside/outside session.
- Basic session list/detail in web UI.

Required endpoints:
- `POST /v1/auth/device/start`, `POST /v1/auth/device/complete` (or OIDC callback flow).
- `POST /v1/sessions`
- `GET /v1/sessions/:id`
- `GET /v1/sessions`

Daytona requirements:
- Base image includes `oc` binary and bootstrap script.
- Workspace mounted and session metadata available as env vars.
- TTL/cleanup for orphaned sessions.

Acceptance:
- Human can log in, spawn session, and run `oc status` in Daytona.
- Session appears in web UI with task, budget, parent, status.
- No direct external credentials exist in session env or filesystem.

---

## Milestone 2: Permissions + gateway + security model
Matches your step `2`.

Scope:
- Gateway becomes required path for all `oc do`.
- Permission grants with fields:
  `permission`, `mode(auto|approve)`, `delegatable`, `expires_at|never`, `scope`.
- Runtime enforcement at gateway (not client).
- Approval flow for `approve` mode with timeout.
- Mid-session revoke support (effective next request).
- Audit log records permission used, cost, latency, actor.

Security requirements:
- Credential vault with encryption at rest + key rotation support.
- Signed service-to-service tokens (mTLS optional in early stage).
- Rate limits:
  - max pending approvals/session
  - request burst limits
  - wall-clock session timeout

Acceptance:
- Denied actions never reach external API.
- Revoking permission blocks next matching action in same session.
- Approval decisions can be session-only or persisted.
- Full request trace visible in audit timeline.

---

## Milestone 3: Tool authentication flows (starting with Google) from CLI
Matches your step `3`.

Scope:
- `oc connect google` OAuth flow.
- Store Google tokens platform-side only (encrypted).
- Token refresh + revocation handling.
- Action bindings for initial Google tools (pick 1-2 only first):
  - `google:calendar:list-events`
  - `google:gmail:send`
- `oc integrations` status and missing scopes.

Acceptance:
- User can connect Google once, then agent actions execute through gateway.
- Missing scope errors are actionable (`reauthorize` with listed scopes).
- Disconnect/revoke immediately blocks action execution.

---

## Milestone 4: Memory system
Matches your step `4`.

Scope:
- `oc remember`, `oc recall`, `oc forget`.
- Memory types: `fact | episode | procedure`.
- Scope hierarchy: `org > workspace > project > user > session`.
- Permission-protected memory access:
  - `memory:read:<scope>`
  - `memory:write:<scope>`
- Ranking uses relevance + recency + confidence.
- Contradiction marking for stale facts.

Data model minimum:
- `memories(id, type, content, scope_kind, scope_id, confidence, created_by, created_at, last_accessed_at, stale_flag)`
- `memory_links(memory_id, session_id|event_id, relation_type)`

Acceptance:
- `oc recall` excludes out-of-scope records.
- Old contradictory fact is marked stale when new fact supersedes it.
- Audit includes memory read/write events.

---

## Milestone 5: Sub-sessions and delegation
Matches your step `5`.

Scope:
- `oc spawn` from agent session creates child session.
- Child permissions must be subset of parent and only delegatable permissions.
- Child budget is carved from parent remaining budget.
- Depth/concurrency constraints enforced.
- `oc agents`, `oc result`, `oc kill` for child management.

Acceptance:
- Attempt to delegate non-held or non-delegatable permission is rejected.
- Child cannot expand scope by wildcard broadening.
- Parent sees child cost/time in aggregated session budget.

---

## Milestone 6: Find + registries + execute
Matches your step `6`.

Scope:
- Build searchable registries for:
  - actions
  - skills
  - agents
- `oc find "<intent>"` returns ranked actions with availability state:
  - available (`auto|approve`)
  - blocked by missing integration
  - blocked by missing permission
  - blocked by budget
- Web UI pages for skills/agents registry with install/enable/run actions.
- `oc do` executes selected action through gateway using registry metadata.

Implementation note:
- Start retrieval with lexical+metadata ranking in Postgres.
- Add embeddings only if quality is insufficient.

Acceptance:
- Top results include actionable reasons when unavailable.
- Installed/enabled registry items are runnable without restarting sessions.
- Search and run paths are fully audited.

---

## Milestone 7: Final hardening + deep tests
Matches your step `7`.

Scope:
- End-to-end test suite across full lifecycle.
- Security testing: auth bypass, permission escalation, token leakage checks.
- Chaos/reliability tests: approval delays, provider failures, Daytona restarts.
- Performance tests: p95 latency for `oc do`, `oc find`, `oc recall`.
- Runbooks + SLOs + incident response docs.

Exit criteria:
- All P0/P1 test cases green.
- No known privilege-escalation paths.
- Recovery procedure validated for failed sessions and stuck approvals.

## 5) Suggested additional production milestones

Add these after milestone 7 or in parallel where practical:

- Milestone 8: observability + cost controls
  - per-workspace spend caps, anomaly alerts, request tracing dashboards.
- Milestone 9: policy and compliance
  - retention rules, export/delete controls, SOC2-ready audit exports.
- Milestone 10: rollout strategy
  - tenant-level feature flags, canary orgs, backward-compatible CLI versioning.

## 6) Cross-cutting acceptance criteria (all milestones)

- `oc` supports `--json` on all machine-usable commands.
- Every state-changing operation emits audit event with actor/session/workspace.
- All permission checks happen server-side at gateway.
- No integration secret/token is returned in API responses to sessions.
- Clear, stable error codes for UX and automation.

## 7) Minimal delivery order for one engineer (pragmatic)

1. Milestone 0 + Milestone 1.
2. Milestone 2 (gateway before broad integrations).
3. Milestone 3 (Google auth vertical slice).
4. Milestone 4.
5. Milestone 5.
6. Milestone 6.
7. Milestone 7.

## 8) Risks and mitigations

- Risk: permission model drift across services.
  - Mitigation: one shared matcher library and conformance tests.
- Risk: approval flow race conditions.
  - Mitigation: idempotent request IDs + Redis locks + explicit request states.
- Risk: Daytona session/token leakage.
  - Mitigation: short-lived scoped tokens + no long-lived credentials in session.
- Risk: memory quality regressions.
  - Mitigation: ranking evaluations with golden queries and contradiction tests.

## 9) Definition of done for v1 production

- New user can:
  - log in, connect Google, spawn Daytona session, run `oc status`.
  - discover and execute at least 3 real actions via `oc find` + `oc do`.
  - use approvals for high-risk actions and see full audit trail.
  - persist and recall memory across sessions.
  - delegate to sub-session safely and retrieve results.

- Operator can:
  - revoke permissions/integrations in real-time.
  - inspect complete session/action timeline.
  - enforce workspace-level budget and policy boundaries.
