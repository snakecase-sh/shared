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
import { z } from "zod";
var userSchema = z.object({
  id: z.string().uuid(),
  githubId: z.number().int().positive(),
  username: z.string().min(1).max(39),
  // GitHub username max length
  email: z.string().email().nullable(),
  avatar: z.string().url().nullable(),
  displayName: z.string().max(100).nullable(),
  bio: z.string().max(500).nullable(),
  plan: z.enum(["free", "pro", "team"]),
  createdAt: z.date(),
  updatedAt: z.date()
});
var userPresenceSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(["online", "away", "dnd", "invisible"]),
  lastSeenAt: z.date(),
  customStatus: z.string().max(100).optional()
});
var usernameSchema = z.string().min(1).max(39).regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/, {
  message: "Username must start and end with alphanumeric characters, and can only contain hyphens in between"
});

// src/validators/workspace.ts
import { z as z2 } from "zod";
var workspaceSchema = z2.object({
  id: z2.string().uuid(),
  githubOrgId: z2.number().int().positive(),
  name: z2.string().min(1).max(100),
  slug: z2.string().min(1).max(100).regex(/^[a-z0-9-]+$/, {
    message: "Slug must contain only lowercase letters, numbers, and hyphens"
  }),
  avatar: z2.string().url().nullable(),
  ownerId: z2.string().uuid(),
  plan: z2.enum(["free", "pro", "team"]),
  createdAt: z2.date(),
  updatedAt: z2.date()
});
var workspaceMemberSchema = z2.object({
  id: z2.string().uuid(),
  workspaceId: z2.string().uuid(),
  userId: z2.string().uuid(),
  role: z2.enum(["owner", "admin", "member"]),
  joinedAt: z2.date()
});

// src/validators/channel.ts
import { z as z3 } from "zod";
var channelSchema = z3.object({
  id: z3.string().uuid(),
  workspaceId: z3.string().uuid(),
  name: z3.string().min(1).max(80).regex(/^[a-z0-9-_]+$/, {
    message: "Channel name must contain only lowercase letters, numbers, hyphens, and underscores"
  }),
  topic: z3.string().max(250).nullable(),
  isPrivate: z3.boolean(),
  createdById: z3.string().uuid(),
  createdAt: z3.date(),
  updatedAt: z3.date(),
  archivedAt: z3.date().nullable()
});
var channelMemberSchema = z3.object({
  id: z3.string().uuid(),
  channelId: z3.string().uuid(),
  userId: z3.string().uuid(),
  role: z3.enum(["admin", "member"]),
  joinedAt: z3.date()
});

// src/validators/conversation.ts
import { z as z4 } from "zod";
var baseConversationSchema = z4.object({
  id: z4.string().uuid(),
  type: z4.enum(["dm", "group", "workspace_channel", "pr_room"]),
  createdAt: z4.date(),
  updatedAt: z4.date(),
  lastMessageAt: z4.date().nullable()
});
var dmConversationSchema = baseConversationSchema.extend({
  type: z4.literal("dm"),
  participantIds: z4.tuple([z4.string().uuid(), z4.string().uuid()])
});
var groupConversationSchema = baseConversationSchema.extend({
  type: z4.literal("group"),
  name: z4.string().min(1).max(100),
  avatar: z4.string().url().nullable(),
  ownerId: z4.string().uuid(),
  participantIds: z4.array(z4.string().uuid()).min(1)
});
var workspaceChannelConversationSchema = baseConversationSchema.extend({
  type: z4.literal("workspace_channel"),
  channelId: z4.string().uuid(),
  workspaceId: z4.string().uuid()
});
var prRoomConversationSchema = baseConversationSchema.extend({
  type: z4.literal("pr_room"),
  githubRepoId: z4.number().int().positive(),
  githubPRNumber: z4.number().int().positive(),
  prTitle: z4.string().min(1).max(256),
  prUrl: z4.string().url(),
  participantIds: z4.array(z4.string().uuid()).min(1)
});
var conversationSchema = z4.discriminatedUnion("type", [
  dmConversationSchema,
  groupConversationSchema,
  workspaceChannelConversationSchema,
  prRoomConversationSchema
]);
var conversationMemberSchema = z4.object({
  id: z4.string().uuid(),
  conversationId: z4.string().uuid(),
  userId: z4.string().uuid(),
  joinedAt: z4.date(),
  lastReadSeq: z4.number().int().nonnegative(),
  mutedUntil: z4.date().nullable()
});
var groupChatSettingsSchema = z4.object({
  conversationId: z4.string().uuid(),
  allowMemberInvites: z4.boolean(),
  onlyAdminCanPost: z4.boolean(),
  onlyAdminCanPin: z4.boolean(),
  allowReactions: z4.boolean(),
  allowThreads: z4.boolean(),
  allowFileSharing: z4.boolean(),
  maxMembers: z4.number().int().positive().max(1e3),
  description: z4.string().max(500).nullable(),
  isPublic: z4.boolean(),
  joinLink: z4.string().nullable(),
  joinLinkExpiresAt: z4.date().nullable(),
  createdAt: z4.date(),
  updatedAt: z4.date()
});
var groupChatPermissionsSchema = z4.object({
  canInviteMembers: z4.boolean(),
  canRemoveMembers: z4.boolean(),
  canPinMessages: z4.boolean(),
  canEditSettings: z4.boolean(),
  canManageRoles: z4.boolean(),
  canDeleteMessages: z4.boolean()
});
var groupChatMemberSchema = conversationMemberSchema.extend({
  role: z4.enum(["owner", "admin", "member"]),
  permissions: groupChatPermissionsSchema,
  nickname: z4.string().min(1).max(50).nullable(),
  invitedById: z4.string().uuid().nullable(),
  leftAt: z4.date().nullable()
});
var groupChatInviteSchema = z4.object({
  id: z4.string().uuid(),
  conversationId: z4.string().uuid(),
  invitedUserId: z4.string().uuid(),
  invitedById: z4.string().uuid(),
  status: z4.enum(["pending", "accepted", "declined", "expired"]),
  expiresAt: z4.date(),
  createdAt: z4.date(),
  respondedAt: z4.date().nullable()
});

