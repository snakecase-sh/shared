declare const PLAN_LIMITS: {
    readonly free: {
        readonly messageTextMaxChars: 4000;
        readonly codeBlockMaxChars: 30000;
        readonly attachmentMaxSize: number;
        readonly storageTotal: number;
        readonly retentionDays: 30;
        readonly dmRequestsPerDay: 5;
        readonly dmRequestsPendingMax: 10;
        readonly aiActionsPerWeek: 10;
        readonly groupsMax: 3;
        readonly groupMembersMax: 20;
    };
    readonly pro: {
        readonly messageTextMaxChars: 20000;
        readonly codeBlockMaxChars: 200000;
        readonly attachmentMaxSize: number;
        readonly storageTotal: number;
        readonly retentionDays: 365;
        readonly dmRequestsPerDay: number;
        readonly dmRequestsPendingMax: number;
        readonly aiActionsPerWeek: number;
        readonly groupsMax: number;
        readonly groupMembersMax: number;
        readonly exportsEnabled: true;
    };
    readonly team: {
        readonly messageTextMaxChars: 20000;
        readonly codeBlockMaxChars: 200000;
        readonly attachmentMaxSize: number;
        readonly storageTotal: number;
        readonly retentionDays: 365;
        readonly dmRequestsPerDay: number;
        readonly dmRequestsPendingMax: number;
        readonly aiActionsPerWeek: number;
        readonly groupsMax: number;
        readonly groupMembersMax: number;
        readonly exportsEnabled: true;
        readonly auditLogsEnabled: true;
        readonly samlSSOEnabled: true;
    };
};
type PlanType = keyof typeof PLAN_LIMITS;

export { PLAN_LIMITS, type PlanType };
