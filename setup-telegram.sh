#!/bin/bash

# Script pour configurer les variables Telegram
echo "Configuration du bot Telegram..."

# Sauvegarde du fichier actuel
cp .env.local .env.backup

# Mise à jour des variables Telegram
sed -i '' 's/TELEGRAM_BOT_TOKEN=/TELEGRAM_BOT_TOKEN=8515811986:AAGAgOwh3aCi3f1mX15GXsbh2uG87Tkzv8E/' .env.local
sed -i '' 's/TELEGRAM_CHAT_ID=%/TELEGRAM_CHAT_ID=1097456356/' .env.local

echo "✅ Variables Telegram configurées!"
echo "🔄 Redémarrez votre serveur avec: npm run dev"
