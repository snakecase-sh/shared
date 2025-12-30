import { z } from 'zod';

export const OnboardingStepSchema = z.enum([
  'terms_acceptance',
  'profile_setup',
  'workspace_creation',
  'channel_creation',
  'invite_team',
  'completed',
]);

export const OnboardingStatusSchema = z.object({
  userId: z.string(),
  currentStep: OnboardingStepSchema,
  completedSteps: z.array(OnboardingStepSchema),
  termsAcceptedAt: z.date().nullable(),
  profileCompletedAt: z.date().nullable(),
  workspaceCreatedAt: z.date().nullable(),
  channelCreatedAt: z.date().nullable(),
  teamInvitedAt: z.date().nullable(),
  completedAt: z.date().nullable(),
  skippedSteps: z.array(OnboardingStepSchema),
  metadata: z.record(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TermsAcceptanceRequestSchema = z.object({
  userId: z.string(),
  termsVersion: z.string(),
  privacyPolicyVersion: z.string(),
  acceptedAt: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
});

export const OnboardingProgressSchema = z.object({
  userId: z.string(),
  totalSteps: z.number(),
  completedSteps: z.number(),
  currentStep: OnboardingStepSchema,
  percentageComplete: z.number().min(0).max(100),
  isComplete: z.boolean(),
});
