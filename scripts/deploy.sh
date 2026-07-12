#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="${1:-origin}"
BRANCH="gh-pages"

cd "$ROOT"
npm run build

DIST="$ROOT/dist"
if [[ ! -d "$DIST" ]] || [[ -z "$(ls -A "$DIST" 2>/dev/null)" ]]; then
  echo "Error: dist/ is empty after build." >&2
  exit 1
fi

REPO_URL="$(git -C "$ROOT" remote get-url "$REMOTE")"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cp -R "$DIST"/. "$TMP"/
cd "$TMP"

git init -b "$BRANCH"
git add -A
git commit -m "deploy: $(date -u +%Y-%m-%dT%H:%MZ)"

git push -f "$REPO_URL" "$BRANCH"

echo "Pushed built site to $BRANCH ($REMOTE)."
echo "Pages: Settings → Pages → Deploy from branch → gh-pages / (root)"
