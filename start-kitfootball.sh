#!/bin/bash

# Arrêter tous les serveurs Next.js existants
pkill -f "next-server"

# Démarrer Kit Football sur le port 3001
cd /Users/rayanemouhajer/Documents/trae_projects/kitfootball
source ~/.nvm/nvm.sh
nvm use 20
export PATH="$HOME/.nvm/versions/node/v20.20.2/bin:$PATH"
NEXT_PUBLIC_BASE_URL=http://localhost:3001 npm run dev -- --port 3001
