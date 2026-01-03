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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ConversationSchema: () => ConversationSchema,
  CreateConversationResponseSchema: () => CreateConversationResponseSchema,
  CreateGroupResponseSchema: () => CreateGroupResponseSchema,
  CreateStatusCommentResponseSchema: () => CreateStatusCommentResponseSchema,
  CreateStatusResponseSchema: () => CreateStatusResponseSchema,
  CreateWorkspaceResponseSchema: () => CreateWorkspaceResponseSchema,
  ERROR_CODES: () => ERROR_CODES,
  GetConversationResponseSchema: () => GetConversationResponseSchema,
  GetConversationsResponseSchema: () => GetConversationsResponseSchema,
  GetGroupResponseSchema: () => GetGroupResponseSchema,
  GetGroupsResponseSchema: () => GetGroupsResponseSchema,
  GetMessagesResponseSchema: () => GetMessagesResponseSchema,
  GetSavedMessagesResponseSchema: () => GetSavedMessagesResponseSchema,
  GetStatusCommentsResponseSchema: () => GetStatusCommentsResponseSchema,
  GetStatusFeedResponseSchema: () => GetStatusFeedResponseSchema,
  GetWorkspaceResponseSchema: () => GetWorkspaceResponseSchema,
  GetWorkspacesResponseSchema: () => GetWorkspacesResponseSchema,
  GroupSchema: () => GroupSchema,
  MessageSchema: () => MessageSchema,
  OnboardingProgressSchema: () => OnboardingProgressSchema,
  OnboardingStatusSchema: () => OnboardingStatusSchema,
  OnboardingStep: () => OnboardingStep,
  OnboardingStepSchema: () => OnboardingStepSchema,
  PLAN_LIMITS: () => PLAN_LIMITS,
  ResponseSchemas: () => ResponseSchemas,
  SOCKET_EVENTS: () => SOCKET_EVENTS,
  SearchUsersResponseSchema: () => SearchUsersResponseSchema,
  SendMessageResponseSchema: () => SendMessageResponseSchema,
  StatusSchema: () => StatusSchema,
  TermsAcceptanceRequestSchema: () => TermsAcceptanceRequestSchema,
  UserSchema: () => UserSchema,
  WorkspaceSchema: () => WorkspaceSchema,
  channelMemberSchema: () => channelMemberSchema,
  channelSchema: () => channelSchema,
  conversationMemberSchema: () => conversationMemberSchema,
  conversationSchema: () => conversationSchema,
  countWords: () => countWords,
  createCodeBlockValidator: () => createCodeBlockValidator,
  createMessageContentValidator: () => createMessageContentValidator,
  dmConversationSchema: () => dmConversationSchema,
  escapeHTML: () => escapeHTML,
  extractMentions: () => extractMentions,
  formatFullDateTime: () => formatFullDateTime,
  formatMessageTimestamp: () => formatMessageTimestamp,
  formatRelativeTime: () => formatRelativeTime,
  formatShortDate: () => formatShortDate,
  groupChatInviteSchema: () => groupChatInviteSchema,
  groupChatMemberSchema: () => groupChatMemberSchema,
  groupChatPermissionsSchema: () => groupChatPermissionsSchema,
  groupChatSettingsSchema: () => groupChatSettingsSchema,
  groupConversationSchema: () => groupConversationSchema,
  messageAttachmentSchema: () => messageAttachmentSchema,
  messageDraftSchema: () => messageDraftSchema,
  messageSchema: () => messageSchema,
  notificationSchema: () => notificationSchema,
  notificationSettingsSchema: () => notificationSettingsSchema,
  pinnedMessageSchema: () => pinnedMessageSchema,
  prRoomConversationSchema: () => prRoomConversationSchema,
  reactionGroupSchema: () => reactionGroupSchema,
  reactionSchema: () => reactionSchema,
  savedMessageSchema: () => savedMessageSchema,
  slugify: () => slugify,
  truncate: () => truncate,
  truncateWords: () => truncateWords,
  userPresenceSchema: () => userPresenceSchema,
  userSchema: () => userSchema,
  usernameSchema: () => usernameSchema,
  validateResponse: () => validateResponse,
  withValidation: () => withValidation,
  workspaceChannelConversationSchema: () => workspaceChannelConversationSchema,
  workspaceMemberSchema: () => workspaceMemberSchema,
  workspaceSchema: () => workspaceSchema
});
module.exports = __toCommonJS(index_exports);

