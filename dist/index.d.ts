import { Socket, Server } from 'socket.io';
import { Socket as Socket$1 } from 'socket.io-client';
import { z } from 'zod';

interface User {
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
interface UserPresence {
    userId: string;
    status: 'online' | 'away' | 'dnd' | 'invisible';
    lastSeenAt: Date;
    customStatus?: string;
}
interface Session {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    lastActivityAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
}
interface UserEntitlements {
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

interface Workspace {
    id: string;
    githubOrgId: number;
    name: string;
    slug: string;
    avatar: string | null;
    ownerId: string;
    plan: 'free' | 'pro' | 'team';
    createdAt: Date;
    updatedAt: Date;
}
interface WorkspaceMember {
    id: string;
    workspaceId: string;
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
}

interface Channel {
    id: string;
    workspaceId: string;
    name: string;
    topic: string | null;
    isPrivate: boolean;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    archivedAt: Date | null;
}
interface ChannelMember {
    id: string;
    channelId: string;
    userId: string;
    role: 'admin' | 'member';
    joinedAt: Date;
}

type ConversationType = 'dm' | 'group' | 'workspace_channel' | 'pr_room';
interface BaseConversation {
    id: string;
    type: ConversationType;
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
}
interface DMConversation extends BaseConversation {
    type: 'dm';
    participantIds: [string, string];
}
interface GroupConversation extends BaseConversation {
    type: 'group';
    name: string;
    avatar: string | null;
    ownerId: string;
    participantIds: string[];
}
interface WorkspaceChannelConversation extends BaseConversation {
    type: 'workspace_channel';
    channelId: string;
    workspaceId: string;
}
interface PRRoomConversation extends BaseConversation {
    type: 'pr_room';
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
    participantIds: string[];
}
type Conversation = DMConversation | GroupConversation | WorkspaceChannelConversation | PRRoomConversation;
interface ConversationMember {
    id: string;
    conversationId: string;
    userId: string;
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
}
interface GroupChatSettings {
    conversationId: string;
    allowMemberInvites: boolean;
    onlyAdminCanPost: boolean;
    onlyAdminCanPin: boolean;
    allowReactions: boolean;
    allowThreads: boolean;
    allowFileSharing: boolean;
    maxMembers: number;
    description: string | null;
    isPublic: boolean;
    joinLink: string | null;
    joinLinkExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
interface GroupChatMember extends ConversationMember {
    role: 'owner' | 'admin' | 'member';
    permissions: GroupChatPermissions;
    nickname: string | null;
    invitedById: string | null;
    leftAt: Date | null;
}
interface GroupChatPermissions {
    canInviteMembers: boolean;
    canRemoveMembers: boolean;
    canPinMessages: boolean;
    canEditSettings: boolean;
    canManageRoles: boolean;
    canDeleteMessages: boolean;
}
interface GroupChatInvite {
    id: string;
    conversationId: string;
    invitedUserId: string;
    invitedById: string;
    status: 'pending' | 'accepted' | 'declined' | 'expired';
    expiresAt: Date;
    createdAt: Date;
    respondedAt: Date | null;
}

interface Message {
    id: string;
    conversationId: string;
    authorId: string;
    content: string;
    seq: number;
    createdAt: Date;
    editedAt: Date | null;
    deletedAt: Date | null;
    parentMessageId: string | null;
    attachmentIds: string[];
    metadata: Record<string, unknown>;
}
interface MessageAttachment {
    id: string;
    messageId: string;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string | null;
    uploadedById: string;
    createdAt: Date;
}
interface MessageDraft {
    conversationId: string;
    userId: string;
    content: string;
    updatedAt: Date;
}
interface SavedMessage {
    id: string;
    userId: string;
    messageId: string;
    conversationId: string;
    savedAt: Date;
    note: string | null;
    tags: string[];
    metadata: Record<string, unknown>;
}
interface PinnedMessage {
    id: string;
    messageId: string;
    conversationId: string;
    pinnedById: string;
    pinnedAt: Date;
    reason: string | null;
    position: number;
}

interface Reaction {
    id: string;
    messageId: string;
    userId: string;
    emoji: string;
    createdAt: Date;
}
interface ReactionGroup {
    emoji: string;
    count: number;
    userIds: string[];
    hasReacted: boolean;
}

type NotificationType = 'message' | 'mention' | 'reaction' | 'dm_request' | 'channel_invite' | 'workspace_invite';
interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    body: string;
    avatarUrl: string | null;
    actionUrl: string | null;
    metadata: Record<string, unknown>;
    readAt: Date | null;
    createdAt: Date;
}
interface NotificationSettings {
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    desktopNotifications: boolean;
    notifyOnMentions: boolean;
    notifyOnDMs: boolean;
    notifyOnReactions: boolean;
    mutedConversationIds: string[];
    updatedAt: Date;
}

interface AuthPayload {
    token: string;
}
interface AuthSuccessPayload {
    userId: string;
    sessionId: string;
}
interface AuthErrorPayload {
    code: string;
    message: string;
}
interface MessageNewPayload {
    conversationId: string;
    messageId: string;
}
interface MessageCreatedPayload {
    message: {
        id: string;
        conversationId: string;
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
        content: string;
        seq: number;
        reactions: Reaction[];
        createdAt: Date;
        editedAt: Date | null;
    };
}
interface MessageEditedPayload {
    messageId: string;
}
interface MessageUpdatedPayload {
    message: {
        id: string;
        conversationId: string;
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
        content: string;
        seq: number;
        reactions: Array<{
            id: string;
            emoji: string;
            user: {
                id: string;
                username: string;
            };
            createdAt: Date;
        }>;
        createdAt: Date;
        editedAt: Date | null;
    };
}
interface MessageDeletedPayload {
    messageId: string;
    conversationId: string;
    seq: number;
}
interface TypingStartPayload {
    conversationId: string;
    userId: string;
    username: string;
}
interface TypingStopPayload {
    conversationId: string;
    userId: string;
}
interface ReactionAddedPayload {
    messageId: string;
    reaction: {
        id: string;
        emoji: string;
        user: {
            id: string;
            username: string;
        };
        createdAt: Date;
    };
}
interface ReactionRemovedPayload {
    messageId: string;
    reactionId: string;
}
interface ConversationJoinPayload {
    conversationId: string;
}
interface ConversationJoinedPayload {
    conversationId: string;
}
interface ConversationLeavePayload {
    conversationId: string;
}
interface ConversationLeftPayload {
    conversationId: string;
}
interface ConversationMarkReadPayload {
    conversationId: string;
    lastReadSeq: number;
}
interface ConversationUpdatedPayload {
    conversation: Conversation;
}
interface PresenceUpdatePayload {
    status: 'online' | 'away' | 'offline';
}
interface PresenceChangedPayload {
    userId: string;
    status: 'online' | 'away' | 'offline';
    timestamp: string;
}
interface NotificationNewPayload {
    id: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
    createdAt: Date;
}
interface NotificationReadPayload {
    notificationId: string;
}
interface ChannelCreatedPayload {
    channel: Channel;
}
interface ChannelUpdatedPayload {
    channel: Channel;
}
interface ChannelDeletedPayload {
    channelId: string;
    workspaceId: string;
}
interface ChannelMemberJoinedPayload {
    channelMember: ChannelMember;
}
interface ChannelMemberLeftPayload {
    channelId: string;
    userId: string;
}
interface WorkspaceUpdatedPayload {
    workspace: Workspace;
}
interface WorkspaceMemberJoinedPayload {
    workspaceMember: WorkspaceMember;
}
interface WorkspaceMemberLeftPayload {
    workspaceId: string;
    userId: string;
}
interface WorkspaceMemberRoleChangedPayload {
    workspaceMember: WorkspaceMember;
}
type SocketEventPayload = {
    event: 'auth';
    data: AuthPayload;
} | {
    event: 'auth:success';
    data: AuthSuccessPayload;
} | {
    event: 'auth:error';
    data: AuthErrorPayload;
} | {
    event: 'conversation:join';
    data: ConversationJoinPayload;
} | {
    event: 'conversation:joined';
    data: ConversationJoinedPayload;
} | {
    event: 'conversation:leave';
    data: ConversationLeavePayload;
} | {
    event: 'conversation:left';
    data: ConversationLeftPayload;
} | {
    event: 'conversation:mark_read';
    data: ConversationMarkReadPayload;
} | {
    event: 'conversation:updated';
    data: ConversationUpdatedPayload;
} | {
    event: 'message:new';
    data: MessageNewPayload;
} | {
    event: 'message:created';
    data: MessageCreatedPayload;
} | {
    event: 'message:edited';
    data: MessageEditedPayload;
} | {
    event: 'message:updated';
    data: MessageUpdatedPayload;
} | {
    event: 'message:deleted';
    data: MessageDeletedPayload;
} | {
    event: 'typing:start';
    data: TypingStartPayload;
} | {
    event: 'typing:stop';
    data: TypingStopPayload;
} | {
    event: 'reaction:added';
    data: ReactionAddedPayload;
} | {
    event: 'reaction:removed';
    data: ReactionRemovedPayload;
} | {
    event: 'presence:update';
    data: PresenceUpdatePayload;
} | {
    event: 'presence:changed';
    data: PresenceChangedPayload;
} | {
    event: 'notification:new';
    data: NotificationNewPayload;
} | {
    event: 'notification:read';
    data: NotificationReadPayload;
} | {
    event: 'channel:created';
    data: ChannelCreatedPayload;
} | {
    event: 'channel:updated';
    data: ChannelUpdatedPayload;
} | {
    event: 'channel:deleted';
    data: ChannelDeletedPayload;
} | {
    event: 'channel:member_joined';
    data: ChannelMemberJoinedPayload;
} | {
    event: 'channel:member_left';
    data: ChannelMemberLeftPayload;
} | {
    event: 'workspace:updated';
    data: WorkspaceUpdatedPayload;
} | {
    event: 'workspace:member_joined';
    data: WorkspaceMemberJoinedPayload;
} | {
    event: 'workspace:member_left';
    data: WorkspaceMemberLeftPayload;
} | {
    event: 'workspace:member_role_changed';
    data: WorkspaceMemberRoleChangedPayload;
};

interface ServerToClientEvents {
    'auth:success': (data: AuthSuccessPayload) => void;
    'auth:error': (data: AuthErrorPayload) => void;
    'conversation:joined': (data: ConversationJoinedPayload) => void;
    'conversation:left': (data: ConversationLeftPayload) => void;
    'conversation:updated': (data: ConversationUpdatedPayload) => void;
    'message:created': (data: MessageCreatedPayload) => void;
    'message:updated': (data: MessageUpdatedPayload) => void;
    'message:deleted': (data: MessageDeletedPayload) => void;
    'typing:start': (data: TypingStartPayload) => void;
    'typing:stop': (data: TypingStopPayload) => void;
    'reaction:added': (data: ReactionAddedPayload) => void;
    'reaction:removed': (data: ReactionRemovedPayload) => void;
    'presence:changed': (data: PresenceChangedPayload) => void;
    'notification:new': (data: NotificationNewPayload) => void;
    'channel:created': (data: ChannelCreatedPayload) => void;
    'channel:updated': (data: ChannelUpdatedPayload) => void;
    'channel:deleted': (data: ChannelDeletedPayload) => void;
    'channel:member_joined': (data: ChannelMemberJoinedPayload) => void;
    'channel:member_left': (data: ChannelMemberLeftPayload) => void;
    'workspace:updated': (data: WorkspaceUpdatedPayload) => void;
    'workspace:member_joined': (data: WorkspaceMemberJoinedPayload) => void;
    'workspace:member_left': (data: WorkspaceMemberLeftPayload) => void;
    'workspace:member_role_changed': (data: WorkspaceMemberRoleChangedPayload) => void;
    error: (data: {
        message: string;
    }) => void;
}
interface ClientToServerEvents {
    auth: (data: AuthPayload) => void;
    'conversation:join': (data: ConversationJoinPayload) => void;
    'conversation:leave': (data: ConversationLeavePayload) => void;
    'conversation:mark_read': (data: ConversationMarkReadPayload) => void;
    'message:new': (data: MessageNewPayload) => void;
    'message:edited': (data: MessageEditedPayload) => void;
    'message:deleted': (messageId: string) => void;
    'typing:start': (conversationId: string) => void;
    'typing:stop': (conversationId: string) => void;
    'reaction:added': (data: {
        messageId: string;
        reactionId: string;
    }) => void;
    'reaction:removed': (data: {
        messageId: string;
        reactionId: string;
        conversationId: string;
    }) => void;
    'presence:update': (data: PresenceUpdatePayload) => void;
    'notification:read': (data: NotificationReadPayload) => void;
}
type TypedServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
type TypedClientSocket = Socket$1<ServerToClientEvents, ClientToServerEvents>;
type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;

declare const ERROR_CODES: {
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly INVALID_TOKEN: "INVALID_TOKEN";
    readonly TOKEN_EXPIRED: "TOKEN_EXPIRED";
    readonly INVALID_CREDENTIALS: "INVALID_CREDENTIALS";
    readonly SESSION_EXPIRED: "SESSION_EXPIRED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS";
    readonly WORKSPACE_ACCESS_DENIED: "WORKSPACE_ACCESS_DENIED";
    readonly CHANNEL_ACCESS_DENIED: "CHANNEL_ACCESS_DENIED";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly INVALID_INPUT: "INVALID_INPUT";
    readonly MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD";
    readonly INVALID_FORMAT: "INVALID_FORMAT";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly USER_NOT_FOUND: "USER_NOT_FOUND";
    readonly CONVERSATION_NOT_FOUND: "CONVERSATION_NOT_FOUND";
    readonly MESSAGE_NOT_FOUND: "MESSAGE_NOT_FOUND";
    readonly WORKSPACE_NOT_FOUND: "WORKSPACE_NOT_FOUND";
    readonly CHANNEL_NOT_FOUND: "CHANNEL_NOT_FOUND";
    readonly ALREADY_EXISTS: "ALREADY_EXISTS";
    readonly DUPLICATE_ENTRY: "DUPLICATE_ENTRY";
    readonly USERNAME_TAKEN: "USERNAME_TAKEN";
    readonly WORKSPACE_SLUG_TAKEN: "WORKSPACE_SLUG_TAKEN";
    readonly CHANNEL_NAME_TAKEN: "CHANNEL_NAME_TAKEN";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS";
    readonly DM_REQUEST_LIMIT_EXCEEDED: "DM_REQUEST_LIMIT_EXCEEDED";
    readonly AI_ACTION_LIMIT_EXCEEDED: "AI_ACTION_LIMIT_EXCEEDED";
    readonly PLAN_LIMIT_EXCEEDED: "PLAN_LIMIT_EXCEEDED";
    readonly MESSAGE_TOO_LONG: "MESSAGE_TOO_LONG";
    readonly ATTACHMENT_TOO_LARGE: "ATTACHMENT_TOO_LARGE";
    readonly STORAGE_QUOTA_EXCEEDED: "STORAGE_QUOTA_EXCEEDED";
    readonly GROUP_LIMIT_EXCEEDED: "GROUP_LIMIT_EXCEEDED";
    readonly FEATURE_NOT_AVAILABLE: "FEATURE_NOT_AVAILABLE";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
    readonly DATABASE_ERROR: "DATABASE_ERROR";
    readonly EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR";
    readonly UPLOAD_FAILED: "UPLOAD_FAILED";
    readonly GITHUB_API_ERROR: "GITHUB_API_ERROR";
    readonly GITHUB_AUTH_FAILED: "GITHUB_AUTH_FAILED";
    readonly GITHUB_REPO_NOT_FOUND: "GITHUB_REPO_NOT_FOUND";
    readonly GITHUB_PR_NOT_FOUND: "GITHUB_PR_NOT_FOUND";
};
type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
interface APIError {
    code: ErrorCode;
    message: string;
    details?: Record<string, unknown>;
}

interface APIResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: APIError;
}
interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
interface PaginationParams {
    page?: number;
    pageSize?: number;
    cursor?: string;
}
interface CreateUserRequest {
    githubId: number;
    username: string;
    email?: string;
    avatar?: string;
    displayName?: string;
}
interface UpdateUserRequest {
    username?: string;
    email?: string;
    avatar?: string;
    displayName?: string;
    bio?: string;
}
interface UserResponse {
    user: User;
    entitlements: UserEntitlements;
}
interface UserListResponse extends PaginatedResponse<User> {
}
interface UpdatePresenceRequest {
    status: 'online' | 'away' | 'dnd' | 'invisible';
    customStatus?: string;
}
interface CreateWorkspaceRequest {
    githubOrgId: number;
    name: string;
    slug: string;
    avatar?: string;
}
interface UpdateWorkspaceRequest {
    name?: string;
    slug?: string;
    avatar?: string;
    plan?: 'free' | 'pro' | 'team';
}
interface WorkspaceResponse {
    workspace: Workspace;
    members: WorkspaceMember[];
    channels: Channel[];
}
interface WorkspaceListResponse extends PaginatedResponse<Workspace> {
}
interface AddWorkspaceMemberRequest {
    userId: string;
    role?: 'admin' | 'member';
}
interface UpdateWorkspaceMemberRequest {
    role: 'owner' | 'admin' | 'member';
}
interface CreateChannelRequest {
    name: string;
    topic?: string;
    isPrivate?: boolean;
}
interface UpdateChannelRequest {
    name?: string;
    topic?: string;
}
interface ChannelResponse {
    channel: Channel;
    members: ChannelMember[];
    unreadCount: number;
}
interface ChannelListResponse extends PaginatedResponse<Channel> {
}
interface AddChannelMemberRequest {
    userId: string;
    role?: 'admin' | 'member';
}
interface CreateDMConversationRequest {
    participantId: string;
}
interface CreateGroupConversationRequest {
    name: string;
    participantIds: string[];
    avatar?: string;
}
interface CreatePRRoomConversationRequest {
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}
interface UpdateConversationRequest {
    name?: string;
    avatar?: string;
}
interface ConversationResponse {
    conversation: Conversation;
    members: ConversationMember[];
    unreadCount: number;
    lastMessage?: Message;
}
interface ConversationListResponse extends PaginatedResponse<ConversationResponse> {
}
interface AddConversationMemberRequest {
    userId: string;
}
interface MarkConversationReadRequest {
    lastReadSeq: number;
}
interface MuteConversationRequest {
    mutedUntil: Date | null;
}
interface CreateMessageRequest {
    content: string;
    parentMessageId?: string;
    attachmentIds?: string[];
    metadata?: Record<string, unknown>;
}
interface UpdateMessageRequest {
    content: string;
}
interface MessageResponse {
    message: Message;
    reactions: ReactionGroup[];
    attachments: MessageAttachment[];
}
interface MessageListResponse extends PaginatedResponse<MessageResponse> {
    conversationId: string;
}
interface SearchMessagesRequest extends PaginationParams {
    query: string;
    conversationId?: string;
    workspaceId?: string;
    fromDate?: Date;
    toDate?: Date;
    authorId?: string;
}
interface SearchMessagesResponse extends PaginatedResponse<MessageResponse> {
}
interface SaveMessageDraftRequest {
    content: string;
}
interface MessageDraftResponse {
    draft: MessageDraft;
}
interface AddReactionRequest {
    emoji: string;
}
interface ReactionListResponse {
    reactions: ReactionGroup[];
}
interface CreateAttachmentRequest {
    filename: string;
    mimeType: string;
    size: number;
}
interface CreateAttachmentResponse {
    attachment: MessageAttachment;
    uploadUrl: string;
}
interface AttachmentListResponse extends PaginatedResponse<MessageAttachment> {
}
interface CreateSessionRequest {
    githubCode: string;
}
interface CreateSessionResponse {
    session: Session;
    user: User;
    entitlements: UserEntitlements;
}
interface SessionResponse {
    session: Session;
}
interface SessionListResponse extends PaginatedResponse<Session> {
}
interface WorkspaceStatsResponse {
    workspaceId: string;
    totalMembers: number;
    totalChannels: number;
    totalMessages: number;
    activeUsers: number;
    storageUsed: number;
}
interface UserStatsResponse {
    userId: string;
    totalMessages: number;
    totalReactions: number;
    conversationsCount: number;
    storageUsed: number;
}
interface NotificationResponse {
    id: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
    read: boolean;
    createdAt: Date;
}
interface NotificationListResponse extends PaginatedResponse<NotificationResponse> {
}
interface MarkNotificationReadRequest {
    notificationIds: string[];
}
interface GitHubRepoResponse {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    private: boolean;
    url: string;
}
interface GitHubPRResponse {
    number: number;
    title: string;
    state: 'open' | 'closed' | 'merged';
    url: string;
    createdAt: Date;
    author: {
        login: string;
        avatarUrl: string;
    };
}
interface GitHubRepoListResponse extends PaginatedResponse<GitHubRepoResponse> {
}
interface GitHubPRListResponse extends PaginatedResponse<GitHubPRResponse> {
}

interface EncryptedMessage {
    encrypted: string;
    iv: string;
}
interface EncryptedField {
    value: string;
}
interface TwoFactorSetup {
    secret: string;
    qrCodeDataUrl: string;
    backupCodes: string[];
    encryptedBackupCodes: string[];
}
interface EncryptionConfig {
    algorithm: 'aes-256-gcm';
    keyLength: 32;
    ivLength: 16;
    authTagLength: 16;
    saltLength: 32;
}
interface EncryptionStatus {
    isConfigured: boolean;
    algorithm?: string;
}

interface AdminUser {
    id: string;
    username: string;
    email: string | null;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    twoFactorEnabled: boolean;
    failedLoginAttempts: number;
    lockedUntil: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
interface AdminLoginRequest {
    username: string;
    password: string;
}
interface Admin2FARequest {
    loginToken: string;
    token: string;
}
interface AdminLoginResponse {
    requiresTwoFactor: boolean;
    loginToken?: string;
    session?: {
        id: string;
        token: string;
        expiresAt: Date;
    };
    user?: AdminUser;
}
interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}
interface Enable2FAResponse {
    secret: string;
    qrCodeDataUrl: string;
    backupCodes: string[];
}
interface Disable2FARequest {
    password: string;
}
interface RegenerateBackupCodesRequest {
    password: string;
}
interface RegenerateBackupCodesResponse {
    backupCodes: string[];
}
interface BanUserRequest {
    userId: string;
    reason?: string;
    duration?: number;
}
interface JailUserRequest {
    userId: string;
    duration: number;
    reason?: string;
}
interface WarnUserRequest {
    userId: string;
    reason?: string;
}
interface ModerationAction {
    id: string;
    type: 'ban' | 'jail' | 'warn' | 'unban' | 'unjail';
    userId: string;
    adminId: string;
    reason: string | null;
    duration: number | null;
    expiresAt: Date | null;
    createdAt: Date;
    revokedAt: Date | null;
    revokedById: string | null;
}
interface ModerationStatus {
    userId: string;
    isBanned: boolean;
    isJailed: boolean;
    banExpiresAt: Date | null;
    jailExpiresAt: Date | null;
    warningCount: number;
    lastWarningAt: Date | null;
}

declare enum OnboardingStep {
    TERMS_ACCEPTANCE = "terms_acceptance",
    PROFILE_SETUP = "profile_setup",
    WORKSPACE_CREATION = "workspace_creation",
    CHANNEL_CREATION = "channel_creation",
    INVITE_TEAM = "invite_team",
    COMPLETED = "completed"
}
interface OnboardingStatus {
    userId: string;
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
    termsAcceptedAt: Date | null;
    profileCompletedAt: Date | null;
    workspaceCreatedAt: Date | null;
    channelCreatedAt: Date | null;
    teamInvitedAt: Date | null;
    completedAt: Date | null;
    skippedSteps: OnboardingStep[];
    metadata: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}
interface TermsAcceptanceRequest {
    userId: string;
    termsVersion: string;
    privacyPolicyVersion: string;
    acceptedAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
}
interface OnboardingProgress {
    userId: string;
    totalSteps: number;
    completedSteps: number;
    currentStep: OnboardingStep;
    percentageComplete: number;
    isComplete: boolean;
}

declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    githubId: z.ZodNumber;
    username: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    avatar: z.ZodNullable<z.ZodString>;
    displayName: z.ZodNullable<z.ZodString>;
    bio: z.ZodNullable<z.ZodString>;
    plan: z.ZodEnum<["free", "pro", "team"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    githubId: number;
    username: string;
    email: string | null;
    avatar: string | null;
    displayName: string | null;
    bio: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    githubId: number;
    username: string;
    email: string | null;
    avatar: string | null;
    displayName: string | null;
    bio: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
}>;
declare const userPresenceSchema: z.ZodObject<{
    userId: z.ZodString;
    status: z.ZodEnum<["online", "away", "dnd", "invisible"]>;
    lastSeenAt: z.ZodDate;
    customStatus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "online" | "away" | "dnd" | "invisible";
    userId: string;
    lastSeenAt: Date;
    customStatus?: string | undefined;
}, {
    status: "online" | "away" | "dnd" | "invisible";
    userId: string;
    lastSeenAt: Date;
    customStatus?: string | undefined;
}>;
declare const usernameSchema: z.ZodString;

declare const workspaceSchema: z.ZodObject<{
    id: z.ZodString;
    githubOrgId: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    plan: z.ZodEnum<["free", "pro", "team"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
    githubOrgId: number;
    name: string;
    slug: string;
    ownerId: string;
}, {
    id: string;
    avatar: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
    githubOrgId: number;
    name: string;
    slug: string;
    ownerId: string;
}>;
declare const workspaceMemberSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member"]>;
    joinedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    userId: string;
    role: "owner" | "admin" | "member";
    joinedAt: Date;
}, {
    workspaceId: string;
    id: string;
    userId: string;
    role: "owner" | "admin" | "member";
    joinedAt: Date;
}>;

declare const channelSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    name: z.ZodString;
    topic: z.ZodNullable<z.ZodString>;
    isPrivate: z.ZodBoolean;
    createdById: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    archivedAt: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    topic: string | null;
    isPrivate: boolean;
    createdById: string;
    archivedAt: Date | null;
}, {
    workspaceId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    topic: string | null;
    isPrivate: boolean;
    createdById: string;
    archivedAt: Date | null;
}>;
declare const channelMemberSchema: z.ZodObject<{
    id: z.ZodString;
    channelId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<["admin", "member"]>;
    joinedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    role: "admin" | "member";
    joinedAt: Date;
    channelId: string;
}, {
    id: string;
    userId: string;
    role: "admin" | "member";
    joinedAt: Date;
    channelId: string;
}>;

