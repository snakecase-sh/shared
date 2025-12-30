export type ConversationType = 'dm' | 'group' | 'workspace_channel' | 'pr_room';

export interface BaseConversation {
  id: string;
  type: ConversationType;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date | null;
}

export interface DMConversation extends BaseConversation {
  type: 'dm';
  participantIds: [string, string]; // Exactly 2 participants
}

export interface GroupConversation extends BaseConversation {
  type: 'group';
  name: string;
  avatar: string | null;
  ownerId: string;
  participantIds: string[];
}

export interface WorkspaceChannelConversation extends BaseConversation {
  type: 'workspace_channel';
  channelId: string;
  workspaceId: string;
}

export interface PRRoomConversation extends BaseConversation {
  type: 'pr_room';
  githubRepoId: number;
  githubPRNumber: number;
  prTitle: string;
  prUrl: string;
  participantIds: string[];
}

export type Conversation =
  | DMConversation
  | GroupConversation
  | WorkspaceChannelConversation
  | PRRoomConversation;

export interface ConversationMember {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: Date;
  lastReadSeq: number;
  mutedUntil: Date | null;
}

export interface GroupChatSettings {
  conversationId: string;
  allowMemberInvites: boolean;
  onlyAdminCanPost: boolean;
  onlyAdminCanPin: boolean;
  allowReactions: boolean;
  allowThreads: boolean;
  allowFileSharing: boolean;
  maxMembers: number;
  description: string | null;
  isPublic: boolean;
  joinLink: string | null;
  joinLinkExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupChatMember extends ConversationMember {
  role: 'owner' | 'admin' | 'member';
  permissions: GroupChatPermissions;
  nickname: string | null;
  invitedById: string | null;
  leftAt: Date | null;
}

export interface GroupChatPermissions {
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canPinMessages: boolean;
  canEditSettings: boolean;
  canManageRoles: boolean;
  canDeleteMessages: boolean;
}

export interface GroupChatInvite {
  id: string;
  conversationId: string;
  invitedUserId: string;
  invitedById: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expiresAt: Date;
  createdAt: Date;
  respondedAt: Date | null;
}
