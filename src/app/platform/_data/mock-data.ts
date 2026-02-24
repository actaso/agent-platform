import type {
  Agent,
  Skill,
  Integration,
  Provider,
  Publisher,
} from "@/types/platform";

// =============================================================================
// PUBLISHERS
// =============================================================================

const opencompanyPublisher: Publisher = {
  id: "opencompany",
  name: "OpenCompany",
  trustLevel: "official",
  verified: true,
};

// =============================================================================
// PROVIDERS
// =============================================================================

const defaultProviders: Provider[] = [
  {
    name: "codex",
    pricePerMinute: 35,
    latencyP50: 120,
    latencyP99: 450,
    uptime: 99.9,
    rateLimit: 100,
  },
  {
    name: "claude-code",
    pricePerMinute: 50,
    latencyP50: 200,
    latencyP99: 800,
    uptime: 99.5,
    rateLimit: 60,
  },
  {
    name: "open-code",
    pricePerMinute: 25,
    latencyP50: 180,
    latencyP99: 600,
    uptime: 99.0,
    rateLimit: 80,
  },
];

// =============================================================================
// SKILLS
// =============================================================================

export const skills: Skill[] = [
  {
    id: "opencompany/code-review",
    name: "Code Review",
    version: "2.1.0",
    publisher: opencompanyPublisher,
    description: "Analyzes code diffs for bugs, security issues, and style violations",
    tags: ["code", "review", "security", "quality"],
    category: "Development",
    usedByCompanies: 2156,
    about: `## Overview

Code Review is a comprehensive static analysis skill that examines code changes for potential issues before they reach production.

## How It Works

The skill parses your code diff and runs multiple analysis passes:

- **Security scan** - Identifies common vulnerabilities like SQL injection, XSS, and sensitive data exposure
- **Style check** - Enforces consistent coding patterns and best practices
- **Bug detection** - Finds potential runtime errors and logic issues

## Best Used For

- Automated PR review pipelines
- Pre-commit validation
- Security audits on code changes`,
    capabilities: [
      "Detect security vulnerabilities in code changes",
      "Check for common bugs and anti-patterns",
      "Enforce coding style and best practices",
      "Support for 10+ programming languages",
      "Contextual suggestions with code examples",
    ],
    requirements: [
      "Valid unified diff format or file contents",
      "Optional: Repository context for deeper analysis",
    ],
    stats: {
      activeInstallations: 2156,
      securityScore: "high" as const,
      avgExecutionTime: 1.2,
      successRate: 98.5,
      lastUpdated: "2025-01-20",
    },
    schema: {
      input: [
        {
          name: "diff",
          type: "string",
          description: "Unified diff format or file contents to review",
          required: true,
        },
        {
          name: "language",
          type: '"typescript" | "python" | "go" | "rust" | "java" | "auto"',
          description: "Programming language (auto-detected if not specified)",
          required: false,
          default: '"auto"',
        },
        {
          name: "context",
          type: "{ repoUrl?: string; prNumber?: number; baseRef?: string }",
          description: "Optional repository context for better analysis",
          required: false,
        },
        {
          name: "rules",
          type: "string[]",
          description: "Specific rules to check (e.g., ['no-console', 'security/*'])",
          required: false,
        },
      ],
      output: [
        {
          name: "issues",
          type: "{ line: number; severity: 'error' | 'warning' | 'info'; message: string; rule: string; suggestion?: string }[]",
          description: "List of identified issues with locations and fixes",
          required: true,
        },
        {
          name: "summary",
          type: "{ totalIssues: number; errors: number; warnings: number; securityIssues: number }",
          description: "Aggregate counts by severity",
          required: true,
        },
        {
          name: "approved",
          type: "boolean",
          description: "Whether the code passes review (no errors)",
          required: true,
        },
      ],
      errors: [
        {
          code: "PARSE_ERROR",
          description: "Failed to parse the provided diff or code",
          retryable: false,
        },
        {
          code: "LANGUAGE_UNSUPPORTED",
          description: "The detected/specified language is not supported",
          retryable: false,
        },
        {
          code: "TIMEOUT",
          description: "Analysis exceeded time limit (large diffs)",
          retryable: true,
        },
      ],
    },
    permissions: [
      {
        scope: "read:network",
        resource: "github.com/*",
        reason: "Fetch PR context and file history when context.repoUrl provided",
      },
    ],
    cost: {
      type: "per-call",
      amount: 2,
      estimate: "~$0.02 per review",
    },
    examples: [
      {
        name: "Basic diff review",
        description: "Review a simple code change",
        input: {
          diff: `--- a/src/auth.ts
+++ b/src/auth.ts
@@ -15,6 +15,7 @@ export function login(user: string, pass: string) {
+  console.log("Password:", pass);
   return authenticate(user, pass);
 }`,
          language: "typescript",
        },
        output: {
          issues: [
            {
              line: 16,
              severity: "error",
              message: "Logging sensitive data (password) to console",
              rule: "security/no-sensitive-logging",
              suggestion: "Remove console.log or redact sensitive values",
            },
          ],
          summary: { totalIssues: 1, errors: 1, warnings: 0, securityIssues: 1 },
          approved: false,
        },
      },
    ],
    composesWell: [
      "opencompany/github-pr",
      "opencompany/slack-notify",
      "opencompany/summarize",
    ],
    composition: [
      {
        name: "PR Review Pipeline",
        description: "Fetch PR, review code, post results to Slack",
        steps: [
          { skill: "opencompany/github-pr", inputMapping: { prUrl: "$input.prUrl" } },
          { skill: "opencompany/code-review", inputMapping: { diff: "$prev.diff", context: "$prev.context" } },
          { skill: "opencompany/slack-notify", inputMapping: { channel: "$input.channel", message: "$prev.summary" } },
        ],
      },
    ],
    metrics: {
      lastUpdated: "2025-01-20",
      successRate: 98.5,
      avgLatency: 1200,
      p99Latency: 4500,
      totalInvocations: 142847,
      activeInstallations: 2156,
      errorRate: 1.5,
    },
    documentation: `## Usage

\`\`\`typescript
const result = await oc.invoke("opencompany/code-review", {
  diff: gitDiff,
  language: "typescript",
  rules: ["security/*", "no-console"]
});

if (!result.approved) {
  console.log(\`Found \${result.summary.totalIssues} issues\`);
  result.issues.forEach(issue => {
    console.log(\`Line \${issue.line}: \${issue.message}\`);
  });
}
\`\`\`

## Supported Languages

TypeScript, JavaScript, Python, Go, Rust, Java, C++, Ruby, PHP.

## Rules

- \`security/*\` - All security-related checks
- \`no-console\` - Flag console.log statements
- \`complexity\` - Cyclomatic complexity warnings
- \`types\` - Type safety issues (TS/Flow)

## Rate Limits

- 100 requests/minute per installation
- Max diff size: 500KB
- Timeout: 30 seconds`,
  },
  {
    id: "opencompany/summarize",
    name: "Summarize",
    version: "1.4.0",
    publisher: opencompanyPublisher,
    description: "Condenses text into key points with configurable output format",
    tags: ["text", "summary", "nlp"],
    category: "Productivity",
    usedByCompanies: 982,
    about: `## Overview

Summarize is a powerful text condensation skill that extracts key information from long documents, meeting notes, emails, and more.

## How It Works

Using advanced natural language processing, the skill identifies the most important sentences and concepts, then reformats them according to your preferences.

## Best Used For

- Meeting note summaries
- Document abstracts
- Email digests
- Action item extraction`,
    capabilities: [
      "Condense long documents to key points",
      "Multiple output formats (bullets, numbered, paragraph)",
      "Focus on specific topics or action items",
      "Preserve important context and details",
    ],
    requirements: [
      "Text content between 100 and 250,000 words",
    ],
    stats: {
      activeInstallations: 982,
      securityScore: "high" as const,
      avgExecutionTime: 0.8,
      successRate: 99.2,
      lastUpdated: "2025-01-18",
    },
    schema: {
      input: [
        {
          name: "text",
          type: "string",
          description: "The text content to summarize",
          required: true,
        },
        {
          name: "maxLength",
          type: "number",
          description: "Maximum length of summary in characters",
          required: false,
          default: "500",
        },
        {
          name: "format",
          type: '"paragraph" | "bullets" | "numbered"',
          description: "Output format style",
          required: false,
          default: '"bullets"',
        },
        {
          name: "focus",
          type: "string",
          description: "Optional focus area (e.g., 'action items', 'decisions')",
          required: false,
        },
      ],
      output: [
        {
          name: "summary",
          type: "string",
          description: "The condensed summary",
          required: true,
        },
        {
          name: "keyPoints",
          type: "string[]",
          description: "Extracted key points as array",
          required: true,
        },
        {
          name: "wordCount",
          type: "{ original: number; summary: number }",
          description: "Word counts for compression ratio",
          required: true,
        },
      ],
      errors: [
        {
          code: "TEXT_TOO_SHORT",
          description: "Input text is too short to summarize meaningfully",
          retryable: false,
        },
        {
          code: "TEXT_TOO_LONG",
          description: "Input exceeds maximum length (1MB)",
          retryable: false,
        },
      ],
    },
    permissions: [],
    cost: {
      type: "per-token",
      estimate: "~$0.001 per 1K input tokens",
    },
    examples: [
      {
        name: "Meeting notes",
        description: "Summarize meeting transcript to action items",
        input: {
          text: "In today's standup, Alice mentioned the auth bug is blocking deployment. Bob said he'll review the PR by EOD. We decided to push the release to Thursday...",
          format: "bullets",
          focus: "action items",
        },
        output: {
          summary: "• Auth bug blocking deployment (Alice)\n• PR review by EOD (Bob)\n• Release pushed to Thursday",
          keyPoints: [
            "Auth bug blocking deployment",
            "PR review pending from Bob",
            "Release date moved to Thursday",
          ],
          wordCount: { original: 34, summary: 18 },
        },
      },
    ],
    composesWell: [
      "opencompany/slack-notify",
      "opencompany/email-send",
      "opencompany/translate",
    ],
    metrics: {
      lastUpdated: "2025-01-18",
      successRate: 99.2,
      avgLatency: 800,
      p99Latency: 2200,
      totalInvocations: 89234,
      activeInstallations: 982,
      errorRate: 0.8,
    },
    documentation: `## Usage

\`\`\`typescript
const result = await oc.invoke("opencompany/summarize", {
  text: longDocument,
  maxLength: 300,
  format: "bullets",
  focus: "decisions"
});

console.log(result.summary);
// Compression: \${result.wordCount.original} → \${result.wordCount.summary} words
\`\`\`

## Formats

- \`paragraph\` - Flowing prose summary
- \`bullets\` - Unordered list of key points
- \`numbered\` - Ordered list by importance

## Limits

- Max input: 1MB (~250K words)
- Max output: 10K characters`,
  },
];