declare const dmConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"dm">;
    participantIds: z.ZodTuple<[z.ZodString, z.ZodString], null>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}>;
declare const groupConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"group">;
    name: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}>;
declare const workspaceChannelConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"workspace_channel">;
    channelId: z.ZodString;
    workspaceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}>;
declare const prRoomConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"pr_room">;
    githubRepoId: z.ZodNumber;
    githubPRNumber: z.ZodNumber;
    prTitle: z.ZodString;
    prUrl: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}>;
declare const conversationSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"dm">;
    participantIds: z.ZodTuple<[z.ZodString, z.ZodString], null>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}>, z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"group">;
    name: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}>, z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"workspace_channel">;
    channelId: z.ZodString;
    workspaceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}>, z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"pr_room">;
    githubRepoId: z.ZodNumber;
    githubPRNumber: z.ZodNumber;
    prTitle: z.ZodString;
    prUrl: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}>]>;
declare const conversationMemberSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    userId: z.ZodString;
    joinedAt: z.ZodDate;
    lastReadSeq: z.ZodNumber;
    mutedUntil: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    userId: string;
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
}, {
    conversationId: string;
    id: string;
    userId: string;
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
}>;
declare const groupChatSettingsSchema: z.ZodObject<{
    conversationId: z.ZodString;
    allowMemberInvites: z.ZodBoolean;
    onlyAdminCanPost: z.ZodBoolean;
    onlyAdminCanPin: z.ZodBoolean;
    allowReactions: z.ZodBoolean;
    allowThreads: z.ZodBoolean;
    allowFileSharing: z.ZodBoolean;
    maxMembers: z.ZodNumber;
    description: z.ZodNullable<z.ZodString>;
    isPublic: z.ZodBoolean;
    joinLink: z.ZodNullable<z.ZodString>;
    joinLinkExpiresAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
    allowMemberInvites: boolean;
    onlyAdminCanPost: boolean;
    onlyAdminCanPin: boolean;
    allowReactions: boolean;
    allowThreads: boolean;
    allowFileSharing: boolean;
    maxMembers: number;
    description: string | null;
    isPublic: boolean;
    joinLink: string | null;
    joinLinkExpiresAt: Date | null;
}, {
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
    allowMemberInvites: boolean;
    onlyAdminCanPost: boolean;
    onlyAdminCanPin: boolean;
    allowReactions: boolean;
    allowThreads: boolean;
    allowFileSharing: boolean;
    maxMembers: number;
    description: string | null;
    isPublic: boolean;
    joinLink: string | null;
    joinLinkExpiresAt: Date | null;
}>;
declare const groupChatPermissionsSchema: z.ZodObject<{
    canInviteMembers: z.ZodBoolean;
    canRemoveMembers: z.ZodBoolean;
    canPinMessages: z.ZodBoolean;
    canEditSettings: z.ZodBoolean;
    canManageRoles: z.ZodBoolean;
    canDeleteMessages: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    canInviteMembers: boolean;
    canRemoveMembers: boolean;
    canPinMessages: boolean;
    canEditSettings: boolean;
    canManageRoles: boolean;
    canDeleteMessages: boolean;
}, {
    canInviteMembers: boolean;
    canRemoveMembers: boolean;
    canPinMessages: boolean;
    canEditSettings: boolean;
    canManageRoles: boolean;
    canDeleteMessages: boolean;
}>;
declare const groupChatMemberSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    userId: z.ZodString;
    joinedAt: z.ZodDate;
    lastReadSeq: z.ZodNumber;
    mutedUntil: z.ZodNullable<z.ZodDate>;
} & {
    role: z.ZodEnum<["owner", "admin", "member"]>;
    permissions: z.ZodObject<{
        canInviteMembers: z.ZodBoolean;
        canRemoveMembers: z.ZodBoolean;
        canPinMessages: z.ZodBoolean;
        canEditSettings: z.ZodBoolean;
        canManageRoles: z.ZodBoolean;
        canDeleteMessages: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        canInviteMembers: boolean;
        canRemoveMembers: boolean;
        canPinMessages: boolean;
        canEditSettings: boolean;
        canManageRoles: boolean;
        canDeleteMessages: boolean;
    }, {
        canInviteMembers: boolean;
        canRemoveMembers: boolean;
        canPinMessages: boolean;
        canEditSettings: boolean;
        canManageRoles: boolean;
        canDeleteMessages: boolean;
    }>;
    nickname: z.ZodNullable<z.ZodString>;
    invitedById: z.ZodNullable<z.ZodString>;
    leftAt: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    userId: string;
    role: "owner" | "admin" | "member";
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
    permissions: {
        canInviteMembers: boolean;
        canRemoveMembers: boolean;
        canPinMessages: boolean;
        canEditSettings: boolean;
        canManageRoles: boolean;
        canDeleteMessages: boolean;
    };
    nickname: string | null;
    invitedById: string | null;
    leftAt: Date | null;
}, {
    conversationId: string;
    id: string;
    userId: string;
    role: "owner" | "admin" | "member";
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
    permissions: {
        canInviteMembers: boolean;
        canRemoveMembers: boolean;
        canPinMessages: boolean;
        canEditSettings: boolean;
        canManageRoles: boolean;
        canDeleteMessages: boolean;
    };
    nickname: string | null;
    invitedById: string | null;
    leftAt: Date | null;
}>;
declare const groupChatInviteSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    invitedUserId: z.ZodString;
    invitedById: z.ZodString;
    status: z.ZodEnum<["pending", "accepted", "declined", "expired"]>;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
    respondedAt: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    status: "pending" | "accepted" | "declined" | "expired";
    createdAt: Date;
    invitedById: string;
    invitedUserId: string;
    expiresAt: Date;
    respondedAt: Date | null;
}, {
    conversationId: string;
    id: string;
    status: "pending" | "accepted" | "declined" | "expired";
    createdAt: Date;
    invitedById: string;
    invitedUserId: string;
    expiresAt: Date;
    respondedAt: Date | null;
}>;

