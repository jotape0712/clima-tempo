#!/bin/bash
set -e

echo "Starting build process..."

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Run the build
echo "Running build..."
node_modules/.bin/vite build

echo "Build completed successfully!"
