#!/bin/bash

# BruxControl Web - Deploy Script
# Usage: ./deploy.sh [simple|traefik]

set -e

MODE=${1:-simple}

echo "🚀 Deploying BruxControl Web..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t bruxcontrol-web .

# Stop and remove existing container if exists
echo "🛑 Stopping existing container..."
docker stop bruxcontrol-web 2>/dev/null || true
docker rm bruxcontrol-web 2>/dev/null || true

if [ "$MODE" == "traefik" ]; then
    echo "🔐 Deploying with Traefik (SSL)..."
    docker-compose up -d
else
    echo "🌐 Deploying simple mode (port 8080)..."
    docker-compose -f docker-compose.simple.yml up -d
fi

echo "✅ Deployment complete!"
echo ""

if [ "$MODE" == "traefik" ]; then
    echo "🌍 Site available at: https://bruxcontrol.app"
else
    echo "🌍 Site available at: http://your-server-ip:8080"
    echo "💡 Configure your reverse proxy to forward to port 8080"
fi
