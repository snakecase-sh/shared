export interface User {
  id: string;
  githubId: number;
  username: string;
  email: string | null;
  avatar: string | null;
  displayName: string | null;
  bio: string | null;
  plan: 'free' | 'pro' | 'team';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPresence {
  userId: string;
  status: 'online' | 'away' | 'dnd' | 'invisible';
  lastSeenAt: Date;
  customStatus?: string;
}
