export type ApprovalMode = "auto" | "approve";
export type SessionStatus = "active" | "completed" | "failed" | "terminated";
export type SessionParentType = "human" | "agent";

export interface ApiErrorPayload {
  code: string;
  message: string;
  retryable: boolean;
  details?: Record<string, unknown>;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
}

export interface OrgSummary {
  id: string;
  name: string;
}

export interface WorkspaceSummary {
  id: string;
  name: string;
}

export interface SessionPermission {
  permission: string;
  mode: ApprovalMode;
  delegatable: boolean;
}

export interface SessionBudgetCounter {
  used: number;
  limit: number;
}

export interface SessionBudget {
  costCents: SessionBudgetCounter;
  durationSeconds: SessionBudgetCounter;
  actions: SessionBudgetCounter;
}

export interface SessionTask {
  description: string;
  input: Record<string, unknown>;
}

export interface SessionParent {
  type: SessionParentType;
  id: string;
  name: string;
}

export interface SessionAgent {
  id: string;
  version: string;
  instance: string;
}

export interface SessionRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: SessionStatus;
  org: OrgSummary;
  workspace: WorkspaceSummary;
  agent: SessionAgent;
  parent: SessionParent;
  task: SessionTask;
  budget: SessionBudget;
  permissions: SessionPermission[];
  actions: string[];
  daytona: {
    image: string;
    workspacePath: string;
    ttlExpiresAt: string;
    bootstrapScript: string;
    metadataEnv: string[];
  };
  bootstrap: {
    platformSessionTokenExpiresAt: string;
  };
}

export interface DeviceStartResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

export interface DeviceCompleteResponse {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  expires_at: string;
  user: UserSummary;
  org: OrgSummary;
  workspace: WorkspaceSummary;
}

export interface WhoAmIResponse {
  user: UserSummary;
  org: OrgSummary;
  workspace: WorkspaceSummary;
}

export interface OrgResponse {
  org: OrgSummary;
  currentWorkspace: WorkspaceSummary;
  workspaces: WorkspaceSummary[];
}

export interface WorkspaceSwitchResponse {
  org: OrgSummary;
  workspace: WorkspaceSummary;
}

export interface CreateSessionRequest {
  agent: string;
  task?: {
    description?: string;
    input?: Record<string, unknown>;
  };
  budget?: {
    costLimitCents?: number;
    durationLimitSeconds?: number;
    actionLimit?: number;
  };
  workspaceId?: string;
}

export interface SessionBootstrapContext {
  sessionToken: string;
  sessionTokenExpiresAt: string;
  env: Record<string, string>;
}

export interface CreateSessionResult {
  session: SessionRecord;
  bootstrap: SessionBootstrapContext;
}
