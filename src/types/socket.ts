import type { Reaction } from './reaction';
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
export interface MessageNewPayload {
  conversationId: string;
  messageId: string;
}

export interface MessageCreatedPayload {
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

export interface MessageEditedPayload {
  messageId: string;
}

export interface MessageUpdatedPayload {
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

export interface MessageDeletedPayload {
  messageId: string;
  conversationId: string;
  seq: number;
}

// Typing events
export interface TypingStartPayload {
  conversationId: string;
  userId: string;
  username: string;
}

export interface TypingStopPayload {
  conversationId: string;
  userId: string;
}

// Reaction events
export interface ReactionAddedPayload {
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

export interface ReactionRemovedPayload {
  messageId: string;
  reactionId: string;
}

// Conversation events
export interface ConversationJoinPayload {
  conversationId: string;
}

export interface ConversationJoinedPayload {
  conversationId: string;
}

export interface ConversationLeavePayload {
  conversationId: string;
}

export interface ConversationLeftPayload {
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
  status: 'online' | 'away' | 'offline';
}

export interface PresenceChangedPayload {
  userId: string;
  status: 'online' | 'away' | 'offline';
  timestamp: string;
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
  | { event: 'conversation:join'; data: ConversationJoinPayload }
  | { event: 'conversation:joined'; data: ConversationJoinedPayload }
  | { event: 'conversation:leave'; data: ConversationLeavePayload }
  | { event: 'conversation:left'; data: ConversationLeftPayload }
  | { event: 'conversation:mark_read'; data: ConversationMarkReadPayload }
  | { event: 'conversation:updated'; data: ConversationUpdatedPayload }
  | { event: 'message:new'; data: MessageNewPayload }
  | { event: 'message:created'; data: MessageCreatedPayload }
  | { event: 'message:edited'; data: MessageEditedPayload }
  | { event: 'message:updated'; data: MessageUpdatedPayload }
  | { event: 'message:deleted'; data: MessageDeletedPayload }
  | { event: 'typing:start'; data: TypingStartPayload }
  | { event: 'typing:stop'; data: TypingStopPayload }
  | { event: 'reaction:added'; data: ReactionAddedPayload }
  | { event: 'reaction:removed'; data: ReactionRemovedPayload }
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