// =============================================================================
// INTEGRATIONS
// =============================================================================

export const integrations: Integration[] = [
  {
    id: "opencompany/slack",
    name: "Slack",
    version: "3.2.0",
    publisher: opencompanyPublisher,
    description: "Send messages, read channels, and manage Slack workflows",
    tags: ["messaging", "notifications", "collaboration"],
    category: "Communication",
    usedByCompanies: 3421,
    about: `## Overview

The Slack integration enables your agents to communicate with your team through Slack workspaces.

## Features

- Send messages to channels and users
- Read channel history and context
- Add reactions to messages
- Thread support for conversations

## Security

All messages are sent through Slack's official API using your workspace's bot token. Messages are logged for audit purposes.`,
    capabilities: [
      "Send messages to channels and users",
      "Read channel history",
      "Add emoji reactions",
      "Thread replies",
      "File uploads",
    ],
    documentationUrl: "https://api.slack.com/docs",
    stats: {
      activeConnections: 3421,
      securityScore: "high" as const,
      uptime: 99.8,
      avgLatency: 150,
      lastUpdated: "2025-01-21",
    },
    authMethod: "oauth2",
    authSetupUrl: "https://api.slack.com/apps",
    requiredSecrets: ["SLACK_BOT_TOKEN", "SLACK_SIGNING_SECRET"],
    skills: [
      "opencompany/slack-send",
      "opencompany/slack-read",
      "opencompany/slack-react",
    ],
    permissions: [
      {
        name: "chat:write",
        description: "Send messages to channels and users",
        required: true,
      },
      {
        name: "channels:read",
        description: "Access channel information and membership",
        required: true,
      },
      {
        name: "channels:history",
        description: "Read message history in channels",
        required: true,
      },
      {
        name: "reactions:write",
        description: "Add emoji reactions to messages",
        required: false,
      },
      {
        name: "files:write",
        description: "Upload files to channels",
        required: false,
      },
    ],
    metrics: {
      lastUpdated: "2025-01-21",
      successRate: 99.8,
      avgLatency: 150,
      p99Latency: 400,
      totalInvocations: 1247892,
      activeInstallations: 3421,
      errorRate: 0.2,
    },
    documentation: `## Setup

1. Create a Slack app at https://api.slack.com/apps
2. Add bot scopes: \`chat:write\`, \`channels:read\`, \`channels:history\`
3. Install to workspace and copy Bot Token
4. Add secrets to your OpenCompany config:

\`\`\`bash
oc secrets set SLACK_BOT_TOKEN=xoxb-...
oc secrets set SLACK_SIGNING_SECRET=...
\`\`\`

## Enabled Skills

Once connected, these skills become available:

- \`opencompany/slack-send\` - Post messages to channels
- \`opencompany/slack-read\` - Read channel history
- \`opencompany/slack-react\` - Add emoji reactions`,
  },
  {
    id: "opencompany/github",
    name: "GitHub",
    version: "2.8.0",
    publisher: opencompanyPublisher,
    description: "Manage repositories, PRs, issues, and code on GitHub",
    tags: ["git", "code", "version-control", "ci"],
    category: "Development",
    usedByCompanies: 2847,
    about: `## Overview

The GitHub integration connects your agents to your GitHub repositories, enabling automated code review, issue management, and PR workflows.

## Features

- Read and create pull requests
- Manage issues and projects
- Post comments and reviews
- Access commit history and diffs

## Security

Uses GitHub Apps or Personal Access Tokens with fine-grained permissions. Only requested scopes are accessed.`,
    capabilities: [
      "Create and manage pull requests",
      "Post code reviews and comments",
      "Read commit history and diffs",
      "Manage issues and labels",
      "Trigger workflow actions",
    ],
    documentationUrl: "https://docs.github.com/en/rest",
    stats: {
      activeConnections: 2847,
      securityScore: "high" as const,
      uptime: 99.5,
      avgLatency: 230,
      lastUpdated: "2025-01-22",
    },
    authMethod: "oauth2",
    authSetupUrl: "https://github.com/settings/apps",
    requiredSecrets: ["GITHUB_TOKEN"],
    skills: [
      "opencompany/github-pr",
      "opencompany/github-issue",
      "opencompany/github-commit",
      "opencompany/github-review",
    ],
    permissions: [
      {
        name: "repo",
        description: "Full access to repositories (code, issues, pull requests)",
        required: true,
      },
      {
        name: "pull_requests:read",
        description: "Read pull request details and diffs",
        required: true,
      },
      {
        name: "pull_requests:write",
        description: "Create and merge pull requests",
        required: true,
      },
      {
        name: "issues:read",
        description: "Read issue details",
        required: false,
      },
      {
        name: "issues:write",
        description: "Create and update issues",
        required: false,
      },
    ],
    metrics: {
      lastUpdated: "2025-01-22",
      successRate: 99.5,
      avgLatency: 230,
      p99Latency: 890,
      totalInvocations: 892341,
      activeInstallations: 2847,
      errorRate: 0.5,
    },
    documentation: `## Setup

1. Create a GitHub App or Personal Access Token
2. Required scopes: \`repo\`, \`pull_requests\`, \`issues\`
3. Add to OpenCompany:

\`\`\`bash
oc secrets set GITHUB_TOKEN=ghp_...
\`\`\`

## Enabled Skills

- \`opencompany/github-pr\` - Create, read, merge PRs
- \`opencompany/github-issue\` - Manage issues
- \`opencompany/github-commit\` - Read commits and diffs
- \`opencompany/github-review\` - Post PR reviews`,
  },
];