// src/types/onboarding.ts
var OnboardingStep = /* @__PURE__ */ ((OnboardingStep2) => {
  OnboardingStep2["TERMS_ACCEPTANCE"] = "terms_acceptance";
  OnboardingStep2["PROFILE_SETUP"] = "profile_setup";
  OnboardingStep2["WORKSPACE_CREATION"] = "workspace_creation";
  OnboardingStep2["CHANNEL_CREATION"] = "channel_creation";
  OnboardingStep2["INVITE_TEAM"] = "invite_team";
  OnboardingStep2["COMPLETED"] = "completed";
  return OnboardingStep2;
})(OnboardingStep || {});

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
var groupChatSettingsSchema = import_zod4.z.object({
  conversationId: import_zod4.z.string().uuid(),
  allowMemberInvites: import_zod4.z.boolean(),
  onlyAdminCanPost: import_zod4.z.boolean(),
  onlyAdminCanPin: import_zod4.z.boolean(),
  allowReactions: import_zod4.z.boolean(),
  allowThreads: import_zod4.z.boolean(),
  allowFileSharing: import_zod4.z.boolean(),
  maxMembers: import_zod4.z.number().int().positive().max(1e3),
  description: import_zod4.z.string().max(500).nullable(),
  isPublic: import_zod4.z.boolean(),
  joinLink: import_zod4.z.string().nullable(),
  joinLinkExpiresAt: import_zod4.z.date().nullable(),
  createdAt: import_zod4.z.date(),
  updatedAt: import_zod4.z.date()
});
var groupChatPermissionsSchema = import_zod4.z.object({
  canInviteMembers: import_zod4.z.boolean(),
  canRemoveMembers: import_zod4.z.boolean(),
  canPinMessages: import_zod4.z.boolean(),
  canEditSettings: import_zod4.z.boolean(),
  canManageRoles: import_zod4.z.boolean(),
  canDeleteMessages: import_zod4.z.boolean()
});
var groupChatMemberSchema = conversationMemberSchema.extend({
  role: import_zod4.z.enum(["owner", "admin", "member"]),
  permissions: groupChatPermissionsSchema,
  nickname: import_zod4.z.string().min(1).max(50).nullable(),
  invitedById: import_zod4.z.string().uuid().nullable(),
  leftAt: import_zod4.z.date().nullable()
});
var groupChatInviteSchema = import_zod4.z.object({
  id: import_zod4.z.string().uuid(),
  conversationId: import_zod4.z.string().uuid(),
  invitedUserId: import_zod4.z.string().uuid(),
  invitedById: import_zod4.z.string().uuid(),
  status: import_zod4.z.enum(["pending", "accepted", "declined", "expired"]),
  expiresAt: import_zod4.z.date(),
  createdAt: import_zod4.z.date(),
  respondedAt: import_zod4.z.date().nullable()
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
var savedMessageSchema = import_zod5.z.object({
  id: import_zod5.z.string().uuid(),
  userId: import_zod5.z.string().uuid(),
  messageId: import_zod5.z.string().uuid(),
  conversationId: import_zod5.z.string().uuid(),
  savedAt: import_zod5.z.date(),
  note: import_zod5.z.string().max(500).nullable(),
  tags: import_zod5.z.array(import_zod5.z.string().min(1).max(50)),
  metadata: import_zod5.z.record(import_zod5.z.unknown())
});
var pinnedMessageSchema = import_zod5.z.object({
  id: import_zod5.z.string().uuid(),
  messageId: import_zod5.z.string().uuid(),
  conversationId: import_zod5.z.string().uuid(),
  pinnedById: import_zod5.z.string().uuid(),
  pinnedAt: import_zod5.z.date(),
  reason: import_zod5.z.string().max(200).nullable(),
  position: import_zod5.z.number().int().nonnegative()
});

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

// src/validators/onboarding.ts
var import_zod8 = require("zod");
var OnboardingStepSchema = import_zod8.z.enum([
  "terms_acceptance",
  "profile_setup",
  "workspace_creation",
  "channel_creation",
  "invite_team",
  "completed"
]);
var OnboardingStatusSchema = import_zod8.z.object({
  userId: import_zod8.z.string(),
  currentStep: OnboardingStepSchema,
  completedSteps: import_zod8.z.array(OnboardingStepSchema),
  termsAcceptedAt: import_zod8.z.date().nullable(),
  profileCompletedAt: import_zod8.z.date().nullable(),
  workspaceCreatedAt: import_zod8.z.date().nullable(),
  channelCreatedAt: import_zod8.z.date().nullable(),
  teamInvitedAt: import_zod8.z.date().nullable(),
  completedAt: import_zod8.z.date().nullable(),
  skippedSteps: import_zod8.z.array(OnboardingStepSchema),
  metadata: import_zod8.z.record(import_zod8.z.unknown()),
  createdAt: import_zod8.z.date(),
  updatedAt: import_zod8.z.date()
});
var TermsAcceptanceRequestSchema = import_zod8.z.object({
  userId: import_zod8.z.string(),
  termsVersion: import_zod8.z.string(),
  privacyPolicyVersion: import_zod8.z.string(),
  acceptedAt: import_zod8.z.date(),
  ipAddress: import_zod8.z.string().nullable(),
  userAgent: import_zod8.z.string().nullable()
});
var OnboardingProgressSchema = import_zod8.z.object({
  userId: import_zod8.z.string(),
  totalSteps: import_zod8.z.number(),
  completedSteps: import_zod8.z.number(),
  currentStep: OnboardingStepSchema,
  percentageComplete: import_zod8.z.number().min(0).max(100),
  isComplete: import_zod8.z.boolean()
});

// src/validators/api-responses.ts
var import_zod9 = require("zod");
var UserSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  githubId: import_zod9.z.number().optional(),
  githubUsername: import_zod9.z.string(),
  avatarUrl: import_zod9.z.string().nullable(),
  displayName: import_zod9.z.string().nullable(),
  email: import_zod9.z.string().nullable().optional(),
  plan: import_zod9.z.enum(["free", "pro"]).optional(),
  isAdmin: import_zod9.z.boolean().optional(),
  onboardingCompleted: import_zod9.z.boolean().optional(),
  createdAt: import_zod9.z.string(),
  updatedAt: import_zod9.z.string().optional()
});
var WorkspaceSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  slug: import_zod9.z.string(),
  name: import_zod9.z.string(),
  githubOrgId: import_zod9.z.number().nullable().optional(),
  githubOrgLogin: import_zod9.z.string().nullable().optional(),
  createdAt: import_zod9.z.string(),
  updatedAt: import_zod9.z.string().optional()
});
var ConversationSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  workspaceId: import_zod9.z.string().optional(),
  type: import_zod9.z.enum(["channel", "dm", "group", "DM", "GROUP", "CHANNEL"]),
  name: import_zod9.z.string().nullable(),
  topic: import_zod9.z.string().nullable().optional(),
  isPrivate: import_zod9.z.boolean().optional(),
  createdAt: import_zod9.z.string(),
  updatedAt: import_zod9.z.string().optional(),
  lastMessageAt: import_zod9.z.string().nullable().optional(),
  unreadCount: import_zod9.z.number().optional(),
  members: import_zod9.z.array(import_zod9.z.any()).optional()
});
var MessageSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  conversationId: import_zod9.z.string(),
  userId: import_zod9.z.string(),
  content: import_zod9.z.string(),
  type: import_zod9.z.enum(["text", "code", "system"]).optional(),
  metadata: import_zod9.z.record(import_zod9.z.any()).nullable().optional(),
  user: UserSchema.optional(),
  createdAt: import_zod9.z.string(),
  updatedAt: import_zod9.z.string().optional(),
  editedAt: import_zod9.z.string().nullable().optional(),
  reactions: import_zod9.z.array(import_zod9.z.any()).optional(),
  threadCount: import_zod9.z.number().optional()
});
var StatusSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  userId: import_zod9.z.string(),
  content: import_zod9.z.string(),
  user: UserSchema,
  likesCount: import_zod9.z.number(),
  commentsCount: import_zod9.z.number(),
  isLiked: import_zod9.z.boolean(),
  createdAt: import_zod9.z.string(),
  updatedAt: import_zod9.z.string().optional()
});
var GroupSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  name: import_zod9.z.string(),
  avatarUrl: import_zod9.z.string().nullable().optional(),
  members: import_zod9.z.array(UserSchema).optional(),
  lastMessage: MessageSchema.nullable().optional(),
  lastReadSeq: import_zod9.z.number().optional(),
  unreadCount: import_zod9.z.number().optional(),
  createdAt: import_zod9.z.string(),
  updatedAt: import_zod9.z.string().optional()
});
var GetWorkspacesResponseSchema = import_zod9.z.object({
  workspaces: import_zod9.z.array(WorkspaceSchema)
});
var GetWorkspaceResponseSchema = import_zod9.z.object({
  workspace: WorkspaceSchema
});
var CreateWorkspaceResponseSchema = import_zod9.z.object({
  workspace: WorkspaceSchema
});
var GetConversationsResponseSchema = import_zod9.z.object({
  conversations: import_zod9.z.array(ConversationSchema)
});
var GetConversationResponseSchema = import_zod9.z.object({
  conversation: ConversationSchema
});
var CreateConversationResponseSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  conversation: ConversationSchema
});
var GetMessagesResponseSchema = import_zod9.z.object({
  messages: import_zod9.z.array(MessageSchema),
  hasMore: import_zod9.z.boolean()
});
var SendMessageResponseSchema = import_zod9.z.object({
  message: MessageSchema
});
var SearchUsersResponseSchema = import_zod9.z.object({
  users: import_zod9.z.array(UserSchema)
});
var GetGroupsResponseSchema = import_zod9.z.object({
  groups: import_zod9.z.array(GroupSchema)
});
var GetGroupResponseSchema = import_zod9.z.object({
  group: GroupSchema
});
var CreateGroupResponseSchema = import_zod9.z.object({
  group: GroupSchema
});
var GetSavedMessagesResponseSchema = import_zod9.z.object({
  savedMessages: import_zod9.z.array(import_zod9.z.any())
});
var GetStatusFeedResponseSchema = import_zod9.z.object({
  statuses: import_zod9.z.array(StatusSchema),
  nextCursor: import_zod9.z.string().optional(),
  hasMore: import_zod9.z.boolean()
});
var CreateStatusResponseSchema = import_zod9.z.object({
  status: StatusSchema
});
var GetStatusCommentsResponseSchema = import_zod9.z.object({
  comments: import_zod9.z.array(import_zod9.z.any()),
  total: import_zod9.z.number()
});
var CreateStatusCommentResponseSchema = import_zod9.z.object({
  comment: import_zod9.z.any()
});
var ResponseSchemas = {
  "GET /workspaces": GetWorkspacesResponseSchema,
  "GET /workspaces/:id": GetWorkspaceResponseSchema,
  "POST /workspaces": CreateWorkspaceResponseSchema,
  "GET /conversations": GetConversationsResponseSchema,
  "GET /conversations/:id": GetConversationResponseSchema,
  "POST /conversations": CreateConversationResponseSchema,
  "GET /conversations/:id/messages": GetMessagesResponseSchema,
  "POST /conversations/:id/messages": SendMessageResponseSchema,
  "GET /users": SearchUsersResponseSchema,
  "GET /groups": GetGroupsResponseSchema,
  "GET /groups/:id": GetGroupResponseSchema,
  "POST /groups": CreateGroupResponseSchema,
  "GET /saved": GetSavedMessagesResponseSchema,
  "GET /statuses": GetStatusFeedResponseSchema,
  "POST /statuses": CreateStatusResponseSchema,
  "GET /statuses/:id/comments": GetStatusCommentsResponseSchema,
  "POST /statuses/:id/comments": CreateStatusCommentResponseSchema
};
function validateResponse(endpoint, response) {
  const schema = ResponseSchemas[endpoint];
  if (!schema) {
    console.warn(`[API Contract] No schema defined for endpoint: ${endpoint}`);
    return response;
  }
  const result = schema.safeParse(response);
  if (!result.success) {
    console.error(`[API Contract Violation] ${endpoint}`);
    console.error("Expected:", schema.description || "See ResponseSchemas");
    console.error("Received:", JSON.stringify(response, null, 2));
    console.error("Errors:", result.error.format());
    if (process.env.NODE_ENV === "development") {
      throw new Error(`API Contract Violation: ${endpoint} - ${result.error.message}`);
    }
  }
  return response;
}
function withValidation(endpoint, fetcher) {
  return async () => {
    const response = await fetcher();
    return validateResponse(endpoint, response);
  };
}

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