declare const messageSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    authorId: z.ZodString;
    content: z.ZodString;
    seq: z.ZodNumber;
    createdAt: z.ZodDate;
    editedAt: z.ZodNullable<z.ZodDate>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    parentMessageId: z.ZodNullable<z.ZodString>;
    attachmentIds: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    authorId: string;
    id: string;
    createdAt: Date;
    content: string;
    seq: number;
    editedAt: Date | null;
    deletedAt: Date | null;
    parentMessageId: string | null;
    attachmentIds: string[];
    metadata: Record<string, unknown>;
}, {
    conversationId: string;
    authorId: string;
    id: string;
    createdAt: Date;
    content: string;
    seq: number;
    editedAt: Date | null;
    deletedAt: Date | null;
    parentMessageId: string | null;
    attachmentIds: string[];
    metadata: Record<string, unknown>;
}>;
declare const messageAttachmentSchema: z.ZodObject<{
    id: z.ZodString;
    messageId: z.ZodString;
    filename: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    url: z.ZodString;
    thumbnailUrl: z.ZodNullable<z.ZodString>;
    uploadedById: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    messageId: string;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string | null;
    uploadedById: string;
}, {
    id: string;
    createdAt: Date;
    messageId: string;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string | null;
    uploadedById: string;
}>;
declare const messageDraftSchema: z.ZodObject<{
    conversationId: z.ZodString;
    userId: z.ZodString;
    content: z.ZodString;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    updatedAt: Date;
    userId: string;
    content: string;
}, {
    conversationId: string;
    updatedAt: Date;
    userId: string;
    content: string;
}>;
declare const createMessageContentValidator: (plan: "free" | "pro" | "team") => z.ZodString;
declare const createCodeBlockValidator: (plan: "free" | "pro" | "team") => z.ZodString;
declare const savedMessageSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    messageId: z.ZodString;
    conversationId: z.ZodString;
    savedAt: z.ZodDate;
    note: z.ZodNullable<z.ZodString>;
    tags: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    userId: string;
    metadata: Record<string, unknown>;
    messageId: string;
    savedAt: Date;
    note: string | null;
    tags: string[];
}, {
    conversationId: string;
    id: string;
    userId: string;
    metadata: Record<string, unknown>;
    messageId: string;
    savedAt: Date;
    note: string | null;
    tags: string[];
}>;
declare const pinnedMessageSchema: z.ZodObject<{
    id: z.ZodString;
    messageId: z.ZodString;
    conversationId: z.ZodString;
    pinnedById: z.ZodString;
    pinnedAt: z.ZodDate;
    reason: z.ZodNullable<z.ZodString>;
    position: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    messageId: string;
    pinnedById: string;
    pinnedAt: Date;
    reason: string | null;
    position: number;
}, {
    conversationId: string;
    id: string;
    messageId: string;
    pinnedById: string;
    pinnedAt: Date;
    reason: string | null;
    position: number;
}>;

