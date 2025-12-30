import { z } from 'zod';

const baseConversationSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['dm', 'group', 'workspace_channel', 'pr_room']),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastMessageAt: z.date().nullable(),
});

export const dmConversationSchema = baseConversationSchema.extend({
  type: z.literal('dm'),
  participantIds: z.tuple([z.string().uuid(), z.string().uuid()]),
});

export const groupConversationSchema = baseConversationSchema.extend({
  type: z.literal('group'),
  name: z.string().min(1).max(100),
  avatar: z.string().url().nullable(),
  ownerId: z.string().uuid(),
  participantIds: z.array(z.string().uuid()).min(1),
});

export const workspaceChannelConversationSchema = baseConversationSchema.extend({
  type: z.literal('workspace_channel'),
  channelId: z.string().uuid(),
  workspaceId: z.string().uuid(),
});

export const prRoomConversationSchema = baseConversationSchema.extend({
  type: z.literal('pr_room'),
  githubRepoId: z.number().int().positive(),
  githubPRNumber: z.number().int().positive(),
  prTitle: z.string().min(1).max(256),
  prUrl: z.string().url(),
  participantIds: z.array(z.string().uuid()).min(1),
});

export const conversationSchema = z.discriminatedUnion('type', [
  dmConversationSchema,
  groupConversationSchema,
  workspaceChannelConversationSchema,
  prRoomConversationSchema,
]);

export const conversationMemberSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  userId: z.string().uuid(),
  joinedAt: z.date(),
  lastReadSeq: z.number().int().nonnegative(),
  mutedUntil: z.date().nullable(),
});

export const groupChatSettingsSchema = z.object({
  conversationId: z.string().uuid(),
  allowMemberInvites: z.boolean(),
  onlyAdminCanPost: z.boolean(),
  onlyAdminCanPin: z.boolean(),
  allowReactions: z.boolean(),
  allowThreads: z.boolean(),
  allowFileSharing: z.boolean(),
  maxMembers: z.number().int().positive().max(1000),
  description: z.string().max(500).nullable(),
  isPublic: z.boolean(),
  joinLink: z.string().nullable(),
  joinLinkExpiresAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const groupChatPermissionsSchema = z.object({
  canInviteMembers: z.boolean(),
  canRemoveMembers: z.boolean(),
  canPinMessages: z.boolean(),
  canEditSettings: z.boolean(),
  canManageRoles: z.boolean(),
  canDeleteMessages: z.boolean(),
});

export const groupChatMemberSchema = conversationMemberSchema.extend({
  role: z.enum(['owner', 'admin', 'member']),
  permissions: groupChatPermissionsSchema,
  nickname: z.string().min(1).max(50).nullable(),
  invitedById: z.string().uuid().nullable(),
  leftAt: z.date().nullable(),
});

export const groupChatInviteSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  invitedUserId: z.string().uuid(),
  invitedById: z.string().uuid(),
  status: z.enum(['pending', 'accepted', 'declined', 'expired']),
  expiresAt: z.date(),
  createdAt: z.date(),
  respondedAt: z.date().nullable(),
});
