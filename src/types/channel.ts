export interface Channel {
  id: string;
  workspaceId: string;
  name: string;
  topic: string | null;
  isPrivate: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}

export interface ChannelMember {
  id: string;
  channelId: string;
  userId: string;
  role: 'admin' | 'member';
  joinedAt: Date;
}