declare const reactionSchema: z.ZodObject<{
    id: z.ZodString;
    messageId: z.ZodString;
    userId: z.ZodString;
    emoji: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    userId: string;
    messageId: string;
    emoji: string;
}, {
    id: string;
    createdAt: Date;
    userId: string;
    messageId: string;
    emoji: string;
}>;
declare const reactionGroupSchema: z.ZodObject<{
    emoji: z.ZodString;
    count: z.ZodNumber;
    userIds: z.ZodArray<z.ZodString, "many">;
    hasReacted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    emoji: string;
    count: number;
    userIds: string[];
    hasReacted: boolean;
}, {
    emoji: string;
    count: number;
    userIds: string[];
    hasReacted: boolean;
}>;

declare const notificationSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["message", "mention", "reaction", "dm_request", "channel_invite", "workspace_invite"]>;
    title: z.ZodString;
    body: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodString>;
    actionUrl: z.ZodNullable<z.ZodString>;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    readAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "message" | "mention" | "reaction" | "dm_request" | "channel_invite" | "workspace_invite";
    createdAt: Date;
    userId: string;
    metadata: Record<string, unknown>;
    title: string;
    body: string;
    avatarUrl: string | null;
    actionUrl: string | null;
    readAt: Date | null;
}, {
    id: string;
    type: "message" | "mention" | "reaction" | "dm_request" | "channel_invite" | "workspace_invite";
    createdAt: Date;
    userId: string;
    metadata: Record<string, unknown>;
    title: string;
    body: string;
    avatarUrl: string | null;
    actionUrl: string | null;
    readAt: Date | null;
}>;
declare const notificationSettingsSchema: z.ZodObject<{
    userId: z.ZodString;
    emailNotifications: z.ZodBoolean;
    pushNotifications: z.ZodBoolean;
    desktopNotifications: z.ZodBoolean;
    notifyOnMentions: z.ZodBoolean;
    notifyOnDMs: z.ZodBoolean;
    notifyOnReactions: z.ZodBoolean;
    mutedConversationIds: z.ZodArray<z.ZodString, "many">;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    updatedAt: Date;
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    desktopNotifications: boolean;
    notifyOnMentions: boolean;
    notifyOnDMs: boolean;
    notifyOnReactions: boolean;
    mutedConversationIds: string[];
}, {
    updatedAt: Date;
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    desktopNotifications: boolean;
    notifyOnMentions: boolean;
    notifyOnDMs: boolean;
    notifyOnReactions: boolean;
    mutedConversationIds: string[];
}>;

