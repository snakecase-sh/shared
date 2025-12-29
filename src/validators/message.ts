import { z } from 'zod';

export const messageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string(),
  seq: z.number().int().positive(),
  createdAt: z.date(),
  editedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  parentMessageId: z.string().uuid().nullable(),
  attachmentIds: z.array(z.string().uuid()),
  metadata: z.record(z.unknown()),
});

export const messageAttachmentSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  filename: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(127),
  size: z.number().int().positive(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().nullable(),
  uploadedById: z.string().uuid(),
  createdAt: z.date(),
});

export const messageDraftSchema = z.object({
  conversationId: z.string().uuid(),
  userId: z.string().uuid(),
  content: z.string(),
  updatedAt: z.date(),
});

// Message content validators based on plan
export const createMessageContentValidator = (plan: 'free' | 'pro' | 'team') => {
  const limits = {
    free: { text: 4000, code: 30000 },
    pro: { text: 20000, code: 200000 },
    team: { text: 20000, code: 200000 },
  };

  const limit = limits[plan];

  return z.string().max(limit.text, {
    message: `Message content exceeds ${limit.text} character limit for ${plan} plan`,
  });
};

export const createCodeBlockValidator = (plan: 'free' | 'pro' | 'team') => {
  const limits = {
    free: 30000,
    pro: 200000,
    team: 200000,
  };

  const limit = limits[plan];

  return z.string().max(limit, {
    message: `Code block exceeds ${limit} character limit for ${plan} plan`,
  });
};
