/**
 * API Response Contracts
 *
 * These Zod schemas define the EXACT shape of API responses.
 * Both frontend and backend MUST conform to these contracts.
 *
 * RULE: When a backend endpoint changes, update the schema here FIRST.
 * RULE: Frontend should validate responses against these schemas in dev mode.
 */

import { z } from 'zod';

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const UserSchema = z.object({
  id: z.string(),
  githubId: z.number().optional(),
  githubUsername: z.string(),
  avatarUrl: z.string().nullable(),
  displayName: z.string().nullable(),
  email: z.string().nullable().optional(),
  plan: z.enum(['free', 'pro']).optional(),
  isAdmin: z.boolean().optional(),
  onboardingCompleted: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const WorkspaceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  githubOrgId: z.number().nullable().optional(),
  githubOrgLogin: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const ConversationSchema = z.object({
  id: z.string(),
  workspaceId: z.string().optional(),
  type: z.enum(['channel', 'dm', 'group', 'DM', 'GROUP', 'CHANNEL']),
  name: z.string().nullable(),
  topic: z.string().nullable().optional(),
  isPrivate: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  lastMessageAt: z.string().nullable().optional(),
  unreadCount: z.number().optional(),
  members: z.array(z.any()).optional(),
});

export const MessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  userId: z.string(),
  content: z.string(),
  type: z.enum(['text', 'code', 'system']).optional(),
  metadata: z.record(z.any()).nullable().optional(),
  user: UserSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  editedAt: z.string().nullable().optional(),
  reactions: z.array(z.any()).optional(),
  threadCount: z.number().optional(),
});

export const StatusSchema = z.object({
  id: z.string(),
  userId: z.string(),
  content: z.string(),
  user: UserSchema,
  likesCount: z.number(),
  commentsCount: z.number(),
  isLiked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().nullable().optional(),
  members: z.array(UserSchema).optional(),
  lastMessage: MessageSchema.nullable().optional(),
  lastReadSeq: z.number().optional(),
  unreadCount: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

// ============================================================================
// API REQUEST SCHEMAS
// These are the EXACT shapes expected by backend endpoints
// ============================================================================

/**
 * POST /workspaces - Create workspace
 */
export const CreateWorkspaceRequestSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  }),
  githubOrgId: z.string().optional(),
});

/**
 * POST /conversations - Create conversation
 */
export const CreateConversationRequestSchema = z.object({
  type: z.enum(['DM', 'GROUP', 'CHANNEL', 'dm', 'group', 'channel']),
  userIds: z.array(z.string()).min(1).optional(),
  memberIds: z.array(z.string()).min(1).optional(), // Alias for userIds
  workspaceId: z.string().optional(), // Ignored by backend
}).refine((data) => data.userIds || data.memberIds, {
  message: 'Either userIds or memberIds must be provided',
});

/**
 * POST /conversations/:id/messages - Send message
 */
export const SendMessageRequestSchema = z.object({
  content: z.string().min(1).max(10000),
  type: z.enum(['text', 'code']).optional(),
  replyToId: z.string().optional(),
  mentions: z.array(z.string()).optional(),
});

/**
 * POST /conversations/:id/read - Mark as read
 */
export const MarkAsReadRequestSchema = z.object({
  seq: z.number().int().min(0).optional(), // Optional - if not provided, marks all as read
});

/**
 * POST /statuses - Create status
 */
export const CreateStatusRequestSchema = z.object({
  content: z.string().min(1).max(500),
  workspaceId: z.string().optional(),
});

/**
 * POST /groups - Create group
 */
export const CreateGroupRequestSchema = z.object({
  name: z.string().min(1).max(100),
  userIds: z.array(z.string()).min(1),
});

// ============================================================================
// API RESPONSE SCHEMAS
// These are the EXACT shapes returned by backend endpoints
// ============================================================================

/**
 * GET /workspaces
 * Backend returns: { workspaces: Workspace[] }
 */
export const GetWorkspacesResponseSchema = z.object({
  workspaces: z.array(WorkspaceSchema),
});

/**
 * GET /workspaces/:id
 * Backend returns: { workspace: Workspace }
 */
export const GetWorkspaceResponseSchema = z.object({
  workspace: WorkspaceSchema,
});

/**
 * POST /workspaces
 * Backend returns: { workspace: Workspace }
 */
export const CreateWorkspaceResponseSchema = z.object({
  workspace: WorkspaceSchema,
});

/**
 * GET /conversations
 * Backend returns: { conversations: Conversation[] }
 */
export const GetConversationsResponseSchema = z.object({
  conversations: z.array(ConversationSchema),
});

/**
 * GET /conversations/:id
 * Backend returns: { conversation: Conversation }
 */
export const GetConversationResponseSchema = z.object({
  conversation: ConversationSchema,
});

/**
 * POST /conversations
 * Backend returns: { id: string, conversation: Conversation }
 */
export const CreateConversationResponseSchema = z.object({
  id: z.string(),
  conversation: ConversationSchema,
});

/**
 * GET /conversations/:id/messages
 * Backend returns: { messages: Message[], hasMore: boolean }
 */
export const GetMessagesResponseSchema = z.object({
  messages: z.array(MessageSchema),
  hasMore: z.boolean(),
});