// src/utils/slugify.ts
function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}

// src/utils/date.ts
function formatRelativeTime(date) {
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1e3);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
  if (diffHour < 24) return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`;
  if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`;
  if (diffWeek < 4) return `${diffWeek} ${diffWeek === 1 ? "week" : "weeks"} ago`;
  if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? "month" : "months"} ago`;
  return `${diffYear} ${diffYear === 1 ? "year" : "years"} ago`;
}
function formatShortDate(date) {
  const now = /* @__PURE__ */ new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const options = {
    month: "short",
    day: "numeric",
    ...isCurrentYear ? {} : { year: "numeric" }
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
function formatFullDateTime(date) {
  const dateOptions = {
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  };
  const datePart = new Intl.DateTimeFormat("en-US", dateOptions).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
  return `${datePart} at ${timePart}`;
}
function formatMessageTimestamp(date) {
  const now = /* @__PURE__ */ new Date();
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  if (isToday) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  }
  return formatShortDate(date);
}

// src/utils/text.ts
function truncate(text, maxLength, ellipsis = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}
function truncateWords(text, maxLength, ellipsis = "...") {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - ellipsis.length);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + ellipsis;
  }
  return truncated + ellipsis;
}
function extractMentions(text) {
  const mentionPattern = /@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)/g;
  const matches = text.matchAll(mentionPattern);
  return Array.from(matches, (m) => m[1]).filter((m) => m !== void 0);
}
function escapeHTML(text) {
  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}
function countWords(text) {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationSchema,
  CreateConversationResponseSchema,
  CreateGroupResponseSchema,
  CreateStatusCommentResponseSchema,
  CreateStatusResponseSchema,
  CreateWorkspaceResponseSchema,
  ERROR_CODES,
  GetConversationResponseSchema,
  GetConversationsResponseSchema,
  GetGroupResponseSchema,
  GetGroupsResponseSchema,
  GetMessagesResponseSchema,
  GetSavedMessagesResponseSchema,
  GetStatusCommentsResponseSchema,
  GetStatusFeedResponseSchema,
  GetWorkspaceResponseSchema,
  GetWorkspacesResponseSchema,
  GroupSchema,
  MessageSchema,
  OnboardingProgressSchema,
  OnboardingStatusSchema,
  OnboardingStep,
  OnboardingStepSchema,
  PLAN_LIMITS,
  ResponseSchemas,
  SOCKET_EVENTS,
  SearchUsersResponseSchema,
  SendMessageResponseSchema,
  StatusSchema,
  TermsAcceptanceRequestSchema,
  UserSchema,
  WorkspaceSchema,
  channelMemberSchema,
  channelSchema,
  conversationMemberSchema,
  conversationSchema,
  countWords,
  createCodeBlockValidator,
  createMessageContentValidator,
  dmConversationSchema,
  escapeHTML,
  extractMentions,
  formatFullDateTime,
  formatMessageTimestamp,
  formatRelativeTime,
  formatShortDate,
  groupChatInviteSchema,
  groupChatMemberSchema,
  groupChatPermissionsSchema,
  groupChatSettingsSchema,
  groupConversationSchema,
  messageAttachmentSchema,
  messageDraftSchema,
  messageSchema,
  notificationSchema,
  notificationSettingsSchema,
  pinnedMessageSchema,
  prRoomConversationSchema,
  reactionGroupSchema,
  reactionSchema,
  savedMessageSchema,
  slugify,
  truncate,
  truncateWords,
  userPresenceSchema,
  userSchema,
  usernameSchema,
  validateResponse,
  withValidation,
  workspaceChannelConversationSchema,
  workspaceMemberSchema,
  workspaceSchema
});
