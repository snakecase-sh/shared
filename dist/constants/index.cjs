"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  ERROR_CODES: () => ERROR_CODES,
  PLAN_LIMITS: () => PLAN_LIMITS,
  SOCKET_EVENTS: () => SOCKET_EVENTS
});
module.exports = __toCommonJS(constants_exports);

// src/constants/plans.ts
var PLAN_LIMITS = {
  free: {
    messageTextMaxChars: 4e3,
    codeBlockMaxChars: 3e4,
    attachmentMaxSize: 10 * 1024 * 1024,
    // 10 MB
    storageTotal: 1 * 1024 * 1024 * 1024,
    // 1 GB
    retentionDays: 30,
    dmRequestsPerDay: 5,
    dmRequestsPendingMax: 10,
    aiActionsPerWeek: 10,
    groupsMax: 3,
    groupMembersMax: 20
  },
  pro: {
    messageTextMaxChars: 2e4,
    codeBlockMaxChars: 2e5,
    attachmentMaxSize: 100 * 1024 * 1024,
    // 100 MB
    storageTotal: 50 * 1024 * 1024 * 1024,
    // 50 GB
    retentionDays: 365,
    dmRequestsPerDay: Infinity,
    dmRequestsPendingMax: Infinity,
    aiActionsPerWeek: Infinity,
    groupsMax: Infinity,
    groupMembersMax: Infinity,
    exportsEnabled: true
  },
  team: {
    messageTextMaxChars: 2e4,
    codeBlockMaxChars: 2e5,
    attachmentMaxSize: 100 * 1024 * 1024,
    // 100 MB
    storageTotal: 100 * 1024 * 1024 * 1024,
    // 100 GB per user
    retentionDays: 365,
    dmRequestsPerDay: Infinity,
    dmRequestsPendingMax: Infinity,
    aiActionsPerWeek: Infinity,
    groupsMax: Infinity,
    groupMembersMax: Infinity,
    exportsEnabled: true,
    auditLogsEnabled: true,
    samlSSOEnabled: true
  }
};

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

// src/constants/errors.ts
var ERROR_CODES = {
  // Authentication errors (1000-1099)
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  // Authorization errors (1100-1199)
  FORBIDDEN: "FORBIDDEN",
  INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
  WORKSPACE_ACCESS_DENIED: "WORKSPACE_ACCESS_DENIED",
  CHANNEL_ACCESS_DENIED: "CHANNEL_ACCESS_DENIED",
  // Validation errors (1200-1299)
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  INVALID_FORMAT: "INVALID_FORMAT",
  // Resource errors (1300-1399)
  NOT_FOUND: "NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  CONVERSATION_NOT_FOUND: "CONVERSATION_NOT_FOUND",
  MESSAGE_NOT_FOUND: "MESSAGE_NOT_FOUND",
  WORKSPACE_NOT_FOUND: "WORKSPACE_NOT_FOUND",
  CHANNEL_NOT_FOUND: "CHANNEL_NOT_FOUND",
  // Conflict errors (1400-1499)
  ALREADY_EXISTS: "ALREADY_EXISTS",
  DUPLICATE_ENTRY: "DUPLICATE_ENTRY",
  USERNAME_TAKEN: "USERNAME_TAKEN",
  WORKSPACE_SLUG_TAKEN: "WORKSPACE_SLUG_TAKEN",
  CHANNEL_NAME_TAKEN: "CHANNEL_NAME_TAKEN",
  // Rate limit errors (1500-1599)
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  DM_REQUEST_LIMIT_EXCEEDED: "DM_REQUEST_LIMIT_EXCEEDED",
  AI_ACTION_LIMIT_EXCEEDED: "AI_ACTION_LIMIT_EXCEEDED",
  // Plan limit errors (1600-1699)
  PLAN_LIMIT_EXCEEDED: "PLAN_LIMIT_EXCEEDED",
  MESSAGE_TOO_LONG: "MESSAGE_TOO_LONG",
  ATTACHMENT_TOO_LARGE: "ATTACHMENT_TOO_LARGE",
  STORAGE_QUOTA_EXCEEDED: "STORAGE_QUOTA_EXCEEDED",
  GROUP_LIMIT_EXCEEDED: "GROUP_LIMIT_EXCEEDED",
  FEATURE_NOT_AVAILABLE: "FEATURE_NOT_AVAILABLE",
  // Server errors (1700-1799)
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  UPLOAD_FAILED: "UPLOAD_FAILED",
  // GitHub integration errors (1800-1899)
  GITHUB_API_ERROR: "GITHUB_API_ERROR",
  GITHUB_AUTH_FAILED: "GITHUB_AUTH_FAILED",
  GITHUB_REPO_NOT_FOUND: "GITHUB_REPO_NOT_FOUND",
  GITHUB_PR_NOT_FOUND: "GITHUB_PR_NOT_FOUND"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ERROR_CODES,
  PLAN_LIMITS,
  SOCKET_EVENTS
});
