#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
npx --yes http-server app -p 8000 -c-1 --cors