declare const OnboardingStepSchema: z.ZodEnum<["terms_acceptance", "profile_setup", "workspace_creation", "channel_creation", "invite_team", "completed"]>;
declare const OnboardingStatusSchema: z.ZodObject<{
    userId: z.ZodString;
    currentStep: z.ZodEnum<["terms_acceptance", "profile_setup", "workspace_creation", "channel_creation", "invite_team", "completed"]>;
    completedSteps: z.ZodArray<z.ZodEnum<["terms_acceptance", "profile_setup", "workspace_creation", "channel_creation", "invite_team", "completed"]>, "many">;
    termsAcceptedAt: z.ZodNullable<z.ZodDate>;
    profileCompletedAt: z.ZodNullable<z.ZodDate>;
    workspaceCreatedAt: z.ZodNullable<z.ZodDate>;
    channelCreatedAt: z.ZodNullable<z.ZodDate>;
    teamInvitedAt: z.ZodNullable<z.ZodDate>;
    completedAt: z.ZodNullable<z.ZodDate>;
    skippedSteps: z.ZodArray<z.ZodEnum<["terms_acceptance", "profile_setup", "workspace_creation", "channel_creation", "invite_team", "completed"]>, "many">;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    metadata: Record<string, unknown>;
    currentStep: "terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed";
    completedSteps: ("terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed")[];
    termsAcceptedAt: Date | null;
    profileCompletedAt: Date | null;
    workspaceCreatedAt: Date | null;
    channelCreatedAt: Date | null;
    teamInvitedAt: Date | null;
    completedAt: Date | null;
    skippedSteps: ("terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed")[];
}, {
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    metadata: Record<string, unknown>;
    currentStep: "terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed";
    completedSteps: ("terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed")[];
    termsAcceptedAt: Date | null;
    profileCompletedAt: Date | null;
    workspaceCreatedAt: Date | null;
    channelCreatedAt: Date | null;
    teamInvitedAt: Date | null;
    completedAt: Date | null;
    skippedSteps: ("terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed")[];
}>;
declare const TermsAcceptanceRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    termsVersion: z.ZodString;
    privacyPolicyVersion: z.ZodString;
    acceptedAt: z.ZodDate;
    ipAddress: z.ZodNullable<z.ZodString>;
    userAgent: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    termsVersion: string;
    privacyPolicyVersion: string;
    acceptedAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
}, {
    userId: string;
    termsVersion: string;
    privacyPolicyVersion: string;
    acceptedAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
}>;
declare const OnboardingProgressSchema: z.ZodObject<{
    userId: z.ZodString;
    totalSteps: z.ZodNumber;
    completedSteps: z.ZodNumber;
    currentStep: z.ZodEnum<["terms_acceptance", "profile_setup", "workspace_creation", "channel_creation", "invite_team", "completed"]>;
    percentageComplete: z.ZodNumber;
    isComplete: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    userId: string;
    currentStep: "terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed";
    completedSteps: number;
    totalSteps: number;
    percentageComplete: number;
    isComplete: boolean;
}, {
    userId: string;
    currentStep: "terms_acceptance" | "profile_setup" | "workspace_creation" | "channel_creation" | "invite_team" | "completed";
    completedSteps: number;
    totalSteps: number;
    percentageComplete: number;
    isComplete: boolean;
}>;

/**
 * API Response Contracts
 *
 * These Zod schemas define the EXACT shape of API responses.
 * Both frontend and backend MUST conform to these contracts.
 *
 * RULE: When a backend endpoint changes, update the schema here FIRST.
 * RULE: Frontend should validate responses against these schemas in dev mode.
 */

declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    githubId: z.ZodOptional<z.ZodNumber>;
    githubUsername: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodString>;
    displayName: z.ZodNullable<z.ZodString>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
    isAdmin: z.ZodOptional<z.ZodBoolean>;
    onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    displayName: string | null;
    createdAt: string;
    avatarUrl: string | null;
    githubUsername: string;
    githubId?: number | undefined;
    email?: string | null | undefined;
    plan?: "free" | "pro" | undefined;
    updatedAt?: string | undefined;
    isAdmin?: boolean | undefined;
    onboardingCompleted?: boolean | undefined;
}, {
    id: string;
    displayName: string | null;
    createdAt: string;
    avatarUrl: string | null;
    githubUsername: string;
    githubId?: number | undefined;
    email?: string | null | undefined;
    plan?: "free" | "pro" | undefined;
    updatedAt?: string | undefined;
    isAdmin?: boolean | undefined;
    onboardingCompleted?: boolean | undefined;
}>;
declare const WorkspaceSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    githubOrgId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    githubOrgLogin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    name: string;
    slug: string;
    updatedAt?: string | undefined;
    githubOrgId?: number | null | undefined;
    githubOrgLogin?: string | null | undefined;
}, {
    id: string;
    createdAt: string;
    name: string;
    slug: string;
    updatedAt?: string | undefined;
    githubOrgId?: number | null | undefined;
    githubOrgLogin?: string | null | undefined;
}>;
declare const ConversationSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["channel", "dm", "group", "DM", "GROUP", "CHANNEL"]>;
    name: z.ZodNullable<z.ZodString>;
    topic: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isPrivate: z.ZodOptional<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
    lastMessageAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    unreadCount: z.ZodOptional<z.ZodNumber>;
    members: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
    createdAt: string;
    name: string | null;
    workspaceId?: string | undefined;
    updatedAt?: string | undefined;
    topic?: string | null | undefined;
    isPrivate?: boolean | undefined;
    lastMessageAt?: string | null | undefined;
    unreadCount?: number | undefined;
    members?: any[] | undefined;
}, {
    id: string;
    type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
    createdAt: string;
    name: string | null;
    workspaceId?: string | undefined;
    updatedAt?: string | undefined;
    topic?: string | null | undefined;
    isPrivate?: boolean | undefined;
    lastMessageAt?: string | null | undefined;
    unreadCount?: number | undefined;
    members?: any[] | undefined;
}>;
declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    userId: z.ZodString;
    content: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    user: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        githubId: z.ZodOptional<z.ZodNumber>;
        githubUsername: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
        displayName: z.ZodNullable<z.ZodString>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
        isAdmin: z.ZodOptional<z.ZodBoolean>;
        onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
    editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    threadCount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    createdAt: string;
    userId: string;
    content: string;
    type?: "code" | "text" | "system" | undefined;
    updatedAt?: string | undefined;
    editedAt?: string | null | undefined;
    metadata?: Record<string, any> | null | undefined;
    user?: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    } | undefined;
    reactions?: any[] | undefined;
    threadCount?: number | undefined;
}, {
    conversationId: string;
    id: string;
    createdAt: string;
    userId: string;
    content: string;
    type?: "code" | "text" | "system" | undefined;
    updatedAt?: string | undefined;
    editedAt?: string | null | undefined;
    metadata?: Record<string, any> | null | undefined;
    user?: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    } | undefined;
    reactions?: any[] | undefined;
    threadCount?: number | undefined;
}>;
declare const StatusSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    content: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        githubId: z.ZodOptional<z.ZodNumber>;
        githubUsername: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
        displayName: z.ZodNullable<z.ZodString>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
        isAdmin: z.ZodOptional<z.ZodBoolean>;
        onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }>;
    likesCount: z.ZodNumber;
    commentsCount: z.ZodNumber;
    isLiked: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    userId: string;
    content: string;
    user: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    };
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    updatedAt?: string | undefined;
}, {
    id: string;
    createdAt: string;
    userId: string;
    content: string;
    user: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    };
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    updatedAt?: string | undefined;
}>;
declare const GroupSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    members: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        githubId: z.ZodOptional<z.ZodNumber>;
        githubUsername: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
        displayName: z.ZodNullable<z.ZodString>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
        isAdmin: z.ZodOptional<z.ZodBoolean>;
        onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }>, "many">>;
    lastMessage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        conversationId: z.ZodString;
        userId: z.ZodString;
        content: z.ZodString;
        type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        user: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
        editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        threadCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }, {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }>>>;
    lastReadSeq: z.ZodOptional<z.ZodNumber>;
    unreadCount: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    name: string;
    updatedAt?: string | undefined;
    lastReadSeq?: number | undefined;
    avatarUrl?: string | null | undefined;
    unreadCount?: number | undefined;
    members?: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }[] | undefined;
    lastMessage?: {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    } | null | undefined;
}, {
    id: string;
    createdAt: string;
    name: string;
    updatedAt?: string | undefined;
    lastReadSeq?: number | undefined;
    avatarUrl?: string | null | undefined;
    unreadCount?: number | undefined;
    members?: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }[] | undefined;
    lastMessage?: {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    } | null | undefined;
}>;
/**
 * GET /workspaces
 * Backend returns: { workspaces: Workspace[] }
 */
declare const GetWorkspacesResponseSchema: z.ZodObject<{
    workspaces: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
        githubOrgId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        githubOrgLogin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }, {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    workspaces: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }[];
}, {
    workspaces: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }[];
}>;
/**
 * GET /workspaces/:id
 * Backend returns: { workspace: Workspace }
 */
declare const GetWorkspaceResponseSchema: z.ZodObject<{
    workspace: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
        githubOrgId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        githubOrgLogin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }, {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    workspace: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    };
}, {
    workspace: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    };
}>;
/**
 * POST /workspaces
 * Backend returns: { workspace: Workspace }
 */
declare const CreateWorkspaceResponseSchema: z.ZodObject<{
    workspace: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
        githubOrgId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        githubOrgLogin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }, {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    workspace: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    };
}, {
    workspace: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        updatedAt?: string | undefined;
        githubOrgId?: number | null | undefined;
        githubOrgLogin?: string | null | undefined;
    };
}>;
/**
 * GET /conversations
 * Backend returns: { conversations: Conversation[] }
 */
declare const GetConversationsResponseSchema: z.ZodObject<{
    conversations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<["channel", "dm", "group", "DM", "GROUP", "CHANNEL"]>;
        name: z.ZodNullable<z.ZodString>;
        topic: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isPrivate: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
        lastMessageAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unreadCount: z.ZodOptional<z.ZodNumber>;
        members: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }, {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    conversations: {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }[];
}, {
    conversations: {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }[];
}>;
/**
 * GET /conversations/:id
 * Backend returns: { conversation: Conversation }
 */
declare const GetConversationResponseSchema: z.ZodObject<{
    conversation: z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<["channel", "dm", "group", "DM", "GROUP", "CHANNEL"]>;
        name: z.ZodNullable<z.ZodString>;
        topic: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isPrivate: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
        lastMessageAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unreadCount: z.ZodOptional<z.ZodNumber>;
        members: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }, {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    conversation: {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    };
}, {
    conversation: {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    };
}>;
/**
 * POST /conversations
 * Backend returns: { id: string, conversation: Conversation }
 */
declare const CreateConversationResponseSchema: z.ZodObject<{
    id: z.ZodString;
    conversation: z.ZodObject<{
        id: z.ZodString;
        workspaceId: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<["channel", "dm", "group", "DM", "GROUP", "CHANNEL"]>;
        name: z.ZodNullable<z.ZodString>;
        topic: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isPrivate: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
        lastMessageAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unreadCount: z.ZodOptional<z.ZodNumber>;
        members: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }, {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    conversation: {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    };
}, {
    id: string;
    conversation: {
        id: string;
        type: "dm" | "group" | "channel" | "DM" | "GROUP" | "CHANNEL";
        createdAt: string;
        name: string | null;
        workspaceId?: string | undefined;
        updatedAt?: string | undefined;
        topic?: string | null | undefined;
        isPrivate?: boolean | undefined;
        lastMessageAt?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: any[] | undefined;
    };
}>;
/**
 * GET /conversations/:id/messages
 * Backend returns: { messages: Message[], hasMore: boolean }
 */
declare const GetMessagesResponseSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        conversationId: z.ZodString;
        userId: z.ZodString;
        content: z.ZodString;
        type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        user: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
        editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        threadCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }, {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }>, "many">;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    messages: {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }[];
    hasMore: boolean;
}, {
    messages: {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }[];
    hasMore: boolean;
}>;
/**
 * POST /conversations/:id/messages
 * Backend returns: { message: Message }
 */
declare const SendMessageResponseSchema: z.ZodObject<{
    message: z.ZodObject<{
        id: z.ZodString;
        conversationId: z.ZodString;
        userId: z.ZodString;
        content: z.ZodString;
        type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        user: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
        editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        threadCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }, {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    };
}, {
    message: {
        conversationId: string;
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        type?: "code" | "text" | "system" | undefined;
        updatedAt?: string | undefined;
        editedAt?: string | null | undefined;
        metadata?: Record<string, any> | null | undefined;
        user?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        } | undefined;
        reactions?: any[] | undefined;
        threadCount?: number | undefined;
    };
}>;
/**
 * GET /users?q=query
 * Backend returns: { users: User[] }
 */
declare const SearchUsersResponseSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        githubId: z.ZodOptional<z.ZodNumber>;
        githubUsername: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
        displayName: z.ZodNullable<z.ZodString>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
        isAdmin: z.ZodOptional<z.ZodBoolean>;
        onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }, {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    users: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }[];
}, {
    users: {
        id: string;
        displayName: string | null;
        createdAt: string;
        avatarUrl: string | null;
        githubUsername: string;
        githubId?: number | undefined;
        email?: string | null | undefined;
        plan?: "free" | "pro" | undefined;
        updatedAt?: string | undefined;
        isAdmin?: boolean | undefined;
        onboardingCompleted?: boolean | undefined;
    }[];
}>;
/**
 * GET /groups
 * Backend returns: { groups: Group[] }
 */
