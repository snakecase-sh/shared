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

export {
  userSchema,
  userPresenceSchema,
  usernameSchema,
  workspaceSchema,
  workspaceMemberSchema,
  channelSchema,
  channelMemberSchema,
  dmConversationSchema,
  groupConversationSchema,
  workspaceChannelConversationSchema,
  prRoomConversationSchema,
  conversationSchema,
  conversationMemberSchema,
  messageSchema,
  messageAttachmentSchema,
  messageDraftSchema,
  createMessageContentValidator,
  createCodeBlockValidator,
  reactionSchema,
  reactionGroupSchema,
  notificationSchema,
  notificationSettingsSchema
};
