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
