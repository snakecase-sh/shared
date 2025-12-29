export interface Workspace {
  id: string;
  githubOrgId: number;
  name: string;
  slug: string;
  avatar: string | null;
  ownerId: string;
  plan: 'free' | 'pro' | 'team';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}
