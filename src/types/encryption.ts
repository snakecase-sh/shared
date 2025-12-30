// Encryption-related types

export interface EncryptedMessage {
  encrypted: string; // Encrypted content as hex string (includes auth tag)
  iv: string; // Initialization vector as hex string
}

export interface EncryptedField {
  value: string; // Format: salt:iv:encrypted+authTag
}

export interface TwoFactorSetup {
  secret: string; // Encrypted secret to store in DB
  qrCodeDataUrl: string; // QR code as data URL for user to scan
  backupCodes: string[]; // Plain backup codes (shown once to user)
  encryptedBackupCodes: string[]; // Encrypted backup codes to store in DB
}

export interface EncryptionConfig {
  algorithm: 'aes-256-gcm';
  keyLength: 32; // bytes
  ivLength: 16; // bytes
  authTagLength: 16; // bytes
  saltLength: 32; // bytes
}

export interface EncryptionStatus {
  isConfigured: boolean;
  algorithm?: string;
}
