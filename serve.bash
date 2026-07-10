#!/usr/bin/env bash
# Serve the Mini-Judge website locally for testing before deploying to GitHub Pages.
# Usage:
#   ./serve.bash          # serves on port 8000
#   ./serve.bash 8080     # serves on a custom port

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8000}"

cd "$SCRIPT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 not found. Install Python 3, or use any other static file server" >&2
  echo "pointed at: $SCRIPT_DIR" >&2
  exit 1
fi

echo "Serving Mini-Judge site from: $SCRIPT_DIR"
echo "Open in your browser:         http://localhost:$PORT/"
echo "Stop the server:               Ctrl+C"
echo

exec python3 -m http.server "$PORT"