// =============================================================================
// AGENTS
// =============================================================================

export const agents: Agent[] = [
  {
    id: "opencompany/code-reviewer",
    name: "Code Reviewer",
    version: "2.0.0",
    publisher: opencompanyPublisher,
    description: "Autonomous code review agent that analyzes PRs and posts feedback",
    tags: ["code-review", "github", "automation", "quality"],
    category: "Engineering",
    skills: ["opencompany/code-review", "opencompany/summarize"],
    integrations: ["opencompany/github", "opencompany/slack"],
    permissions: [
      {
        scope: "read:network",
        resource: "api.github.com/*",
        reason: "Fetch PR diffs and file contents",
      },
      {
        scope: "write:network",
        resource: "api.github.com/*",
        reason: "Post review comments on PRs",
      },
      {
        scope: "write:network",
        resource: "slack.com/api/*",
        reason: "Send notifications to Slack channels",
      },
      {
        scope: "access:secrets",
        resource: "GITHUB_TOKEN, SLACK_BOT_TOKEN",
        reason: "Authenticate with GitHub and Slack APIs",
      },
    ],
    schema: {
      input: [
        {
          name: "prUrl",
          type: "string",
          description: "GitHub PR URL to review (e.g., https://github.com/org/repo/pull/123)",
          required: true,
        },
        {
          name: "postReview",
          type: "boolean",
          description: "Whether to post the review as a GitHub comment",
          required: false,
          default: "true",
        },
        {
          name: "slackChannel",
          type: "string",
          description: "Slack channel to notify (e.g., #engineering)",
          required: false,
        },
        {
          name: "autoApprove",
          type: "boolean",
          description: "Auto-approve PRs with no issues found",
          required: false,
          default: "false",
        },
      ],
      output: [
        {
          name: "review",
          type: "{ approved: boolean; issues: Issue[]; summary: string }",
          description: "The complete review result",
          required: true,
        },
        {
          name: "actions",
          type: "{ githubCommentUrl?: string; slackMessageTs?: string }",
          description: "URLs/IDs of posted content",
          required: true,
        },
      ],
      errors: [
        {
          code: "PR_NOT_FOUND",
          description: "The specified PR URL is invalid or inaccessible",
          retryable: false,
        },
        {
          code: "PERMISSION_DENIED",
          description: "Missing required permissions for the repository",
          retryable: false,
        },
        {
          code: "RATE_LIMITED",
          description: "GitHub API rate limit exceeded",
          retryable: true,
        },
      ],
    },
    examples: [
      {
        name: "Review a PR",
        description: "Analyze a PR and post results to GitHub and Slack",
        input: {
          prUrl: "https://github.com/acme/api/pull/456",
          postReview: true,
          slackChannel: "#code-reviews",
        },
        output: {
          review: {
            approved: false,
            issues: [
              {
                line: 42,
                severity: "error",
                message: "SQL injection vulnerability",
                file: "src/db/queries.ts",
              },
            ],
            summary: "Found 1 critical security issue. Please fix before merging.",
          },
          actions: {
            githubCommentUrl: "https://github.com/acme/api/pull/456#issuecomment-123",
            slackMessageTs: "1705847293.000100",
          },
        },
      },
    ],
    providers: defaultProviders,
    cost: {
      estimate: "$0.05-0.15 per PR review",
      breakdown: [
        { component: "Code analysis", estimate: "$0.02-0.08" },
        { component: "GitHub API calls", estimate: "$0.01" },
        { component: "Slack notification", estimate: "$0.01" },
      ],
    },
    metrics: {
      lastUpdated: "2025-01-20",
      successRate: 97.8,
      avgLatency: 4500,
      p99Latency: 12000,
      totalInvocations: 45672,
      activeInstallations: 524,
      errorRate: 2.2,
    },
    documentation: `## Quick Start

\`\`\`typescript
const result = await oc.invoke("opencompany/code-reviewer", {
  prUrl: "https://github.com/your-org/repo/pull/123",
  postReview: true,
  slackChannel: "#engineering"
});

if (result.review.approved) {
  console.log("PR approved!");
} else {
  console.log(\`Found \${result.review.issues.length} issues\`);
}
\`\`\`

## Webhook Trigger

Set up automatic reviews on PR open:

\`\`\`yaml
# .github/workflows/review.yml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: opencompany/code-reviewer@v2
        with:
          pr-url: \${{ github.event.pull_request.html_url }}
          slack-channel: "#reviews"
\`\`\`

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`postReview\` | boolean | true | Post review to GitHub |
| \`slackChannel\` | string | - | Slack channel for notifications |
| \`autoApprove\` | boolean | false | Auto-approve clean PRs |

## Required Integrations

- **GitHub** - For reading PRs and posting reviews
- **Slack** (optional) - For notifications`,
  },
  {
    id: "opencompany/support-agent",
    name: "Support Agent",
    version: "1.5.0",
    publisher: opencompanyPublisher,
    description: "Handles customer inquiries, resolves issues, escalates when needed",
    tags: ["support", "customer-service", "automation"],
    category: "Support",
    skills: ["opencompany/summarize"],
    integrations: ["opencompany/slack"],
    permissions: [
      {
        scope: "read:network",
        resource: "slack.com/api/*",
        reason: "Read customer messages",
      },
      {
        scope: "write:network",
        resource: "slack.com/api/*",
        reason: "Send responses",
      },
      {
        scope: "human:approval",
        resource: "*",
        reason: "Escalate complex issues to human agents",
      },
    ],
    schema: {
      input: [
        {
          name: "message",
          type: "string",
          description: "Customer inquiry text",
          required: true,
        },
        {
          name: "customerId",
          type: "string",
          description: "Customer identifier for context lookup",
          required: false,
        },
        {
          name: "channel",
          type: '"slack" | "email" | "api"',
          description: "Response channel",
          required: true,
        },
      ],
      output: [
        {
          name: "response",
          type: "string",
          description: "Generated response to customer",
          required: true,
        },
        {
          name: "escalated",
          type: "boolean",
          description: "Whether issue was escalated to human",
          required: true,
        },
        {
          name: "category",
          type: "string",
          description: "Detected issue category",
          required: true,
        },
      ],
      errors: [
        {
          code: "CONTEXT_NOT_FOUND",
          description: "Could not find customer context",
          retryable: false,
        },
      ],
    },
    examples: [
      {
        name: "Simple inquiry",
        description: "Handle a billing question",
        input: {
          message: "How do I update my payment method?",
          customerId: "cust_123",
          channel: "slack",
        },
        output: {
          response: "You can update your payment method in Settings → Billing → Payment Methods. Would you like me to send you a direct link?",
          escalated: false,
          category: "billing",
        },
      },
    ],
    providers: defaultProviders,
    cost: {
      estimate: "$0.01-0.05 per inquiry",
    },
    metrics: {
      lastUpdated: "2025-01-19",
      successRate: 96.3,
      avgLatency: 1200,
      p99Latency: 3500,
      totalInvocations: 234567,
      activeInstallations: 456,
      errorRate: 3.7,
    },
    documentation: `## Usage

\`\`\`typescript
const result = await oc.invoke("opencompany/support-agent", {
  message: customerMessage,
  customerId: "cust_123",
  channel: "slack"
});

if (result.escalated) {
  notifyHumanAgent(result);
} else {
  sendResponse(result.response);
}
\`\`\``,
  },
];

// =============================================================================
// GETTERS
// =============================================================================

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}

export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id);
}

export function getIntegrationById(id: string): Integration | undefined {
  return integrations.find((integration) => integration.id === id);
}

// Query capabilities by intent (simplified mock)
export function queryCapabilities(intent: string): Skill[] {
  const lower = intent.toLowerCase();
  return skills.filter(
    (skill) =>
      skill.description.toLowerCase().includes(lower) ||
      skill.tags.some((tag) => lower.includes(tag))
  );
}
