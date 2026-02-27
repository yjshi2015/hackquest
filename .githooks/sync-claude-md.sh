#!/usr/bin/env bash
# Sync every AGENTS.md → CLAUDE.md so Cursor and Claude always see the same rules.
# Runs as a pre-commit hook — only syncs files that are staged.

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
changed=0

while IFS= read -r agents_file; do
  dir="$(dirname "$agents_file")"
  claude_file="$dir/CLAUDE.md"

  if ! cmp -s "$agents_file" "$claude_file" 2>/dev/null; then
    cp "$agents_file" "$claude_file"
    git add "$claude_file"
    changed=$((changed + 1))
    echo "  synced: $agents_file → $claude_file"
  fi
done < <(git diff --cached --name-only --diff-filter=ACM | grep 'AGENTS\.md$' || true)

if [ "$changed" -gt 0 ]; then
  echo "✅ Synced $changed CLAUDE.md file(s) from AGENTS.md"
fi
