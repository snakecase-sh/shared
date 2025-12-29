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

// src/validators/index.ts
var validators_exports = {};
__export(validators_exports, {
  channelMemberSchema: () => channelMemberSchema,
  channelSchema: () => channelSchema,
  conversationMemberSchema: () => conversationMemberSchema,
  conversationSchema: () => conversationSchema,
  createCodeBlockValidator: () => createCodeBlockValidator,
  createMessageContentValidator: () => createMessageContentValidator,
  dmConversationSchema: () => dmConversationSchema,
  groupConversationSchema: () => groupConversationSchema,
  messageAttachmentSchema: () => messageAttachmentSchema,
  messageDraftSchema: () => messageDraftSchema,
  messageSchema: () => messageSchema,
  notificationSchema: () => notificationSchema,
  notificationSettingsSchema: () => notificationSettingsSchema,
  prRoomConversationSchema: () => prRoomConversationSchema,
  reactionGroupSchema: () => reactionGroupSchema,
  reactionSchema: () => reactionSchema,
  userPresenceSchema: () => userPresenceSchema,
  userSchema: () => userSchema,
  usernameSchema: () => usernameSchema,
  workspaceChannelConversationSchema: () => workspaceChannelConversationSchema,
  workspaceMemberSchema: () => workspaceMemberSchema,
  workspaceSchema: () => workspaceSchema
});
module.exports = __toCommonJS(validators_exports);

// src/validators/user.ts
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  githubId: import_zod.z.number().int().positive(),
  username: import_zod.z.string().min(1).max(39),
  // GitHub username max length
  email: import_zod.z.string().email().nullable(),
  avatar: import_zod.z.string().url().nullable(),
  displayName: import_zod.z.string().max(100).nullable(),
  bio: import_zod.z.string().max(500).nullable(),
  plan: import_zod.z.enum(["free", "pro", "team"]),
  createdAt: import_zod.z.date(),
  updatedAt: import_zod.z.date()
});
var userPresenceSchema = import_zod.z.object({
  userId: import_zod.z.string().uuid(),
  status: import_zod.z.enum(["online", "away", "dnd", "invisible"]),
  lastSeenAt: import_zod.z.date(),
  customStatus: import_zod.z.string().max(100).optional()
});
var usernameSchema = import_zod.z.string().min(1).max(39).regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/, {
  message: "Username must start and end with alphanumeric characters, and can only contain hyphens in between"
});

// src/validators/workspace.ts
var import_zod2 = require("zod");
var workspaceSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  githubOrgId: import_zod2.z.number().int().positive(),
  name: import_zod2.z.string().min(1).max(100),
  slug: import_zod2.z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, {
    message: "Slug must contain only lowercase letters, numbers, and hyphens"
  }),
  avatar: import_zod2.z.string().url().nullable(),
  ownerId: import_zod2.z.string().uuid(),
  plan: import_zod2.z.enum(["free", "pro", "team"]),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date()
});
var workspaceMemberSchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid(),
  workspaceId: import_zod2.z.string().uuid(),
  userId: import_zod2.z.string().uuid(),
  role: import_zod2.z.enum(["owner", "admin", "member"]),
  joinedAt: import_zod2.z.date()
});

// src/validators/channel.ts
var import_zod3 = require("zod");
var channelSchema = import_zod3.z.object({
  id: import_zod3.z.string().uuid(),
  workspaceId: import_zod3.z.string().uuid(),
  name: import_zod3.z.string().min(1).max(80).regex(/^[a-z0-9-_]+$/, {
    message: "Channel name must contain only lowercase letters, numbers, hyphens, and underscores"
  }),
  topic: import_zod3.z.string().max(250).nullable(),
  isPrivate: import_zod3.z.boolean(),
  createdById: import_zod3.z.string().uuid(),
  createdAt: import_zod3.z.date(),
  updatedAt: import_zod3.z.date(),
  archivedAt: import_zod3.z.date().nullable()
});
var channelMemberSchema = import_zod3.z.object({
  id: import_zod3.z.string().uuid(),
  channelId: import_zod3.z.string().uuid(),
  userId: import_zod3.z.string().uuid(),
  role: import_zod3.z.enum(["admin", "member"]),
  joinedAt: import_zod3.z.date()
});

// src/validators/conversation.ts
var import_zod4 = require("zod");
var baseConversationSchema = import_zod4.z.object({
  id: import_zod4.z.string().uuid(),
  type: import_zod4.z.enum(["dm", "group", "workspace_channel", "pr_room"]),
  createdAt: import_zod4.z.date(),
  updatedAt: import_zod4.z.date(),
  lastMessageAt: import_zod4.z.date().nullable()
});
var dmConversationSchema = baseConversationSchema.extend({
  type: import_zod4.z.literal("dm"),
  participantIds: import_zod4.z.tuple([import_zod4.z.string().uuid(), import_zod4.z.string().uuid()])
});
var groupConversationSchema = baseConversationSchema.extend({
  type: import_zod4.z.literal("group"),
  name: import_zod4.z.string().min(1).max(100),
  avatar: import_zod4.z.string().url().nullable(),
  ownerId: import_zod4.z.string().uuid(),
  participantIds: import_zod4.z.array(import_zod4.z.string().uuid()).min(1)
});
var workspaceChannelConversationSchema = baseConversationSchema.extend({
  type: import_zod4.z.literal("workspace_channel"),
  channelId: import_zod4.z.string().uuid(),
  workspaceId: import_zod4.z.string().uuid()
});
var prRoomConversationSchema = baseConversationSchema.extend({
  type: import_zod4.z.literal("pr_room"),
  githubRepoId: import_zod4.z.number().int().positive(),
  githubPRNumber: import_zod4.z.number().int().positive(),
  prTitle: import_zod4.z.string().min(1).max(256),
  prUrl: import_zod4.z.string().url(),
  participantIds: import_zod4.z.array(import_zod4.z.string().uuid()).min(1)
});
var conversationSchema = import_zod4.z.discriminatedUnion("type", [
  dmConversationSchema,
  groupConversationSchema,
  workspaceChannelConversationSchema,
  prRoomConversationSchema
]);
var conversationMemberSchema = import_zod4.z.object({
  id: import_zod4.z.string().uuid(),
  conversationId: import_zod4.z.string().uuid(),
  userId: import_zod4.z.string().uuid(),
  joinedAt: import_zod4.z.date(),
  lastReadSeq: import_zod4.z.number().int().nonnegative(),
  mutedUntil: import_zod4.z.date().nullable()
});

