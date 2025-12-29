import { z } from 'zod';

export const reactionSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  userId: z.string().uuid(),
  emoji: z.string().min(1).max(50), // Emoji or emoji shortcode
  createdAt: z.date(),
});

export const reactionGroupSchema = z.object({
  emoji: z.string().min(1).max(50),
  count: z.number().int().positive(),
  userIds: z.array(z.string().uuid()),
  hasReacted: z.boolean(),
});
