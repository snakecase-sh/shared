import { Socket, Server } from 'socket.io';
import { Socket as Socket$1 } from 'socket.io-client';
import { APIError } from '../constants/errors.cjs';

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

export type { APIResponse, AddChannelMemberRequest, AddConversationMemberRequest, AddReactionRequest, AddWorkspaceMemberRequest, AttachmentListResponse, AuthErrorPayload, AuthPayload, AuthSuccessPayload, BaseConversation, Channel, ChannelCreatedPayload, ChannelDeletedPayload, ChannelListResponse, ChannelMember, ChannelMemberJoinedPayload, ChannelMemberLeftPayload, ChannelResponse, ChannelUpdatedPayload, ClientToServerEvents, Conversation, ConversationJoinPayload, ConversationJoinedPayload, ConversationLeavePayload, ConversationLeftPayload, ConversationListResponse, ConversationMarkReadPayload, ConversationMember, ConversationResponse, ConversationType, ConversationUpdatedPayload, CreateAttachmentRequest, CreateAttachmentResponse, CreateChannelRequest, CreateDMConversationRequest, CreateGroupConversationRequest, CreateMessageRequest, CreatePRRoomConversationRequest, CreateSessionRequest, CreateSessionResponse, CreateUserRequest, CreateWorkspaceRequest, DMConversation, GitHubPRListResponse, GitHubPRResponse, GitHubRepoListResponse, GitHubRepoResponse, GroupConversation, MarkConversationReadRequest, MarkNotificationReadRequest, Message, MessageAttachment, MessageCreatedPayload, MessageDeletedPayload, MessageDraft, MessageDraftResponse, MessageEditedPayload, MessageListResponse, MessageNewPayload, MessageResponse, MessageUpdatedPayload, MuteConversationRequest, Notification, NotificationListResponse, NotificationNewPayload, NotificationReadPayload, NotificationResponse, NotificationSettings, NotificationType, PRRoomConversation, PaginatedResponse, PaginationParams, PresenceChangedPayload, PresenceUpdatePayload, Reaction, ReactionAddedPayload, ReactionGroup, ReactionListResponse, ReactionRemovedPayload, SaveMessageDraftRequest, SearchMessagesRequest, SearchMessagesResponse, ServerToClientEvents, Session, SessionListResponse, SessionResponse, SocketEventPayload, TypedClientSocket, TypedServer, TypedServerSocket, TypingStartPayload, TypingStopPayload, UpdateChannelRequest, UpdateConversationRequest, UpdateMessageRequest, UpdatePresenceRequest, UpdateUserRequest, UpdateWorkspaceMemberRequest, UpdateWorkspaceRequest, User, UserEntitlements, UserListResponse, UserPresence, UserResponse, UserStatsResponse, Workspace, WorkspaceChannelConversation, WorkspaceListResponse, WorkspaceMember, WorkspaceMemberJoinedPayload, WorkspaceMemberLeftPayload, WorkspaceMemberRoleChangedPayload, WorkspaceResponse, WorkspaceStatsResponse, WorkspaceUpdatedPayload };