// src/validators/message.ts
import { z as z5 } from "zod";
var messageSchema = z5.object({
  id: z5.string().uuid(),
  conversationId: z5.string().uuid(),
  authorId: z5.string().uuid(),
  content: z5.string(),
  seq: z5.number().int().positive(),
  createdAt: z5.date(),
  editedAt: z5.date().nullable(),
  deletedAt: z5.date().nullable(),
  parentMessageId: z5.string().uuid().nullable(),
  attachmentIds: z5.array(z5.string().uuid()),
  metadata: z5.record(z5.unknown())
});
var messageAttachmentSchema = z5.object({
  id: z5.string().uuid(),
  messageId: z5.string().uuid(),
  filename: z5.string().min(1).max(255),
  mimeType: z5.string().min(1).max(127),
  size: z5.number().int().positive(),
  url: z5.string().url(),
  thumbnailUrl: z5.string().url().nullable(),
  uploadedById: z5.string().uuid(),
  createdAt: z5.date()
});
var messageDraftSchema = z5.object({
  conversationId: z5.string().uuid(),
  userId: z5.string().uuid(),
  content: z5.string(),
  updatedAt: z5.date()
});
var createMessageContentValidator = (plan) => {
  const limits = {
    free: { text: 4e3, code: 3e4 },
    pro: { text: 2e4, code: 2e5 },
    team: { text: 2e4, code: 2e5 }
  };
  const limit = limits[plan];
  return z5.string().max(limit.text, {
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
  return z5.string().max(limit, {
    message: `Code block exceeds ${limit} character limit for ${plan} plan`
  });
};
var savedMessageSchema = z5.object({
  id: z5.string().uuid(),
  userId: z5.string().uuid(),
  messageId: z5.string().uuid(),
  conversationId: z5.string().uuid(),
  savedAt: z5.date(),
  note: z5.string().max(500).nullable(),
  tags: z5.array(z5.string().min(1).max(50)),
  metadata: z5.record(z5.unknown())
});
var pinnedMessageSchema = z5.object({
  id: z5.string().uuid(),
  messageId: z5.string().uuid(),
  conversationId: z5.string().uuid(),
  pinnedById: z5.string().uuid(),
  pinnedAt: z5.date(),
  reason: z5.string().max(200).nullable(),
  position: z5.number().int().nonnegative()
});

// src/validators/reaction.ts
import { z as z6 } from "zod";
var reactionSchema = z6.object({
  id: z6.string().uuid(),
  messageId: z6.string().uuid(),
  userId: z6.string().uuid(),
  emoji: z6.string().min(1).max(50),
  // Emoji or emoji shortcode
  createdAt: z6.date()
});
var reactionGroupSchema = z6.object({
  emoji: z6.string().min(1).max(50),
  count: z6.number().int().positive(),
  userIds: z6.array(z6.string().uuid()),
  hasReacted: z6.boolean()
});

// src/validators/notification.ts
import { z as z7 } from "zod";
var notificationSchema = z7.object({
  id: z7.string().uuid(),
  userId: z7.string().uuid(),
  type: z7.enum(["message", "mention", "reaction", "dm_request", "channel_invite", "workspace_invite"]),
  title: z7.string().min(1).max(200),
  body: z7.string().min(1).max(500),
  avatarUrl: z7.string().url().nullable(),
  actionUrl: z7.string().url().nullable(),
  metadata: z7.record(z7.unknown()),
  readAt: z7.date().nullable(),
  createdAt: z7.date()
});
var notificationSettingsSchema = z7.object({
  userId: z7.string().uuid(),
  emailNotifications: z7.boolean(),
  pushNotifications: z7.boolean(),
  desktopNotifications: z7.boolean(),
  notifyOnMentions: z7.boolean(),
  notifyOnDMs: z7.boolean(),
  notifyOnReactions: z7.boolean(),
  mutedConversationIds: z7.array(z7.string().uuid()),
  updatedAt: z7.date()
});

// src/validators/onboarding.ts
import { z as z8 } from "zod";
var OnboardingStepSchema = z8.enum([
  "terms_acceptance",
  "profile_setup",
  "workspace_creation",
  "channel_creation",
  "invite_team",
  "completed"
]);
var OnboardingStatusSchema = z8.object({
  userId: z8.string(),
  currentStep: OnboardingStepSchema,
  completedSteps: z8.array(OnboardingStepSchema),
  termsAcceptedAt: z8.date().nullable(),
  profileCompletedAt: z8.date().nullable(),
  workspaceCreatedAt: z8.date().nullable(),
  channelCreatedAt: z8.date().nullable(),
  teamInvitedAt: z8.date().nullable(),
  completedAt: z8.date().nullable(),
  skippedSteps: z8.array(OnboardingStepSchema),
  metadata: z8.record(z8.unknown()),
  createdAt: z8.date(),
  updatedAt: z8.date()
});
var TermsAcceptanceRequestSchema = z8.object({
  userId: z8.string(),
  termsVersion: z8.string(),
  privacyPolicyVersion: z8.string(),
  acceptedAt: z8.date(),
  ipAddress: z8.string().nullable(),
  userAgent: z8.string().nullable()
});
var OnboardingProgressSchema = z8.object({
  userId: z8.string(),
  totalSteps: z8.number(),
  completedSteps: z8.number(),
  currentStep: OnboardingStepSchema,
  percentageComplete: z8.number().min(0).max(100),
  isComplete: z8.boolean()
});

// src/validators/api-responses.ts
import { z as z9 } from "zod";
var UserSchema = z9.object({
  id: z9.string(),
  githubId: z9.number().optional(),
  githubUsername: z9.string(),
  avatarUrl: z9.string().nullable(),
  displayName: z9.string().nullable(),
  email: z9.string().nullable().optional(),
  plan: z9.enum(["free", "pro"]).optional(),
  isAdmin: z9.boolean().optional(),
  onboardingCompleted: z9.boolean().optional(),
  createdAt: z9.string(),
  updatedAt: z9.string().optional()
});
var WorkspaceSchema = z9.object({
  id: z9.string(),
  slug: z9.string(),
  name: z9.string(),
  githubOrgId: z9.number().nullable().optional(),
  githubOrgLogin: z9.string().nullable().optional(),
  createdAt: z9.string(),
  updatedAt: z9.string().optional()
});
var ConversationSchema = z9.object({
  id: z9.string(),
  workspaceId: z9.string().optional(),
  type: z9.enum(["channel", "dm", "group", "DM", "GROUP", "CHANNEL"]),
  name: z9.string().nullable(),
  topic: z9.string().nullable().optional(),
  isPrivate: z9.boolean().optional(),
  createdAt: z9.string(),
  updatedAt: z9.string().optional(),
  lastMessageAt: z9.string().nullable().optional(),
  unreadCount: z9.number().optional(),
  members: z9.array(z9.any()).optional()
});
var MessageSchema = z9.object({
  id: z9.string(),
  conversationId: z9.string(),
  userId: z9.string(),
  content: z9.string(),
  type: z9.enum(["text", "code", "system"]).optional(),
  metadata: z9.record(z9.any()).nullable().optional(),
  user: UserSchema.optional(),
  createdAt: z9.string(),
  updatedAt: z9.string().optional(),
  editedAt: z9.string().nullable().optional(),
  reactions: z9.array(z9.any()).optional(),
  threadCount: z9.number().optional()
});
var StatusSchema = z9.object({
  id: z9.string(),
  userId: z9.string(),
  content: z9.string(),
  user: UserSchema,
  likesCount: z9.number(),
  commentsCount: z9.number(),
  isLiked: z9.boolean(),
  createdAt: z9.string(),
  updatedAt: z9.string().optional()
});
var GroupSchema = z9.object({
  id: z9.string(),
  name: z9.string(),
  avatarUrl: z9.string().nullable().optional(),
  members: z9.array(UserSchema).optional(),
  lastMessage: MessageSchema.nullable().optional(),
  lastReadSeq: z9.number().optional(),
  unreadCount: z9.number().optional(),
  createdAt: z9.string(),
  updatedAt: z9.string().optional()
});
var CreateWorkspaceRequestSchema = z9.object({
  name: z9.string().min(1).max(100),
  slug: z9.string().min(1).max(50).regex(/^[a-z0-9-]+$/, {
    message: "Slug must contain only lowercase letters, numbers, and hyphens"
  }),
  githubOrgId: z9.string().optional()
});
var CreateConversationRequestSchema = z9.object({
  type: z9.enum(["DM", "GROUP", "CHANNEL", "dm", "group", "channel"]),
  userIds: z9.array(z9.string()).min(1).optional(),
  memberIds: z9.array(z9.string()).min(1).optional(),
  // Alias for userIds
  workspaceId: z9.string().optional()
  // Ignored by backend
}).refine((data) => data.userIds || data.memberIds, {
  message: "Either userIds or memberIds must be provided"
});
var SendMessageRequestSchema = z9.object({
  content: z9.string().min(1).max(1e4),
  type: z9.enum(["text", "code"]).optional(),
  replyToId: z9.string().optional(),
  mentions: z9.array(z9.string()).optional()
});
var MarkAsReadRequestSchema = z9.object({
  seq: z9.number().int().min(0).optional()
  // Optional - if not provided, marks all as read
});
var CreateStatusRequestSchema = z9.object({
  content: z9.string().min(1).max(500),
  workspaceId: z9.string().optional()
});
var CreateGroupRequestSchema = z9.object({
  name: z9.string().min(1).max(100),
  userIds: z9.array(z9.string()).min(1)
});
var GetWorkspacesResponseSchema = z9.object({
  workspaces: z9.array(WorkspaceSchema)
});
var GetWorkspaceResponseSchema = z9.object({
  workspace: WorkspaceSchema
});
var CreateWorkspaceResponseSchema = z9.object({
  workspace: WorkspaceSchema
});
var GetConversationsResponseSchema = z9.object({
  conversations: z9.array(ConversationSchema)
});
var GetConversationResponseSchema = z9.object({
  conversation: ConversationSchema
});
var CreateConversationResponseSchema = z9.object({
  id: z9.string(),
  conversation: ConversationSchema
});
var GetMessagesResponseSchema = z9.object({
  messages: z9.array(MessageSchema),
  hasMore: z9.boolean()
});
var SendMessageResponseSchema = z9.object({
  message: MessageSchema
});
var SearchUsersResponseSchema = z9.object({
  users: z9.array(UserSchema)
});
var GetGroupsResponseSchema = z9.object({
  groups: z9.array(GroupSchema)
});
var GetGroupResponseSchema = z9.object({
  group: GroupSchema
});
var CreateGroupResponseSchema = z9.object({
  group: GroupSchema
});
var GetSavedMessagesResponseSchema = z9.object({
  savedMessages: z9.array(z9.any())
});
var GetStatusFeedResponseSchema = z9.object({
  statuses: z9.array(StatusSchema),
  nextCursor: z9.string().optional(),
  hasMore: z9.boolean()
});
var CreateStatusResponseSchema = z9.object({
  status: StatusSchema
});
var GetStatusCommentsResponseSchema = z9.object({
  comments: z9.array(z9.any()),
  total: z9.number()
});
var CreateStatusCommentResponseSchema = z9.object({
  comment: z9.any()
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
export {
  ConversationSchema,
  CreateConversationRequestSchema,
  CreateConversationResponseSchema,
  CreateGroupRequestSchema,
  CreateGroupResponseSchema,
  CreateStatusCommentResponseSchema,
  CreateStatusRequestSchema,
  CreateStatusResponseSchema,
  CreateWorkspaceRequestSchema,
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
  MarkAsReadRequestSchema,
  MessageSchema,
  OnboardingProgressSchema,
  OnboardingStatusSchema,
  OnboardingStep,
  OnboardingStepSchema,
  PLAN_LIMITS,
  ResponseSchemas,
  SOCKET_EVENTS,
  SearchUsersResponseSchema,
  SendMessageRequestSchema,
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
};
