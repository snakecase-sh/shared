import { z } from 'zod';

declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    githubId: z.ZodNumber;
    username: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    avatar: z.ZodNullable<z.ZodString>;
    displayName: z.ZodNullable<z.ZodString>;
    bio: z.ZodNullable<z.ZodString>;
    plan: z.ZodEnum<["free", "pro", "team"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    githubId: number;
    username: string;
    email: string | null;
    avatar: string | null;
    displayName: string | null;
    bio: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    githubId: number;
    username: string;
    email: string | null;
    avatar: string | null;
    displayName: string | null;
    bio: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
}>;
declare const userPresenceSchema: z.ZodObject<{
    userId: z.ZodString;
    status: z.ZodEnum<["online", "away", "dnd", "invisible"]>;
    lastSeenAt: z.ZodDate;
    customStatus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "online" | "away" | "dnd" | "invisible";
    userId: string;
    lastSeenAt: Date;
    customStatus?: string | undefined;
}, {
    status: "online" | "away" | "dnd" | "invisible";
    userId: string;
    lastSeenAt: Date;
    customStatus?: string | undefined;
}>;
declare const usernameSchema: z.ZodString;

declare const workspaceSchema: z.ZodObject<{
    id: z.ZodString;
    githubOrgId: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    plan: z.ZodEnum<["free", "pro", "team"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
    githubOrgId: number;
    name: string;
    slug: string;
    ownerId: string;
}, {
    id: string;
    avatar: string | null;
    plan: "free" | "pro" | "team";
    createdAt: Date;
    updatedAt: Date;
    githubOrgId: number;
    name: string;
    slug: string;
    ownerId: string;
}>;
declare const workspaceMemberSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<["owner", "admin", "member"]>;
    joinedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    userId: string;
    role: "owner" | "admin" | "member";
    joinedAt: Date;
}, {
    workspaceId: string;
    id: string;
    userId: string;
    role: "owner" | "admin" | "member";
    joinedAt: Date;
}>;

declare const channelSchema: z.ZodObject<{
    id: z.ZodString;
    workspaceId: z.ZodString;
    name: z.ZodString;
    topic: z.ZodNullable<z.ZodString>;
    isPrivate: z.ZodBoolean;
    createdById: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    archivedAt: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    topic: string | null;
    isPrivate: boolean;
    createdById: string;
    archivedAt: Date | null;
}, {
    workspaceId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    topic: string | null;
    isPrivate: boolean;
    createdById: string;
    archivedAt: Date | null;
}>;
declare const channelMemberSchema: z.ZodObject<{
    id: z.ZodString;
    channelId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<["admin", "member"]>;
    joinedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    role: "admin" | "member";
    joinedAt: Date;
    channelId: string;
}, {
    id: string;
    userId: string;
    role: "admin" | "member";
    joinedAt: Date;
    channelId: string;
}>;

declare const dmConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"dm">;
    participantIds: z.ZodTuple<[z.ZodString, z.ZodString], null>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}>;
declare const groupConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"group">;
    name: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}>;
declare const workspaceChannelConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"workspace_channel">;
    channelId: z.ZodString;
    workspaceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}>;
declare const prRoomConversationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"pr_room">;
    githubRepoId: z.ZodNumber;
    githubPRNumber: z.ZodNumber;
    prTitle: z.ZodString;
    prUrl: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}>;
declare const conversationSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"dm">;
    participantIds: z.ZodTuple<[z.ZodString, z.ZodString], null>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}, {
    id: string;
    type: "dm";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: [string, string];
}>, z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"group">;
    name: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}, {
    id: string;
    avatar: string | null;
    type: "group";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    ownerId: string;
    lastMessageAt: Date | null;
    participantIds: string[];
}>, z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"workspace_channel">;
    channelId: z.ZodString;
    workspaceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}, {
    workspaceId: string;
    id: string;
    type: "workspace_channel";
    createdAt: Date;
    updatedAt: Date;
    channelId: string;
    lastMessageAt: Date | null;
}>, z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    lastMessageAt: z.ZodNullable<z.ZodDate>;
} & {
    type: z.ZodLiteral<"pr_room">;
    githubRepoId: z.ZodNumber;
    githubPRNumber: z.ZodNumber;
    prTitle: z.ZodString;
    prUrl: z.ZodString;
    participantIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}, {
    id: string;
    type: "pr_room";
    createdAt: Date;
    updatedAt: Date;
    lastMessageAt: Date | null;
    participantIds: string[];
    githubRepoId: number;
    githubPRNumber: number;
    prTitle: string;
    prUrl: string;
}>]>;
declare const conversationMemberSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    userId: z.ZodString;
    joinedAt: z.ZodDate;
    lastReadSeq: z.ZodNumber;
    mutedUntil: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    id: string;
    userId: string;
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
}, {
    conversationId: string;
    id: string;
    userId: string;
    joinedAt: Date;
    lastReadSeq: number;
    mutedUntil: Date | null;
}>;

