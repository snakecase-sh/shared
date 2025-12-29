#!/bin/bash

# Setup script for @snakecase/shared package

set -e

echo "Installing dependencies..."
pnpm install

echo "Running type check..."
pnpm typecheck

echo "Building package..."
pnpm build

echo "Checking git status..."
git status

echo "Adding all files..."
git add .

echo "Creating commit..."
git commit -m "feat: initial shared types, validators, and constants

- Add TypeScript types for User, Workspace, Channel, Conversation, Message, Reaction, Notification
- Add Zod validators for all types with plan-based limits
- Add constants for plan limits, Socket.IO events, and API error codes
- Add utility functions for slugify, date formatting, and text manipulation
- Configure package with tsup for ESM/CJS dual builds
- Set up strict TypeScript configuration"

echo "Pushing to origin main..."
git push origin main

echo "Setup complete!"
