# OpenCompany Intent Alignment Matrix

Date: 2026-02-24

## Scope

This report compares:

- OpenCompany OSS and CLI specs in `../opencompany`
- Agent-platform frontend specs in `src/app/platform`

Legend:

- **Aligned**: same intent and compatible execution model
- **Partial**: same direction, different framing/scope
- **Gap**: materially different in current implementation/spec phase

## Alignment Matrix

| Area | OpenCompany OSS/CLI (current spec) | Agent-platform frontend spec | Status | Canonical Source (Now) | Recommended Action |
|---|---|---|---|---|---|
| Core primitives | `skills + integrations` remain separate first-class concepts | Explicit simplification toward `Action` as umbrella concept | Partial | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | Keep OSS model for MVP; add explicit terminology bridge (`skill/tool/capability -> action`) |
| Command surface (MVP) | `oc init`, `oc skill`, `oc spawn`, `oc validate`, `oc list`, `oc cleanup` | Expanded CLI (`oc do/find/can/request/remember/recall/...`) | Gap | `../opencompany/oss/core/cli/README.md` | Treat frontend command surface as roadmap (post-MVP), not shipping contract |
| Config/bootstrap | `.opencompany` auto-bootstrap; `default_agent` required | Session-centric flow is compatible | Aligned | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | No change |
| Permission semantics | Tier/capability model + denial contract | `auto/approve` mode integrated into permission grant UX | Partial | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | Add mode vocabulary mapping into OSS docs to reduce drift |
| Auth/secrets | One prompt per integration/session; on-demand injection; redaction | Same gateway/injection philosophy | Aligned | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | No change |
| Denial handling | Canonical denial reasons + exit semantics | Richer human approval UX (`request/approve/deny`) | Partial | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | Keep contract-level denial model now; add UX commands in phased rollout |
| Memory model | Not central in CLI MVP contract | First-class (`oc remember/recall/forget` + typed memory) | Gap | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | Mark memory commands explicitly out-of-scope for MVP or define Phase 2 contract |
| Org/workspace model | Org-centric architecture + multi-tenant/BYOK | Explicit CLI UX for org/workspace administration | Partial | `../opencompany/docs/architecture/README.md` | Keep architecture canonical; phase CLI org/workspace commands after core MVP |
| Session controls | `spawn` is core | Adds operational controls (`watch/log/pause/resume/budget/revoke/kill`) | Partial | `../opencompany/oss/core/cli/README.md` | Sequence controls as post-MVP operational layer |
| Trust policy for OSS skills | Warning-based trust posture in MVP | Trust-growth narrative and progressive autonomy | Aligned | `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` | No change for MVP; plan progressive trust policy as later enhancement |

## Conclusion

There is substantial overlap in **destination intent** (agent-first execution platform with scoped permissions, sessions, integrations, and human oversight), but clear divergence in **time horizon and contract strictness**:

- OpenCompany OSS/CLI specs are a **buildable MVP contract now**.
- Agent-platform frontend specs describe a **north-star CLI and governance UX**.

## Canonicality Recommendation

For implementation decisions today:

1. Treat `../opencompany/docs/engineering/local-cli-ecosystem-mvp-spec.md` as the canonical CLI/OSS contract.
2. Treat `../opencompany/oss/core/cli/README.md` as the canonical user-facing command set for MVP.
3. Treat `src/app/platform/agent-first-platform/page.tsx` and `src/app/platform/foundations/page.tsx` as roadmap/north-star references until explicitly promoted.

## Suggested Next Actions

1. Add a short "spec hierarchy" note in `../opencompany` defining canonical docs and precedence.
2. Add a `Now / Later` command availability matrix to prevent accidental non-MVP implementation.
3. Add a terminology map (`skill`, `integration`, `capability`, `action`) shared across both repos.
