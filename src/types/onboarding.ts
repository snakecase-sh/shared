export enum OnboardingStep {
  TERMS_ACCEPTANCE = 'terms_acceptance',
  PROFILE_SETUP = 'profile_setup',
  WORKSPACE_CREATION = 'workspace_creation',
  CHANNEL_CREATION = 'channel_creation',
  INVITE_TEAM = 'invite_team',
  COMPLETED = 'completed',
}

export interface OnboardingStatus {
  userId: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  termsAcceptedAt: Date | null;
  profileCompletedAt: Date | null;
  workspaceCreatedAt: Date | null;
  channelCreatedAt: Date | null;
  teamInvitedAt: Date | null;
  completedAt: Date | null;
  skippedSteps: OnboardingStep[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TermsAcceptanceRequest {
  userId: string;
  termsVersion: string;
  privacyPolicyVersion: string;
  acceptedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface OnboardingProgress {
  userId: string;
  totalSteps: number;
  completedSteps: number;
  currentStep: OnboardingStep;
  percentageComplete: number;
  isComplete: boolean;
}
