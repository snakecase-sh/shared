# @snakecase/shared

Shared TypeScript types, validators, and utilities for snakecase.sh.

## Installation

```bash
pnpm install
```

## Development

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Type checking
pnpm typecheck

# Clean build output
pnpm clean
```

## What's Included

### Types (`src/types/`)
- User types and presence
- Workspace and workspace members
- Channels and channel members
- Conversations (DM, Group, Workspace Channel, PR Room)
- Messages and attachments
- Reactions
- Notifications

### Validators (`src/validators/`)
- Zod schemas for all types
- Message content validators with plan-based limits
- Username/handle validators
- Custom validators for GitHub usernames, slugs, etc.

### Constants (`src/constants/`)
- Plan limits (free, pro, team)
- Socket.IO event names
- API error codes

### Utilities (`src/utils/`)
- `slugify`: Convert strings to URL-friendly slugs
- Date formatting helpers (relative time, short date, full datetime)
- Text utilities (truncate, extract mentions, escape HTML)

## Usage

```typescript
import {
  User,
  Message,
  userSchema,
  messageSchema,
  PLAN_LIMITS,
  SOCKET_EVENTS,
  ERROR_CODES,
  slugify,
  formatRelativeTime,
  truncate
} from '@snakecase/shared';

// Use types
const user: User = {
  id: '...',
  githubId: 12345,
  username: 'octocat',
  // ...
};

// Validate with Zod
const validatedUser = userSchema.parse(user);

// Use constants
const maxChars = PLAN_LIMITS.free.messageTextMaxChars;

// Use utilities
const slug = slugify('My Workspace Name'); // 'my-workspace-name'
const timeAgo = formatRelativeTime(new Date()); // 'just now'
```

## License

MIT
