import { z } from 'zod';

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  githubOrgId: z.number().int().positive(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  }),
  avatar: z.string().url().nullable(),
  ownerId: z.string().uuid(),
  plan: z.enum(['free', 'pro', 'team']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const workspaceMemberSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['owner', 'admin', 'member']),
  joinedAt: z.date(),
});
