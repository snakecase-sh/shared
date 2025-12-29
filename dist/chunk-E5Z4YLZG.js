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
  // Message events
  MESSAGE_SEND: "message:send",
  MESSAGE_NEW: "message:new",
  MESSAGE_EDIT: "message:edit",
  MESSAGE_EDITED: "message:edited",
  MESSAGE_DELETE: "message:delete",
  MESSAGE_DELETED: "message:deleted",
  MESSAGE_TYPING: "message:typing",
  // Reaction events
  REACTION_ADD: "reaction:add",
  REACTION_ADDED: "reaction:added",
  REACTION_REMOVE: "reaction:remove",
  REACTION_REMOVED: "reaction:removed",
  // Conversation events
  CONVERSATION_JOIN: "conversation:join",
  CONVERSATION_LEAVE: "conversation:leave",
  CONVERSATION_MARK_READ: "conversation:mark_read",
  CONVERSATION_UPDATED: "conversation:updated",
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
