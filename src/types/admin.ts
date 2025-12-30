// Admin-related types

export interface AdminUser {
  id: string;
  username: string;
  email: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  twoFactorEnabled: boolean;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface Admin2FARequest {
  loginToken: string;
  token: string; // 6-digit TOTP or backup code
}

export interface AdminLoginResponse {
  requiresTwoFactor: boolean;
  loginToken?: string; // Temporary token for 2FA completion
  session?: {
    id: string;
    token: string;
    expiresAt: Date;
  };
  user?: AdminUser;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface Enable2FAResponse {
  secret: string; // Encrypted secret (already encrypted)
  qrCodeDataUrl: string;
  backupCodes: string[]; // Plain backup codes shown once
}

export interface Disable2FARequest {
  password: string;
}

export interface RegenerateBackupCodesRequest {
  password: string;
}

export interface RegenerateBackupCodesResponse {
  backupCodes: string[];
}

// Moderation types
export interface BanUserRequest {
  userId: string;
  reason?: string;
  duration?: number; // Duration in hours, undefined = permanent
}

export interface JailUserRequest {
  userId: string;
  duration: number; // Duration in hours
  reason?: string;
}

export interface WarnUserRequest {
  userId: string;
  reason?: string;
}

export interface ModerationAction {
  id: string;
  type: 'ban' | 'jail' | 'warn' | 'unban' | 'unjail';
  userId: string;
  adminId: string;
  reason: string | null;
  duration: number | null; // Duration in hours
  expiresAt: Date | null;
  createdAt: Date;
  revokedAt: Date | null;
  revokedById: string | null;
}

export interface ModerationStatus {
  userId: string;
  isBanned: boolean;
  isJailed: boolean;
  banExpiresAt: Date | null;
  jailExpiresAt: Date | null;
  warningCount: number;
  lastWarningAt: Date | null;
}
