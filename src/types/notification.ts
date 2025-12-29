export type NotificationType =
  | 'message'
  | 'mention'
  | 'reaction'
  | 'dm_request'
  | 'channel_invite'
  | 'workspace_invite';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  avatarUrl: string | null;
  actionUrl: string | null;
  metadata: Record<string, unknown>;
  readAt: Date | null;
  createdAt: Date;
}

export interface NotificationSettings {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  notifyOnMentions: boolean;
  notifyOnDMs: boolean;
  notifyOnReactions: boolean;
  mutedConversationIds: string[];
  updatedAt: Date;
}
