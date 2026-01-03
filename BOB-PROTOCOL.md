# BOB Protocol - API Contract Verification

**Bob** is an on-demand agent whose job is to ensure frontend API calls match backend response shapes.

## When to Invoke Bob

Invoke Bob (ask Claude to audit API contracts) when:

1. **Before deploying** - After making changes to API endpoints
2. **After production issues** - When you see "Cannot read properties of undefined" or ".map is not a function"
3. **After refactoring** - When changing API response shapes
4. **When adding new endpoints** - To ensure consistency

## Bob's Audit Checklist

### 1. Response Shape Rules

Every API endpoint MUST return a **wrapped object**, never a raw array.

```typescript
// ✗ WRONG - Backend returns raw array
app.get('/workspaces', () => {
  return workspaces; // [{ id: '1', ... }, { id: '2', ... }]
});

// ✓ CORRECT - Backend returns wrapped object
app.get('/workspaces', () => {
  return { workspaces }; // { workspaces: [{ id: '1', ... }, { id: '2', ... }] }
});
```

### 2. Frontend Extraction Rules

Frontend MUST extract arrays from wrapped responses.

```typescript
// ✗ WRONG - Expects raw array
list: () => apiClient.get<Workspace[]>('/workspaces'),

// ✓ CORRECT - Extracts from wrapped response
list: () => apiClient.get<{ workspaces: Workspace[] }>('/workspaces')
  .then(res => res.workspaces || [])
  .catch(() => []),
```

### 3. Error Handling Rules

Array-returning API calls MUST have `.catch(() => [])` handlers.

```typescript
// ✗ WRONG - No error handling
list: () => apiClient.get<{ items: Item[] }>('/items').then(res => res.items),

// ✓ CORRECT - Has error handler
list: () => apiClient.get<{ items: Item[] }>('/items')
  .then(res => res.items || [])
  .catch(() => []),
```

### 4. Null Guard Rules

When accessing response properties, ALWAYS use optional chaining.

```typescript
// ✗ WRONG - Will crash if response is null
onSuccess: (conversation) => {
  navigate(`/chat/${conversation.id}`);
}

// ✓ CORRECT - Guards against null
onSuccess: (conversation) => {
  if (!conversation?.id) {
    showToast('Failed to create conversation', 'error');
    return;
  }
  navigate(`/chat/${conversation.id}`);
}
```

## API Contract File

The source of truth for API response shapes is:

```
shared/src/validators/api-responses.ts
```

This file contains:
- Zod schemas for every API response
- Type definitions derived from schemas
- `validateResponse()` function for dev-time validation

## Common Issues Bob Catches

| Error Message | Root Cause | Fix |
|--------------|------------|-----|
| `p.map is not a function` | Backend returns `{ items: [...] }`, frontend expects `[...]` | Extract: `.then(res => res.items)` |
| `Cannot read 'id' of undefined` | API returned null, code assumed object | Add guard: `if (!data?.id)` |
| `undefined is not iterable` | Empty/null response, code tries to spread | Add fallback: `data ?? []` |

## Running Bob's Audit Script

```bash
# From the repo root
./infra/scripts/bob-audit.sh

# Quick check (no type generation)
./infra/scripts/bob-audit.sh --quick
```

## Manual Audit Steps

When Bob runs, he should:

1. **Check `frontend/src/api/endpoints.ts`**
   - Look for `apiClient.get<SomeType[]>` (raw array expectations)
   - Ensure all list endpoints have `.then()` extraction
   - Ensure all list endpoints have `.catch(() => [])` handlers

2. **Check `backend/src/routes/*.ts`**
   - Look for `reply.send([...])` (raw array returns)
   - Ensure all list endpoints return wrapped objects

3. **Check `shared/src/validators/api-responses.ts`**
   - Ensure schemas match actual backend responses
   - Update schemas when endpoints change

4. **Check React Query hooks**
   - Look for unsafe cache updates that assume non-null data
   - Ensure `queryClient.setQueryData` callbacks have null guards

## Adding New Endpoints

When adding a new API endpoint:

1. **Define the response schema first** in `shared/src/validators/api-responses.ts`
2. **Implement backend** returning exactly that shape
3. **Implement frontend** extracting from that shape with error handling
4. **Run Bob's audit** to verify alignment

## Example: Adding a "Teams" Endpoint

```typescript
// 1. shared/src/validators/api-responses.ts
export const GetTeamsResponseSchema = z.object({
  teams: z.array(TeamSchema),
});

// 2. backend/src/routes/teams.ts
app.get('/teams', async (req, reply) => {
  const teams = await db.team.findMany({ ... });
  return { teams }; // Wrapped!
});

// 3. frontend/src/api/endpoints.ts
export const teams = {
  list: () => apiClient.get<{ teams: Team[] }>('/teams')
    .then(res => res.teams || [])
    .catch(() => []),
};
```

---

**Remember:** The goal is to make the app NEVER crash, even when APIs fail or return unexpected shapes.
