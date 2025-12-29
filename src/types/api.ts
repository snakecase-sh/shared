import type { User, Session, UserEntitlements } from './user';
import type { Workspace, WorkspaceMember } from './workspace';
import type { Channel, ChannelMember } from './channel';
import type { Conversation, ConversationMember } from './conversation';
import type { Message, MessageAttachment, MessageDraft } from './message';
import type { ReactionGroup } from './reaction';
import type { APIError } from '../constants/errors';

// Base response types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: APIError;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  cursor?: string;
}

// User API types
export interface CreateUserRequest {
  githubId: number;
  username: string;
  email?: string;
  avatar?: string;
  displayName?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  avatar?: string;
  displayName?: string;
  bio?: string;
}

export interface UserResponse {
  user: User;
  entitlements: UserEntitlements;
}

export interface UserListResponse extends PaginatedResponse<User> {}

export interface UpdatePresenceRequest {
  status: 'online' | 'away' | 'dnd' | 'invisible';
  customStatus?: string;
}

// Workspace API types
export interface CreateWorkspaceRequest {
  githubOrgId: number;
  name: string;
  slug: string;
  avatar?: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  slug?: string;
  avatar?: string;
  plan?: 'free' | 'pro' | 'team';
}

export interface WorkspaceResponse {
  workspace: Workspace;
  members: WorkspaceMember[];
  channels: Channel[];
}

export interface WorkspaceListResponse extends PaginatedResponse<Workspace> {}

export interface AddWorkspaceMemberRequest {
  userId: string;
  role?: 'admin' | 'member';
}

export interface UpdateWorkspaceMemberRequest {
  role: 'owner' | 'admin' | 'member';
}

// Channel API types
export interface CreateChannelRequest {
  name: string;
  topic?: string;
  isPrivate?: boolean;
}

export interface UpdateChannelRequest {
  name?: string;
  topic?: string;
}

export interface ChannelResponse {
  channel: Channel;
  members: ChannelMember[];
  unreadCount: number;
}

export interface ChannelListResponse extends PaginatedResponse<Channel> {}

export interface AddChannelMemberRequest {
  userId: string;
  role?: 'admin' | 'member';
}

// Conversation API types
export interface CreateDMConversationRequest {
  participantId: string;
}

export interface CreateGroupConversationRequest {
  name: string;
  participantIds: string[];
  avatar?: string;
}

export interface CreatePRRoomConversationRequest {
  githubRepoId: number;
  githubPRNumber: number;
  prTitle: string;
  prUrl: string;
}

export interface UpdateConversationRequest {
  name?: string;
  avatar?: string;
}

export interface ConversationResponse {
  conversation: Conversation;
  members: ConversationMember[];
  unreadCount: number;
  lastMessage?: Message;
}

export interface ConversationListResponse extends PaginatedResponse<ConversationResponse> {}

export interface AddConversationMemberRequest {
  userId: string;
}

export interface MarkConversationReadRequest {
  lastReadSeq: number;
}

export interface MuteConversationRequest {
  mutedUntil: Date | null;
}

// Message API types
export interface CreateMessageRequest {
  content: string;
  parentMessageId?: string;
  attachmentIds?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateMessageRequest {
  content: string;
}

export interface MessageResponse {
  message: Message;
  reactions: ReactionGroup[];
  attachments: MessageAttachment[];
}

export interface MessageListResponse extends PaginatedResponse<MessageResponse> {
  conversationId: string;
}

export interface SearchMessagesRequest extends PaginationParams {
  query: string;
  conversationId?: string;
  workspaceId?: string;
  fromDate?: Date;
  toDate?: Date;
  authorId?: string;
}

export interface SearchMessagesResponse extends PaginatedResponse<MessageResponse> {}

export interface SaveMessageDraftRequest {
  content: string;
}

export interface MessageDraftResponse {
  draft: MessageDraft;
}

// Reaction API types
export interface AddReactionRequest {
  emoji: string;
}

export interface ReactionListResponse {
  reactions: ReactionGroup[];
}

// Attachment API types
export interface CreateAttachmentRequest {
  filename: string;
  mimeType: string;
  size: number;
}

export interface CreateAttachmentResponse {
  attachment: MessageAttachment;
  uploadUrl: string;
}

export interface AttachmentListResponse extends PaginatedResponse<MessageAttachment> {}

// Session API types
export interface CreateSessionRequest {
  githubCode: string;
}

export interface CreateSessionResponse {
  session: Session;
  user: User;
  entitlements: UserEntitlements;
}

export interface SessionResponse {
  session: Session;
}

export interface SessionListResponse extends PaginatedResponse<Session> {}

// Analytics/Stats API types
export interface WorkspaceStatsResponse {
  workspaceId: string;
  totalMembers: number;
  totalChannels: number;
  totalMessages: number;
  activeUsers: number;
  storageUsed: number;
}

export interface UserStatsResponse {
  userId: string;
  totalMessages: number;
  totalReactions: number;
  conversationsCount: number;
  storageUsed: number;
}

// Notification API types
export interface NotificationResponse {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

export interface NotificationListResponse extends PaginatedResponse<NotificationResponse> {}

export interface MarkNotificationReadRequest {
  notificationIds: string[];
}

// GitHub Integration API types
export interface GitHubRepoResponse {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  url: string;
}

export interface GitHubPRResponse {
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

export interface GitHubRepoListResponse extends PaginatedResponse<GitHubRepoResponse> {}

export interface GitHubPRListResponse extends PaginatedResponse<GitHubPRResponse> {}
