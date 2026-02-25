FROM ubuntu:24.04

ARG OC_VERSION=milestone-1

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl jq bash nodejs \
  && rm -rf /var/lib/apt/lists/*

# Milestone 1 image contract:
# - oc binary exists in PATH
# - bootstrap entrypoint prepares short-lived session metadata env
# - no external integration credentials are baked into image
COPY bin/oc.mjs /usr/local/bin/oc
COPY daytona/session-image/oc-session-bootstrap /usr/local/bin/oc-session-bootstrap
RUN chmod +x /usr/local/bin/oc /usr/local/bin/oc-session-bootstrap

WORKDIR /workspace

ENTRYPOINT ["/usr/local/bin/oc-session-bootstrap"]