declare const GetGroupsResponseSchema: z.ZodObject<{
    groups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        members: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>, "many">>;
        lastMessage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            conversationId: z.ZodString;
            userId: z.ZodString;
            content: z.ZodString;
            type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
            metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            user: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                githubId: z.ZodOptional<z.ZodNumber>;
                githubUsername: z.ZodString;
                avatarUrl: z.ZodNullable<z.ZodString>;
                displayName: z.ZodNullable<z.ZodString>;
                email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
                isAdmin: z.ZodOptional<z.ZodBoolean>;
                onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
                createdAt: z.ZodString;
                updatedAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            }, {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            }>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
            editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
            threadCount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        }, {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        }>>>;
        lastReadSeq: z.ZodOptional<z.ZodNumber>;
        unreadCount: z.ZodOptional<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }, {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    groups: {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }[];
}, {
    groups: {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }[];
}>;
/**
 * GET /groups/:id
 * Backend returns: { group: Group }
 */
declare const GetGroupResponseSchema: z.ZodObject<{
    group: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        members: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>, "many">>;
        lastMessage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            conversationId: z.ZodString;
            userId: z.ZodString;
            content: z.ZodString;
            type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
            metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            user: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                githubId: z.ZodOptional<z.ZodNumber>;
                githubUsername: z.ZodString;
                avatarUrl: z.ZodNullable<z.ZodString>;
                displayName: z.ZodNullable<z.ZodString>;
                email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
                isAdmin: z.ZodOptional<z.ZodBoolean>;
                onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
                createdAt: z.ZodString;
                updatedAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            }, {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            }>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
            editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
            threadCount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        }, {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        }>>>;
        lastReadSeq: z.ZodOptional<z.ZodNumber>;
        unreadCount: z.ZodOptional<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }, {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    group: {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    };
}, {
    group: {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    };
}>;
/**
 * POST /groups
 * Backend returns: { group: Group }
 */
declare const CreateGroupResponseSchema: z.ZodObject<{
    group: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        avatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        members: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>, "many">>;
        lastMessage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            conversationId: z.ZodString;
            userId: z.ZodString;
            content: z.ZodString;
            type: z.ZodOptional<z.ZodEnum<["text", "code", "system"]>>;
            metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            user: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                githubId: z.ZodOptional<z.ZodNumber>;
                githubUsername: z.ZodString;
                avatarUrl: z.ZodNullable<z.ZodString>;
                displayName: z.ZodNullable<z.ZodString>;
                email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
                isAdmin: z.ZodOptional<z.ZodBoolean>;
                onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
                createdAt: z.ZodString;
                updatedAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            }, {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            }>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
            editedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            reactions: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
            threadCount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        }, {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        }>>>;
        lastReadSeq: z.ZodOptional<z.ZodNumber>;
        unreadCount: z.ZodOptional<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }, {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    group: {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    };
}, {
    group: {
        id: string;
        createdAt: string;
        name: string;
        updatedAt?: string | undefined;
        lastReadSeq?: number | undefined;
        avatarUrl?: string | null | undefined;
        unreadCount?: number | undefined;
        members?: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }[] | undefined;
        lastMessage?: {
            conversationId: string;
            id: string;
            createdAt: string;
            userId: string;
            content: string;
            type?: "code" | "text" | "system" | undefined;
            updatedAt?: string | undefined;
            editedAt?: string | null | undefined;
            metadata?: Record<string, any> | null | undefined;
            user?: {
                id: string;
                displayName: string | null;
                createdAt: string;
                avatarUrl: string | null;
                githubUsername: string;
                githubId?: number | undefined;
                email?: string | null | undefined;
                plan?: "free" | "pro" | undefined;
                updatedAt?: string | undefined;
                isAdmin?: boolean | undefined;
                onboardingCompleted?: boolean | undefined;
            } | undefined;
            reactions?: any[] | undefined;
            threadCount?: number | undefined;
        } | null | undefined;
    };
}>;
/**
 * GET /saved
 * Backend returns: { savedMessages: SavedMessage[] }
 */
declare const GetSavedMessagesResponseSchema: z.ZodObject<{
    savedMessages: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    savedMessages: any[];
}, {
    savedMessages: any[];
}>;
/**
 * GET /statuses
 * Backend returns: { statuses: Status[], nextCursor?: string, hasMore: boolean }
 */
declare const GetStatusFeedResponseSchema: z.ZodObject<{
    statuses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        content: z.ZodString;
        user: z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>;
        likesCount: z.ZodNumber;
        commentsCount: z.ZodNumber;
        isLiked: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    }>, "many">;
    nextCursor: z.ZodOptional<z.ZodString>;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    hasMore: boolean;
    statuses: {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    }[];
    nextCursor?: string | undefined;
}, {
    hasMore: boolean;
    statuses: {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    }[];
    nextCursor?: string | undefined;
}>;
/**
 * POST /statuses
 * Backend returns: { status: Status }
 */
declare const CreateStatusResponseSchema: z.ZodObject<{
    status: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        content: z.ZodString;
        user: z.ZodObject<{
            id: z.ZodString;
            githubId: z.ZodOptional<z.ZodNumber>;
            githubUsername: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
            displayName: z.ZodNullable<z.ZodString>;
            email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            plan: z.ZodOptional<z.ZodEnum<["free", "pro"]>>;
            isAdmin: z.ZodOptional<z.ZodBoolean>;
            onboardingCompleted: z.ZodOptional<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }, {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        }>;
        likesCount: z.ZodNumber;
        commentsCount: z.ZodNumber;
        isLiked: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    status: {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    };
}, {
    status: {
        id: string;
        createdAt: string;
        userId: string;
        content: string;
        user: {
            id: string;
            displayName: string | null;
            createdAt: string;
            avatarUrl: string | null;
            githubUsername: string;
            githubId?: number | undefined;
            email?: string | null | undefined;
            plan?: "free" | "pro" | undefined;
            updatedAt?: string | undefined;
            isAdmin?: boolean | undefined;
            onboardingCompleted?: boolean | undefined;
        };
        likesCount: number;
        commentsCount: number;
        isLiked: boolean;
        updatedAt?: string | undefined;
    };
}>;
/**
 * GET /statuses/:id/comments
 * Backend returns: { comments: Comment[], total: number }
 */
declare const GetStatusCommentsResponseSchema: z.ZodObject<{
    comments: z.ZodArray<z.ZodAny, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    comments: any[];
    total: number;
}, {
    comments: any[];
    total: number;
}>;
/**
 * POST /statuses/:id/comments
 * Backend returns: { comment: Comment }
 */
declare const CreateStatusCommentResponseSchema: z.ZodObject<{
    comment: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    comment?: any;
}, {
    comment?: any;
}>;
type ApiEndpoint = 'GET /workspaces' | 'GET /workspaces/:id' | 'POST /workspaces' | 'GET /conversations' | 'GET /conversations/:id' | 'POST /conversations' | 'GET /conversations/:id/messages' | 'POST /conversations/:id/messages' | 'GET /users' | 'GET /groups' | 'GET /groups/:id' | 'POST /groups' | 'GET /saved' | 'GET /statuses' | 'POST /statuses' | 'GET /statuses/:id/comments' | 'POST /statuses/:id/comments';
declare const ResponseSchemas: Record<ApiEndpoint, z.ZodSchema>;
/**
 * Validates an API response against the expected schema.
 * Use in development to catch frontend/backend contract mismatches.
 *
 * @param endpoint - The API endpoint being called
 * @param response - The response data from the API
 * @returns The validated response (throws in dev if invalid)
 */
declare function validateResponse<T>(endpoint: ApiEndpoint, response: unknown): T;
/**
 * Creates a wrapper function that validates responses in development.
 * Production: passthrough (no validation overhead)
 * Development: validates and logs/throws on mismatch
 */
declare function withValidation<T>(endpoint: ApiEndpoint, fetcher: () => Promise<T>): () => Promise<T>;

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

