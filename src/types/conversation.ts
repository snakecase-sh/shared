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
