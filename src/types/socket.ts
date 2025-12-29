import type { Message } from './message';
import type { Reaction } from './reaction';
import type { UserPresence } from './user';
import type { Conversation } from './conversation';
import type { Channel, ChannelMember } from './channel';
import type { Workspace, WorkspaceMember } from './workspace';

// Socket.IO event payload types

// Authentication events
export interface AuthPayload {
  token: string;
}

export interface AuthSuccessPayload {
  userId: string;
  sessionId: string;
}

export interface AuthErrorPayload {
  code: string;
  message: string;
}

// Message events
export interface MessageSendPayload {
  conversationId: string;
  content: string;
  parentMessageId?: string;
  attachmentIds?: string[];
  metadata?: Record<string, unknown>;
}

export interface MessageNewPayload {
  message: Message;
}

export interface MessageEditPayload {
  messageId: string;
  content: string;
}

export interface MessageEditedPayload {
  message: Message;
}

export interface MessageDeletePayload {
  messageId: string;
}

export interface MessageDeletedPayload {
  messageId: string;
  conversationId: string;
}

export interface MessageTypingPayload {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

// Reaction events
export interface ReactionAddPayload {
  messageId: string;
  emoji: string;
}

export interface ReactionAddedPayload {
  reaction: Reaction;
}

export interface ReactionRemovePayload {
  messageId: string;
  emoji: string;
}

export interface ReactionRemovedPayload {
  messageId: string;
  emoji: string;
  userId: string;
}

// Conversation events
export interface ConversationJoinPayload {
  conversationId: string;
}

export interface ConversationLeavePayload {
  conversationId: string;
}

export interface ConversationMarkReadPayload {
  conversationId: string;
  lastReadSeq: number;
}

export interface ConversationUpdatedPayload {
  conversation: Conversation;
}

// Presence events
export interface PresenceUpdatePayload {
  status: 'online' | 'away' | 'dnd' | 'invisible';
  customStatus?: string;
}

export interface PresenceChangedPayload {
  presence: UserPresence;
}

// Notification events
export interface NotificationNewPayload {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  createdAt: Date;
}

export interface NotificationReadPayload {
  notificationId: string;
}

// Channel events
export interface ChannelCreatedPayload {
  channel: Channel;
}

export interface ChannelUpdatedPayload {
  channel: Channel;
}

export interface ChannelDeletedPayload {
  channelId: string;
  workspaceId: string;
}

export interface ChannelMemberJoinedPayload {
  channelMember: ChannelMember;
}

export interface ChannelMemberLeftPayload {
  channelId: string;
  userId: string;
}

// Workspace events
export interface WorkspaceUpdatedPayload {
  workspace: Workspace;
}

export interface WorkspaceMemberJoinedPayload {
  workspaceMember: WorkspaceMember;
}

export interface WorkspaceMemberLeftPayload {
  workspaceId: string;
  userId: string;
}

export interface WorkspaceMemberRoleChangedPayload {
  workspaceMember: WorkspaceMember;
}

// Union type for all socket event payloads
export type SocketEventPayload =
  | { event: 'auth'; data: AuthPayload }
  | { event: 'auth:success'; data: AuthSuccessPayload }
  | { event: 'auth:error'; data: AuthErrorPayload }
  | { event: 'message:send'; data: MessageSendPayload }
  | { event: 'message:new'; data: MessageNewPayload }
  | { event: 'message:edit'; data: MessageEditPayload }
  | { event: 'message:edited'; data: MessageEditedPayload }
  | { event: 'message:delete'; data: MessageDeletePayload }
  | { event: 'message:deleted'; data: MessageDeletedPayload }
  | { event: 'message:typing'; data: MessageTypingPayload }
  | { event: 'reaction:add'; data: ReactionAddPayload }
  | { event: 'reaction:added'; data: ReactionAddedPayload }
  | { event: 'reaction:remove'; data: ReactionRemovePayload }
  | { event: 'reaction:removed'; data: ReactionRemovedPayload }
  | { event: 'conversation:join'; data: ConversationJoinPayload }
  | { event: 'conversation:leave'; data: ConversationLeavePayload }
  | { event: 'conversation:mark_read'; data: ConversationMarkReadPayload }
  | { event: 'conversation:updated'; data: ConversationUpdatedPayload }
  | { event: 'presence:update'; data: PresenceUpdatePayload }
  | { event: 'presence:changed'; data: PresenceChangedPayload }
  | { event: 'notification:new'; data: NotificationNewPayload }
  | { event: 'notification:read'; data: NotificationReadPayload }
  | { event: 'channel:created'; data: ChannelCreatedPayload }
  | { event: 'channel:updated'; data: ChannelUpdatedPayload }
  | { event: 'channel:deleted'; data: ChannelDeletedPayload }
  | { event: 'channel:member_joined'; data: ChannelMemberJoinedPayload }
  | { event: 'channel:member_left'; data: ChannelMemberLeftPayload }
  | { event: 'workspace:updated'; data: WorkspaceUpdatedPayload }
  | { event: 'workspace:member_joined'; data: WorkspaceMemberJoinedPayload }
  | { event: 'workspace:member_left'; data: WorkspaceMemberLeftPayload }
  | { event: 'workspace:member_role_changed'; data: WorkspaceMemberRoleChangedPayload };
