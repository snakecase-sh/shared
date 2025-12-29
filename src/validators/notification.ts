import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(['message', 'mention', 'reaction', 'dm_request', 'channel_invite', 'workspace_invite']),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(500),
  avatarUrl: z.string().url().nullable(),
  actionUrl: z.string().url().nullable(),
  metadata: z.record(z.unknown()),
  readAt: z.date().nullable(),
  createdAt: z.date(),
});

export const notificationSettingsSchema = z.object({
  userId: z.string().uuid(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  desktopNotifications: z.boolean(),
  notifyOnMentions: z.boolean(),
  notifyOnDMs: z.boolean(),
  notifyOnReactions: z.boolean(),
  mutedConversationIds: z.array(z.string().uuid()),
  updatedAt: z.date(),
});
