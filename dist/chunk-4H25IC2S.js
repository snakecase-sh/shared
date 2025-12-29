// src/constants/events.ts
var SOCKET_EVENTS = {
  // Connection events
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  ERROR: "error",
  // Authentication
  AUTH: "auth",
  AUTH_SUCCESS: "auth:success",
  AUTH_ERROR: "auth:error",
  // Conversation events
  CONVERSATION_JOIN: "conversation:join",
  CONVERSATION_JOINED: "conversation:joined",
  CONVERSATION_LEAVE: "conversation:leave",
  CONVERSATION_LEFT: "conversation:left",
  CONVERSATION_MARK_READ: "conversation:mark_read",
  CONVERSATION_UPDATED: "conversation:updated",
  // Message events
  MESSAGE_NEW: "message:new",
  MESSAGE_CREATED: "message:created",
  MESSAGE_EDITED: "message:edited",
  MESSAGE_UPDATED: "message:updated",
  MESSAGE_DELETED: "message:deleted",
  // Typing events
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",
  // Reaction events
  REACTION_ADDED: "reaction:added",
  REACTION_REMOVED: "reaction:removed",
  // Presence events
  PRESENCE_UPDATE: "presence:update",
  PRESENCE_CHANGED: "presence:changed",
  // Notification events
  NOTIFICATION_NEW: "notification:new",
  NOTIFICATION_READ: "notification:read",
  // Channel events
  CHANNEL_CREATED: "channel:created",
  CHANNEL_UPDATED: "channel:updated",
  CHANNEL_DELETED: "channel:deleted",
  CHANNEL_MEMBER_JOINED: "channel:member_joined",
  CHANNEL_MEMBER_LEFT: "channel:member_left",
  // Workspace events
  WORKSPACE_UPDATED: "workspace:updated",
  WORKSPACE_MEMBER_JOINED: "workspace:member_joined",
  WORKSPACE_MEMBER_LEFT: "workspace:member_left",
  WORKSPACE_MEMBER_ROLE_CHANGED: "workspace:member_role_changed"
};

export {
  SOCKET_EVENTS
};