declare const SOCKET_EVENTS: {
    readonly CONNECT: "connect";
    readonly DISCONNECT: "disconnect";
    readonly ERROR: "error";
    readonly AUTH: "auth";
    readonly AUTH_SUCCESS: "auth:success";
    readonly AUTH_ERROR: "auth:error";
    readonly CONVERSATION_JOIN: "conversation:join";
    readonly CONVERSATION_JOINED: "conversation:joined";
    readonly CONVERSATION_LEAVE: "conversation:leave";
    readonly CONVERSATION_LEFT: "conversation:left";
    readonly CONVERSATION_MARK_READ: "conversation:mark_read";
    readonly CONVERSATION_UPDATED: "conversation:updated";
    readonly MESSAGE_NEW: "message:new";
    readonly MESSAGE_CREATED: "message:created";
    readonly MESSAGE_EDITED: "message:edited";
    readonly MESSAGE_UPDATED: "message:updated";
    readonly MESSAGE_DELETED: "message:deleted";
    readonly TYPING_START: "typing:start";
    readonly TYPING_STOP: "typing:stop";
    readonly REACTION_ADDED: "reaction:added";
    readonly REACTION_REMOVED: "reaction:removed";
    readonly PRESENCE_UPDATE: "presence:update";
    readonly PRESENCE_CHANGED: "presence:changed";
    readonly NOTIFICATION_NEW: "notification:new";
    readonly NOTIFICATION_READ: "notification:read";
    readonly CHANNEL_CREATED: "channel:created";
    readonly CHANNEL_UPDATED: "channel:updated";
    readonly CHANNEL_DELETED: "channel:deleted";
    readonly CHANNEL_MEMBER_JOINED: "channel:member_joined";
    readonly CHANNEL_MEMBER_LEFT: "channel:member_left";
    readonly WORKSPACE_UPDATED: "workspace:updated";
    readonly WORKSPACE_MEMBER_JOINED: "workspace:member_joined";
    readonly WORKSPACE_MEMBER_LEFT: "workspace:member_left";
    readonly WORKSPACE_MEMBER_ROLE_CHANGED: "workspace:member_role_changed";
};
type SocketEvent = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A lowercase, hyphenated slug
 */
declare function slugify(text: string): string;

/**
 * Format a date as a relative time string (e.g., "2 hours ago", "just now")
 * @param date - The date to format
 * @returns A human-readable relative time string
 */
declare function formatRelativeTime(date: Date): string;
/**
 * Format a date as a short date string (e.g., "Jan 15", "Dec 25, 2023")
 * @param date - The date to format
 * @returns A short date string
 */
declare function formatShortDate(date: Date): string;
/**
 * Format a date as a full date-time string (e.g., "Jan 15, 2024 at 3:45 PM")
 * @param date - The date to format
 * @returns A full date-time string
 */
declare function formatFullDateTime(date: Date): string;
/**
 * Format a timestamp for display in a message list
 * Shows time for today, date for this year, date+year for older
 * @param date - The date to format
 * @returns A formatted timestamp string
 */
declare function formatMessageTimestamp(date: Date): string;

/**
 * Truncate text to a maximum length, adding ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns The truncated text
 */
declare function truncate(text: string, maxLength: number, ellipsis?: string): string;
/**
 * Truncate text at word boundaries to avoid cutting words
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns The truncated text
 */
declare function truncateWords(text: string, maxLength: number, ellipsis?: string): string;
/**
 * Extract mentioned usernames from a message (e.g., @username)
 * @param text - The message text
 * @returns Array of mentioned usernames (without @)
 */
declare function extractMentions(text: string): string[];
/**
 * Escape HTML special characters to prevent XSS
 * @param text - The text to escape
 * @returns Escaped text safe for HTML
 */
declare function escapeHTML(text: string): string;
/**
 * Count the number of words in a text
 * @param text - The text to count words in
 * @returns The word count
 */
declare function countWords(text: string): number;

export { type APIError, type APIResponse, type AddChannelMemberRequest, type AddConversationMemberRequest, type AddReactionRequest, type AddWorkspaceMemberRequest, type Admin2FARequest, type AdminLoginRequest, type AdminLoginResponse, type AdminUser, type ApiEndpoint, type AttachmentListResponse, type AuthErrorPayload, type AuthPayload, type AuthSuccessPayload, type BanUserRequest, type BaseConversation, type ChangePasswordRequest, type Channel, type ChannelCreatedPayload, type ChannelDeletedPayload, type ChannelListResponse, type ChannelMember, type ChannelMemberJoinedPayload, type ChannelMemberLeftPayload, type ChannelResponse, type ChannelUpdatedPayload, type ClientToServerEvents, type Conversation, type ConversationJoinPayload, type ConversationJoinedPayload, type ConversationLeavePayload, type ConversationLeftPayload, type ConversationListResponse, type ConversationMarkReadPayload, type ConversationMember, type ConversationResponse, ConversationSchema, type ConversationType, type ConversationUpdatedPayload, type CreateAttachmentRequest, type CreateAttachmentResponse, type CreateChannelRequest, CreateConversationResponseSchema, type CreateDMConversationRequest, type CreateGroupConversationRequest, CreateGroupResponseSchema, type CreateMessageRequest, type CreatePRRoomConversationRequest, type CreateSessionRequest, type CreateSessionResponse, CreateStatusCommentResponseSchema, CreateStatusResponseSchema, type CreateUserRequest, type CreateWorkspaceRequest, CreateWorkspaceResponseSchema, type DMConversation, type Disable2FARequest, ERROR_CODES, type Enable2FAResponse, type EncryptedField, type EncryptedMessage, type EncryptionConfig, type EncryptionStatus, type ErrorCode, GetConversationResponseSchema, GetConversationsResponseSchema, GetGroupResponseSchema, GetGroupsResponseSchema, GetMessagesResponseSchema, GetSavedMessagesResponseSchema, GetStatusCommentsResponseSchema, GetStatusFeedResponseSchema, GetWorkspaceResponseSchema, GetWorkspacesResponseSchema, type GitHubPRListResponse, type GitHubPRResponse, type GitHubRepoListResponse, type GitHubRepoResponse, type GroupChatInvite, type GroupChatMember, type GroupChatPermissions, type GroupChatSettings, type GroupConversation, GroupSchema, type JailUserRequest, type MarkConversationReadRequest, type MarkNotificationReadRequest, type Message, type MessageAttachment, type MessageCreatedPayload, type MessageDeletedPayload, type MessageDraft, type MessageDraftResponse, type MessageEditedPayload, type MessageListResponse, type MessageNewPayload, type MessageResponse, MessageSchema, type MessageUpdatedPayload, type ModerationAction, type ModerationStatus, type MuteConversationRequest, type Notification, type NotificationListResponse, type NotificationNewPayload, type NotificationReadPayload, type NotificationResponse, type NotificationSettings, type NotificationType, type OnboardingProgress, OnboardingProgressSchema, type OnboardingStatus, OnboardingStatusSchema, OnboardingStep, OnboardingStepSchema, PLAN_LIMITS, type PRRoomConversation, type PaginatedResponse, type PaginationParams, type PinnedMessage, type PlanType, type PresenceChangedPayload, type PresenceUpdatePayload, type Reaction, type ReactionAddedPayload, type ReactionGroup, type ReactionListResponse, type ReactionRemovedPayload, type RegenerateBackupCodesRequest, type RegenerateBackupCodesResponse, ResponseSchemas, SOCKET_EVENTS, type SaveMessageDraftRequest, type SavedMessage, type SearchMessagesRequest, type SearchMessagesResponse, SearchUsersResponseSchema, SendMessageResponseSchema, type ServerToClientEvents, type Session, type SessionListResponse, type SessionResponse, type SocketEvent, type SocketEventPayload, StatusSchema, type TermsAcceptanceRequest, TermsAcceptanceRequestSchema, type TwoFactorSetup, type TypedClientSocket, type TypedServer, type TypedServerSocket, type TypingStartPayload, type TypingStopPayload, type UpdateChannelRequest, type UpdateConversationRequest, type UpdateMessageRequest, type UpdatePresenceRequest, type UpdateUserRequest, type UpdateWorkspaceMemberRequest, type UpdateWorkspaceRequest, type User, type UserEntitlements, type UserListResponse, type UserPresence, type UserResponse, UserSchema, type UserStatsResponse, type WarnUserRequest, type Workspace, type WorkspaceChannelConversation, type WorkspaceListResponse, type WorkspaceMember, type WorkspaceMemberJoinedPayload, type WorkspaceMemberLeftPayload, type WorkspaceMemberRoleChangedPayload, type WorkspaceResponse, WorkspaceSchema, type WorkspaceStatsResponse, type WorkspaceUpdatedPayload, channelMemberSchema, channelSchema, conversationMemberSchema, conversationSchema, countWords, createCodeBlockValidator, createMessageContentValidator, dmConversationSchema, escapeHTML, extractMentions, formatFullDateTime, formatMessageTimestamp, formatRelativeTime, formatShortDate, groupChatInviteSchema, groupChatMemberSchema, groupChatPermissionsSchema, groupChatSettingsSchema, groupConversationSchema, messageAttachmentSchema, messageDraftSchema, messageSchema, notificationSchema, notificationSettingsSchema, pinnedMessageSchema, prRoomConversationSchema, reactionGroupSchema, reactionSchema, savedMessageSchema, slugify, truncate, truncateWords, userPresenceSchema, userSchema, usernameSchema, validateResponse, withValidation, workspaceChannelConversationSchema, workspaceMemberSchema, workspaceSchema };
