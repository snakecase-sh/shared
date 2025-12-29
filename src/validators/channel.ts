import { z } from 'zod';

export const channelSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(80).regex(/^[a-z0-9-_]+$/, {
    message: 'Channel name must contain only lowercase letters, numbers, hyphens, and underscores',
  }),
  topic: z.string().max(250).nullable(),
  isPrivate: z.boolean(),
  createdById: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  archivedAt: z.date().nullable(),
});

export const channelMemberSchema = z.object({
  id: z.string().uuid(),
  channelId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['admin', 'member']),
  joinedAt: z.date(),
});
