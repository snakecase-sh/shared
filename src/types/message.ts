export interface Message {
  id: string;
  conversationId: string;
  authorId: string;
  content: string;
  seq: number; // Sequence number for ordering and deduplication
  createdAt: Date;
  editedAt: Date | null;
  deletedAt: Date | null;
  parentMessageId: string | null; // For threads
  attachmentIds: string[];
  metadata: Record<string, unknown>;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl: string | null;
  uploadedById: string;
  createdAt: Date;
}

export interface MessageDraft {
  conversationId: string;
  userId: string;
  content: string;
  updatedAt: Date;
}
