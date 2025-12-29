import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  githubId: z.number().int().positive(),
  username: z.string().min(1).max(39), // GitHub username max length
  email: z.string().email().nullable(),
  avatar: z.string().url().nullable(),
  displayName: z.string().max(100).nullable(),
  bio: z.string().max(500).nullable(),
  plan: z.enum(['free', 'pro', 'team']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userPresenceSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(['online', 'away', 'dnd', 'invisible']),
  lastSeenAt: z.date(),
  customStatus: z.string().max(100).optional(),
});

export const usernameSchema = z
  .string()
  .min(1)
  .max(39)
  .regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/, {
    message: 'Username must start and end with alphanumeric characters, and can only contain hyphens in between',
  });