declare const messageSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    authorId: z.ZodString;
    content: z.ZodString;
    seq: z.ZodNumber;
    createdAt: z.ZodDate;
    editedAt: z.ZodNullable<z.ZodDate>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    parentMessageId: z.ZodNullable<z.ZodString>;
    attachmentIds: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    authorId: string;
    id: string;
    createdAt: Date;
    content: string;
    seq: number;
    editedAt: Date | null;
    deletedAt: Date | null;
    parentMessageId: string | null;
    attachmentIds: string[];
    metadata: Record<string, unknown>;
}, {
    conversationId: string;
    authorId: string;
    id: string;
    createdAt: Date;
    content: string;
    seq: number;
    editedAt: Date | null;
    deletedAt: Date | null;
    parentMessageId: string | null;
    attachmentIds: string[];
    metadata: Record<string, unknown>;
}>;
declare const messageAttachmentSchema: z.ZodObject<{
    id: z.ZodString;
    messageId: z.ZodString;
    filename: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    url: z.ZodString;
    thumbnailUrl: z.ZodNullable<z.ZodString>;
    uploadedById: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    messageId: string;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string | null;
    uploadedById: string;
}, {
    id: string;
    createdAt: Date;
    messageId: string;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string | null;
    uploadedById: string;
}>;
declare const messageDraftSchema: z.ZodObject<{
    conversationId: z.ZodString;
    userId: z.ZodString;
    content: z.ZodString;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    updatedAt: Date;
    userId: string;
    content: string;
}, {
    conversationId: string;
    updatedAt: Date;
    userId: string;
    content: string;
}>;
declare const createMessageContentValidator: (plan: "free" | "pro" | "team") => z.ZodString;
declare const createCodeBlockValidator: (plan: "free" | "pro" | "team") => z.ZodString;

declare const reactionSchema: z.ZodObject<{
    id: z.ZodString;
    messageId: z.ZodString;
    userId: z.ZodString;
    emoji: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    userId: string;
    messageId: string;
    emoji: string;
}, {
    id: string;
    createdAt: Date;
    userId: string;
    messageId: string;
    emoji: string;
}>;
declare const reactionGroupSchema: z.ZodObject<{
    emoji: z.ZodString;
    count: z.ZodNumber;
    userIds: z.ZodArray<z.ZodString, "many">;
    hasReacted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    emoji: string;
    count: number;
    userIds: string[];
    hasReacted: boolean;
}, {
    emoji: string;
    count: number;
    userIds: string[];
    hasReacted: boolean;
}>;

declare const notificationSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["message", "mention", "reaction", "dm_request", "channel_invite", "workspace_invite"]>;
    title: z.ZodString;
    body: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodString>;
    actionUrl: z.ZodNullable<z.ZodString>;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    readAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "message" | "mention" | "reaction" | "dm_request" | "channel_invite" | "workspace_invite";
    createdAt: Date;
    userId: string;
    metadata: Record<string, unknown>;
    title: string;
    body: string;
    avatarUrl: string | null;
    actionUrl: string | null;
    readAt: Date | null;
}, {
    id: string;
    type: "message" | "mention" | "reaction" | "dm_request" | "channel_invite" | "workspace_invite";
    createdAt: Date;
    userId: string;
    metadata: Record<string, unknown>;
    title: string;
    body: string;
    avatarUrl: string | null;
    actionUrl: string | null;
    readAt: Date | null;
}>;
declare const notificationSettingsSchema: z.ZodObject<{
    userId: z.ZodString;
    emailNotifications: z.ZodBoolean;
    pushNotifications: z.ZodBoolean;
    desktopNotifications: z.ZodBoolean;
    notifyOnMentions: z.ZodBoolean;
    notifyOnDMs: z.ZodBoolean;
    notifyOnReactions: z.ZodBoolean;
    mutedConversationIds: z.ZodArray<z.ZodString, "many">;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    updatedAt: Date;
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    desktopNotifications: boolean;
    notifyOnMentions: boolean;
    notifyOnDMs: boolean;
    notifyOnReactions: boolean;
    mutedConversationIds: string[];
}, {
    updatedAt: Date;
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    desktopNotifications: boolean;
    notifyOnMentions: boolean;
    notifyOnDMs: boolean;
    notifyOnReactions: boolean;
    mutedConversationIds: string[];
}>;

export { channelMemberSchema, channelSchema, conversationMemberSchema, conversationSchema, createCodeBlockValidator, createMessageContentValidator, dmConversationSchema, groupConversationSchema, messageAttachmentSchema, messageDraftSchema, messageSchema, notificationSchema, notificationSettingsSchema, prRoomConversationSchema, reactionGroupSchema, reactionSchema, userPresenceSchema, userSchema, usernameSchema, workspaceChannelConversationSchema, workspaceMemberSchema, workspaceSchema };
