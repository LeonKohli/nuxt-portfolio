# @nuxt/content HMR Race Condition Bug

## Summary

A race condition in `@nuxt/content` v3 causes database integrity check failures during Hot Module Replacement (HMR). The error manifests as:

```
ERROR  Database integrity check failed The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined

ERROR  [request error] [unhandled] [POST] /__nuxt_content/projects/query
ℹ Error: no such table: _content_projects
```

## Root Cause

**Location:** `node_modules/@nuxt/content/dist/module.mjs` - Line 1846

**The Bug:** The `updateTemplates()` function is called without `await`, causing a race condition:

```javascript
// BEFORE (buggy):
updateTemplates({
  filter: (template) => [
    moduleTemplates.manifest,
    moduleTemplates.fullCompressedDump
  ].includes(template.filename)
});
contentHooks.callHook("hmr:content:update", {...});
```

**Why It Fails:**

1. When a file changes, `updateTemplates()` starts writing `database.compressed.mjs`
2. File systems truncate files to 0 bytes before writing new content
3. Without `await`, the WebSocket message is sent immediately
4. Browser/Nitro tries to read `database.compressed.mjs` while it's still being written
5. The file is empty (0 bytes) → `decompressSQLDump()` receives `undefined` → CRASH

## The Fix

Add `await` before `updateTemplates()`:

```javascript
// AFTER (fixed):
await updateTemplates({
  filter: (template) => [
    moduleTemplates.manifest,
    moduleTemplates.fullCompressedDump
  ].includes(template.filename)
});
contentHooks.callHook("hmr:content:update", {...});
```

## Applied Patch

This project uses `bun patch` to apply the fix locally.

**Patch file:** `patches/@nuxt%2Fcontent@3.11.0.patch`

```diff
diff --git a/dist/module.mjs b/dist/module.mjs
--- a/dist/module.mjs
+++ b/dist/module.mjs
@@ -1843,7 +1843,7 @@ function watchContents(nuxt, options, manifest) {
     } else {
       collectionDump.splice(indexToUpdate, itemsToRemove);
     }
-    updateTemplates({
+    await updateTemplates({
       filter: (template) => [
         moduleTemplates.manifest,
         moduleTemplates.fullCompressedDump
```

**package.json entry:**
```json
{
  "patchedDependencies": {
    "@nuxt/content@3.11.0": "patches/@nuxt%2Fcontent@3.11.0.patch"
  }
}
```

## Additional Workaround: Vite Watch Exclusion

The patch alone may not fully fix the issue because **Vite's file watcher** also sees `database.compressed.mjs` being written and triggers HMR before the write completes.

**Add to `nuxt.config.ts`:**
```typescript
vite: {
  server: {
    watch: {
      ignored: ['**/.nuxt/content/database.compressed.mjs', '**/.nuxt/content/sql_dump.txt']
    }
  }
}
```

This prevents Vite from reacting to the database file changes. Content updates still work via the `nuxt-content:update` WebSocket event.

## Why This Affects Bun More Than Node.js

1. **Bun's file watcher is faster** - Events fire more quickly, making the race window larger
2. **Faster I/O** - Less time between write start and WebSocket send
3. **Running with `--bun` flag** - Uses Bun for Nitro server, amplifying timing differences

## Upstream Status

- **Affected versions:** @nuxt/content v3.x (tested on v3.11.0)
- **Related partial fix:** v3.9.0 added a 50ms retry for content file reading (commit `c07336e1`), but this only addresses content files, NOT the database dump file
- **Upstream issue:** Not yet reported (as of 2026-01-19)

## How to Remove This Patch

Once @nuxt/content releases a fix:

1. Update @nuxt/content: `bun update @nuxt/content`
2. Remove the patch entry from `package.json`
3. Delete the patch file: `rm patches/@nuxt%2Fcontent@3.11.0.patch`
4. Reinstall: `bun install`

## References

- Nuxt Content source: `node_modules/@nuxt/content/dist/module.mjs`
- `updateTemplates()` is async: `node_modules/@nuxt/kit/dist/index.mjs:1447`
- Bun patch docs: https://bun.sh/docs/pm/cli/patch

---

*Documented: 2026-01-19*
*Patch created with: `bun patch @nuxt/content && bun patch --commit node_modules/@nuxt/content`*
