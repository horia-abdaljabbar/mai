#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status.

# Install dependencies
npm install

# Change permissions for the vite binary (This will work in Render's Linux environment)
chmod +x ./node_modules/.bin/vite

# Build the project
npx vite build