// src/validators/message.ts
var import_zod5 = require("zod");
var messageSchema = import_zod5.z.object({
  id: import_zod5.z.string().uuid(),
  conversationId: import_zod5.z.string().uuid(),
  authorId: import_zod5.z.string().uuid(),
  content: import_zod5.z.string(),
  seq: import_zod5.z.number().int().positive(),
  createdAt: import_zod5.z.date(),
  editedAt: import_zod5.z.date().nullable(),
  deletedAt: import_zod5.z.date().nullable(),
  parentMessageId: import_zod5.z.string().uuid().nullable(),
  attachmentIds: import_zod5.z.array(import_zod5.z.string().uuid()),
  metadata: import_zod5.z.record(import_zod5.z.unknown())
});
var messageAttachmentSchema = import_zod5.z.object({
  id: import_zod5.z.string().uuid(),
  messageId: import_zod5.z.string().uuid(),
  filename: import_zod5.z.string().min(1).max(255),
  mimeType: import_zod5.z.string().min(1).max(127),
  size: import_zod5.z.number().int().positive(),
  url: import_zod5.z.string().url(),
  thumbnailUrl: import_zod5.z.string().url().nullable(),
  uploadedById: import_zod5.z.string().uuid(),
  createdAt: import_zod5.z.date()
});
var messageDraftSchema = import_zod5.z.object({
  conversationId: import_zod5.z.string().uuid(),
  userId: import_zod5.z.string().uuid(),
  content: import_zod5.z.string(),
  updatedAt: import_zod5.z.date()
});
var createMessageContentValidator = (plan) => {
  const limits = {
    free: { text: 4e3, code: 3e4 },
    pro: { text: 2e4, code: 2e5 },
    team: { text: 2e4, code: 2e5 }
  };
  const limit = limits[plan];
  return import_zod5.z.string().max(limit.text, {
    message: `Message content exceeds ${limit.text} character limit for ${plan} plan`
  });
};
var createCodeBlockValidator = (plan) => {
  const limits = {
    free: 3e4,
    pro: 2e5,
    team: 2e5
  };
  const limit = limits[plan];
  return import_zod5.z.string().max(limit, {
    message: `Code block exceeds ${limit} character limit for ${plan} plan`
  });
};

// src/validators/reaction.ts
var import_zod6 = require("zod");
var reactionSchema = import_zod6.z.object({
  id: import_zod6.z.string().uuid(),
  messageId: import_zod6.z.string().uuid(),
  userId: import_zod6.z.string().uuid(),
  emoji: import_zod6.z.string().min(1).max(50),
  // Emoji or emoji shortcode
  createdAt: import_zod6.z.date()
});
var reactionGroupSchema = import_zod6.z.object({
  emoji: import_zod6.z.string().min(1).max(50),
  count: import_zod6.z.number().int().positive(),
  userIds: import_zod6.z.array(import_zod6.z.string().uuid()),
  hasReacted: import_zod6.z.boolean()
});

// src/validators/notification.ts
var import_zod7 = require("zod");
var notificationSchema = import_zod7.z.object({
  id: import_zod7.z.string().uuid(),
  userId: import_zod7.z.string().uuid(),
  type: import_zod7.z.enum(["message", "mention", "reaction", "dm_request", "channel_invite", "workspace_invite"]),
  title: import_zod7.z.string().min(1).max(200),
  body: import_zod7.z.string().min(1).max(500),
  avatarUrl: import_zod7.z.string().url().nullable(),
  actionUrl: import_zod7.z.string().url().nullable(),
  metadata: import_zod7.z.record(import_zod7.z.unknown()),
  readAt: import_zod7.z.date().nullable(),
  createdAt: import_zod7.z.date()
});
var notificationSettingsSchema = import_zod7.z.object({
  userId: import_zod7.z.string().uuid(),
  emailNotifications: import_zod7.z.boolean(),
  pushNotifications: import_zod7.z.boolean(),
  desktopNotifications: import_zod7.z.boolean(),
  notifyOnMentions: import_zod7.z.boolean(),
  notifyOnDMs: import_zod7.z.boolean(),
  notifyOnReactions: import_zod7.z.boolean(),
  mutedConversationIds: import_zod7.z.array(import_zod7.z.string().uuid()),
  updatedAt: import_zod7.z.date()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelMemberSchema,
  channelSchema,
  conversationMemberSchema,
  conversationSchema,
  createCodeBlockValidator,
  createMessageContentValidator,
  dmConversationSchema,
  groupConversationSchema,
  messageAttachmentSchema,
  messageDraftSchema,
  messageSchema,
  notificationSchema,
  notificationSettingsSchema,
  prRoomConversationSchema,
  reactionGroupSchema,
  reactionSchema,
  userPresenceSchema,
  userSchema,
  usernameSchema,
  workspaceChannelConversationSchema,
  workspaceMemberSchema,
  workspaceSchema
});
