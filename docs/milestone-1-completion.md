# Milestone 1 Completion

This repository now implements the Milestone 1 vertical slice defined in [agent-platform-build-requirements.md](/Users/louismorgner/Desktop/ALL/CODE/ACTASTUDIOS/agent-platform/docs/agent-platform-build-requirements.md):

- `oc login` with local token cache
- `oc whoami`, `oc org`, `oc workspace switch`
- `oc spawn <agent>` session creation with Daytona bootstrap context
- `oc status` / `oc status --json` from outside or inside a session
- Session list and detail pages in web UI
- Required endpoints under `/v1/*`

## Session Bootstrap and Daytona Contract

Session creation now returns bootstrap context:

- short-lived `sessionToken`
- expiration timestamp
- environment values required for in-session execution:
  - `OC_API_BASE_URL`
  - `OC_SESSION_ID`
  - `OC_SESSION_TOKEN`
  - `OC_ORG_ID`
  - `OC_WORKSPACE_ID`
  - `OC_AGENT_ID`

Daytona artifacts:

- image definition: [daytona/session-image/Dockerfile](/Users/louismorgner/Desktop/ALL/CODE/ACTASTUDIOS/agent-platform/daytona/session-image/Dockerfile)
- bootstrap entrypoint: [daytona/session-image/oc-session-bootstrap](/Users/louismorgner/Desktop/ALL/CODE/ACTASTUDIOS/agent-platform/daytona/session-image/oc-session-bootstrap)

The bootstrap script fails if an external integration token is detected in the session environment.

## TTL Cleanup

The control-plane store runs maintenance on access:

- expired access tokens removed
- expired session tokens removed
- active sessions past `ttlExpiresAt` auto-marked `terminated`

Set `OC_SESSION_TTL_SECONDS` to override default session TTL (default is 4 hours).
