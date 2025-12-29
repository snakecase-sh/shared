import type { Socket as SocketIOSocket, Server as SocketIOServer } from 'socket.io';
import type { Socket as ClientSocket } from 'socket.io-client';
import type {
  AuthPayload,
  AuthSuccessPayload,
  AuthErrorPayload,
  MessageNewPayload,
  MessageCreatedPayload,
  MessageEditedPayload,
  MessageUpdatedPayload,
  MessageDeletedPayload,
  TypingStartPayload,
  TypingStopPayload,
  ReactionAddedPayload,
  ReactionRemovedPayload,
  ConversationJoinPayload,
  ConversationJoinedPayload,
  ConversationLeavePayload,
  ConversationLeftPayload,
  ConversationMarkReadPayload,
  ConversationUpdatedPayload,
  PresenceUpdatePayload,
  PresenceChangedPayload,
  NotificationNewPayload,
  NotificationReadPayload,
  ChannelCreatedPayload,
  ChannelUpdatedPayload,
  ChannelDeletedPayload,
  ChannelMemberJoinedPayload,
  ChannelMemberLeftPayload,
  WorkspaceUpdatedPayload,
  WorkspaceMemberJoinedPayload,
  WorkspaceMemberLeftPayload,
  WorkspaceMemberRoleChangedPayload,
} from './socket';

// Map of event names to their payload types
export interface ServerToClientEvents {
  // Authentication
  'auth:success': (data: AuthSuccessPayload) => void;
  'auth:error': (data: AuthErrorPayload) => void;

  // Conversation
  'conversation:joined': (data: ConversationJoinedPayload) => void;
  'conversation:left': (data: ConversationLeftPayload) => void;
  'conversation:updated': (data: ConversationUpdatedPayload) => void;

  // Messages
  'message:created': (data: MessageCreatedPayload) => void;
  'message:updated': (data: MessageUpdatedPayload) => void;
  'message:deleted': (data: MessageDeletedPayload) => void;

  // Typing
  'typing:start': (data: TypingStartPayload) => void;
  'typing:stop': (data: TypingStopPayload) => void;

  // Reactions
  'reaction:added': (data: ReactionAddedPayload) => void;
  'reaction:removed': (data: ReactionRemovedPayload) => void;

  // Presence
  'presence:changed': (data: PresenceChangedPayload) => void;

  // Notifications
  'notification:new': (data: NotificationNewPayload) => void;

  // Channels
  'channel:created': (data: ChannelCreatedPayload) => void;
  'channel:updated': (data: ChannelUpdatedPayload) => void;
  'channel:deleted': (data: ChannelDeletedPayload) => void;
  'channel:member_joined': (data: ChannelMemberJoinedPayload) => void;
  'channel:member_left': (data: ChannelMemberLeftPayload) => void;

  // Workspace
  'workspace:updated': (data: WorkspaceUpdatedPayload) => void;
  'workspace:member_joined': (data: WorkspaceMemberJoinedPayload) => void;
  'workspace:member_left': (data: WorkspaceMemberLeftPayload) => void;
  'workspace:member_role_changed': (data: WorkspaceMemberRoleChangedPayload) => void;

  // Connection
  error: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  // Authentication
  auth: (data: AuthPayload) => void;

  // Conversation
  'conversation:join': (data: ConversationJoinPayload) => void;
  'conversation:leave': (data: ConversationLeavePayload) => void;
  'conversation:mark_read': (data: ConversationMarkReadPayload) => void;

  // Messages
  'message:new': (data: MessageNewPayload) => void;
  'message:edited': (data: MessageEditedPayload) => void;
  'message:deleted': (messageId: string) => void;

  // Typing
  'typing:start': (conversationId: string) => void;
  'typing:stop': (conversationId: string) => void;

  // Reactions
  'reaction:added': (data: { messageId: string; reactionId: string }) => void;
  'reaction:removed': (data: {
    messageId: string;
    reactionId: string;
    conversationId: string;
  }) => void;

  // Presence
  'presence:update': (data: PresenceUpdatePayload) => void;

  // Notifications
  'notification:read': (data: NotificationReadPayload) => void;
}

// Type-safe Socket.IO types
export type TypedServerSocket = SocketIOSocket<ClientToServerEvents, ServerToClientEvents>;
export type TypedClientSocket = ClientSocket<ServerToClientEvents, ClientToServerEvents>;
export type TypedServer = SocketIOServer<ClientToServerEvents, ServerToClientEvents>;
