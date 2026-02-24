// =============================================================================
// PLATFORM TYPES
// =============================================================================

export type TrustLevel = "official" | "verified" | "community";
export type SecurityScore = "low" | "medium" | "high";
export type AuthMethod = "oauth2" | "api-key" | "bearer" | "webhook" | "none" | "basic";

export interface Publisher {
  id: string;
  name: string;
  trustLevel: TrustLevel;
  verified: boolean;
}

export interface Provider {
  name: string;
  pricePerMinute: number;
  latencyP50: number;
  latencyP99: number;
  uptime: number;
  rateLimit: number;
}

export interface Permission {
  scope: string;
  resource: string;
  reason: string;
}

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  required: boolean;
  default?: string;
}

export interface SchemaError {
  code: string;
  description: string;
  retryable: boolean;
}

export interface Schema {
  input: SchemaField[];
  output: SchemaField[];
  errors: SchemaError[];
}

export interface Example {
  name: string;
  description: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}

export interface Metrics {
  lastUpdated: string;
  successRate: number;
  avgLatency: number;
  p99Latency: number;
  totalInvocations: number;
  activeInstallations: number;
  errorRate: number;
}

export interface Cost {
  type?: string;
  amount?: number;
  estimate?: string;
  breakdown?: { component: string; estimate: string }[];
  description?: string;
}

export interface CompositionStep {
  skill: string;
  inputMapping: Record<string, string>;
}

export interface Composition {
  name: string;
  description: string;
  steps: CompositionStep[];
}

// =============================================================================
// SKILL
// =============================================================================

export interface Skill {
  id: string;
  name: string;
  version: string;
  publisher: Publisher;
  description: string;
  tags: string[];
  category: string;
  schema: Schema;
  permissions: Permission[];
  cost?: Cost;
  examples: Example[];
  composesWell?: string[];
  composition?: Composition[];
  metrics: Metrics;
  documentation: string;
  // Additional fields for detail view
  about?: string;
  capabilities?: string[];
  requirements?: string[];
  usedByCompanies?: number;
  stats?: {
    activeInstallations: number;
    securityScore: SecurityScore;
    avgExecutionTime: number;
    successRate: number;
    lastUpdated: string;
  };
}

// =============================================================================
// INTEGRATION
// =============================================================================

export interface IntegrationPermission {
  name: string;
  description: string;
  required: boolean;
}

export interface Integration {
  id: string;
  name: string;
  version: string;
  publisher: Publisher;
  description: string;
  tags: string[];
  category: string;
  authMethod: AuthMethod;
  authSetupUrl?: string;
  requiredSecrets?: string[];
  skills?: string[];
  permissions: IntegrationPermission[];
  metrics: Metrics;
  documentation: string;
  // Additional fields for detail view
  about?: string;
  capabilities?: string[];
  usedByCompanies?: number;
  documentationUrl?: string;
  stats?: {
    activeConnections: number;
    securityScore: SecurityScore;
    uptime: number;
    avgLatency: number;
    lastUpdated: string;
  };
}

// =============================================================================
// AGENT
// =============================================================================

export interface Agent {
  id: string;
  name: string;
  version: string;
  publisher: Publisher;
  description: string;
  tags: string[];
  category: string;
  skills: string[];
  integrations: string[];
  permissions: Permission[];
  schema: Schema;
  examples: Example[];
  providers: Provider[];
  cost: Cost;
  metrics: Metrics;
  documentation: string;
}

// =============================================================================
// QUERY TYPES
// =============================================================================

export interface ActionQuery {
  intent: string;
  constraints?: {
    maxCost?: number;
    types?: string[];
    integrations?: string[];
  };
}

export interface ActionMatch {
  action: string;
  relevance: number;
  available: boolean;
  missing?: {
    integration?: string;
    permissions?: string[];
    budget?: boolean;
  };
}
