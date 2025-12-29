export const PLAN_LIMITS = {
  free: {
    messageTextMaxChars: 4000,
    codeBlockMaxChars: 30000,
    attachmentMaxSize: 10 * 1024 * 1024, // 10 MB
    storageTotal: 1 * 1024 * 1024 * 1024, // 1 GB
    retentionDays: 30,
    dmRequestsPerDay: 5,
    dmRequestsPendingMax: 10,
    aiActionsPerWeek: 10,
    groupsMax: 3,
    groupMembersMax: 20,
  },
  pro: {
    messageTextMaxChars: 20000,
    codeBlockMaxChars: 200000,
    attachmentMaxSize: 100 * 1024 * 1024, // 100 MB
    storageTotal: 50 * 1024 * 1024 * 1024, // 50 GB
    retentionDays: 365,
    dmRequestsPerDay: Infinity,
    dmRequestsPendingMax: Infinity,
    aiActionsPerWeek: Infinity,
    groupsMax: Infinity,
    groupMembersMax: Infinity,
    exportsEnabled: true,
  },
  team: {
    messageTextMaxChars: 20000,
    codeBlockMaxChars: 200000,
    attachmentMaxSize: 100 * 1024 * 1024, // 100 MB
    storageTotal: 100 * 1024 * 1024 * 1024, // 100 GB per user
    retentionDays: 365,
    dmRequestsPerDay: Infinity,
    dmRequestsPendingMax: Infinity,
    aiActionsPerWeek: Infinity,
    groupsMax: Infinity,
    groupMembersMax: Infinity,
    exportsEnabled: true,
    auditLogsEnabled: true,
    samlSSOEnabled: true,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;
