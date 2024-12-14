#!/usr/bin/env bash
# Run with watch mode for hot reloading
deno run --watch --reload --allow-read --allow-env --allow-net --allow-run main.ts || {
    echo "Error: Failed to run server"
    exit 1
}