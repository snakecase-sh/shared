export interface User {
  id: string;
  githubId: number;
  username: string;
  email: string | null;
  avatar: string | null;
  displayName: string | null;
  bio: string | null;
  plan: 'free' | 'pro' | 'team';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPresence {
  userId: string;
  status: 'online' | 'away' | 'dnd' | 'invisible';
  lastSeenAt: Date;
  customStatus?: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  lastActivityAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface UserEntitlements {
  userId: string;
  plan: 'free' | 'pro' | 'team';
  messageTextMaxChars: number;
  codeBlockMaxChars: number;
  attachmentMaxSize: number;
  storageTotal: number;
  storageUsed: number;
  retentionDays: number;
  dmRequestsPerDay: number;
  dmRequestsPendingMax: number;
  aiActionsPerWeek: number;
  aiActionsUsedThisWeek: number;
  groupsMax: number;
  groupMembersMax: number;
  exportsEnabled: boolean;
  auditLogsEnabled: boolean;
  samlSSOEnabled: boolean;
}