/**
 * POST /conversations/:id/messages
 * Backend returns: { message: Message }
 */
export const SendMessageResponseSchema = z.object({
  message: MessageSchema,
});

/**
 * GET /users?q=query
 * Backend returns: { users: User[] }
 */
export const SearchUsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

/**
 * GET /groups
 * Backend returns: { groups: Group[] }
 */
export const GetGroupsResponseSchema = z.object({
  groups: z.array(GroupSchema),
});

/**
 * GET /groups/:id
 * Backend returns: { group: Group }
 */
export const GetGroupResponseSchema = z.object({
  group: GroupSchema,
});

/**
 * POST /groups
 * Backend returns: { group: Group }
 */
export const CreateGroupResponseSchema = z.object({
  group: GroupSchema,
});

/**
 * GET /saved
 * Backend returns: { savedMessages: SavedMessage[] }
 */
export const GetSavedMessagesResponseSchema = z.object({
  savedMessages: z.array(z.any()),
});

/**
 * GET /statuses
 * Backend returns: { statuses: Status[], nextCursor?: string, hasMore: boolean }
 */
export const GetStatusFeedResponseSchema = z.object({
  statuses: z.array(StatusSchema),
  nextCursor: z.string().optional(),
  hasMore: z.boolean(),
});

/**
 * POST /statuses
 * Backend returns: { status: Status }
 */
export const CreateStatusResponseSchema = z.object({
  status: StatusSchema,
});

/**
 * GET /statuses/:id/comments
 * Backend returns: { comments: Comment[], total: number }
 */
export const GetStatusCommentsResponseSchema = z.object({
  comments: z.array(z.any()),
  total: z.number(),
});

/**
 * POST /statuses/:id/comments
 * Backend returns: { comment: Comment }
 */
export const CreateStatusCommentResponseSchema = z.object({
  comment: z.any(),
});

// ============================================================================
// RESPONSE VALIDATOR
// Use this in development to catch contract mismatches early
// ============================================================================

export type ApiEndpoint =
  | 'GET /workspaces'
  | 'GET /workspaces/:id'
  | 'POST /workspaces'
  | 'GET /conversations'
  | 'GET /conversations/:id'
  | 'POST /conversations'
  | 'GET /conversations/:id/messages'
  | 'POST /conversations/:id/messages'
  | 'GET /users'
  | 'GET /groups'
  | 'GET /groups/:id'
  | 'POST /groups'
  | 'GET /saved'
  | 'GET /statuses'
  | 'POST /statuses'
  | 'GET /statuses/:id/comments'
  | 'POST /statuses/:id/comments';

export const ResponseSchemas: Record<ApiEndpoint, z.ZodSchema> = {
  'GET /workspaces': GetWorkspacesResponseSchema,
  'GET /workspaces/:id': GetWorkspaceResponseSchema,
  'POST /workspaces': CreateWorkspaceResponseSchema,
  'GET /conversations': GetConversationsResponseSchema,
  'GET /conversations/:id': GetConversationResponseSchema,
  'POST /conversations': CreateConversationResponseSchema,
  'GET /conversations/:id/messages': GetMessagesResponseSchema,
  'POST /conversations/:id/messages': SendMessageResponseSchema,
  'GET /users': SearchUsersResponseSchema,
  'GET /groups': GetGroupsResponseSchema,
  'GET /groups/:id': GetGroupResponseSchema,
  'POST /groups': CreateGroupResponseSchema,
  'GET /saved': GetSavedMessagesResponseSchema,
  'GET /statuses': GetStatusFeedResponseSchema,
  'POST /statuses': CreateStatusResponseSchema,
  'GET /statuses/:id/comments': GetStatusCommentsResponseSchema,
  'POST /statuses/:id/comments': CreateStatusCommentResponseSchema,
};

/**
 * Validates an API response against the expected schema.
 * Use in development to catch frontend/backend contract mismatches.
 *
 * @param endpoint - The API endpoint being called
 * @param response - The response data from the API
 * @returns The validated response (throws in dev if invalid)
 */
export function validateResponse<T>(endpoint: ApiEndpoint, response: unknown): T {
  const schema = ResponseSchemas[endpoint];
  if (!schema) {
    console.warn(`[API Contract] No schema defined for endpoint: ${endpoint}`);
    return response as T;
  }

  const result = schema.safeParse(response);
  if (!result.success) {
    console.error(`[API Contract Violation] ${endpoint}`);
    console.error('Expected:', schema.description || 'See ResponseSchemas');
    console.error('Received:', JSON.stringify(response, null, 2));
    console.error('Errors:', result.error.format());

    // In development, throw to catch issues early
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`API Contract Violation: ${endpoint} - ${result.error.message}`);
    }
  }

  return response as T;
}

/**
 * Creates a wrapper function that validates responses in development.
 * Production: passthrough (no validation overhead)
 * Development: validates and logs/throws on mismatch
 */
export function withValidation<T>(
  endpoint: ApiEndpoint,
  fetcher: () => Promise<T>
): () => Promise<T> {
  return async () => {
    const response = await fetcher();
    return validateResponse<T>(endpoint, response);
  };
}
