#!/bin/bash

# Script para atualizar o sistema
# Execute quando houver atualizações do código

echo "🔄 Atualizando Sistema de Painel de TV..."

PROJECT_DIR="/var/www/tv-bulletin-board"
BACKUP_DIR="/var/backups/tv-bulletin-board"

# Fazer backup antes da atualização
echo "💾 Fazendo backup..."
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump tv_bulletin_board > $BACKUP_DIR/pre_update_$(date +%Y%m%d_%H%M%S).sql

cd $PROJECT_DIR

# Parar aplicação
echo "⏹️ Parando aplicação..."
sudo -u $SUDO_USER pm2 stop tv-bulletin-board

# Atualizar código (se usando Git)
echo "📥 Atualizando código..."
# git pull origin main

# Instalar/atualizar dependências
echo "📦 Atualizando dependências..."
npm install

# Executar migrações do banco (se houver)
echo "🗄️ Executando migrações..."
# npm run migrate

# Fazer build da aplicação
echo "🔨 Fazendo build..."
npm run build

# Reiniciar aplicação
echo "🚀 Reiniciando aplicação..."
sudo -u $SUDO_USER pm2 restart tv-bulletin-board

# Verificar status
echo "✅ Atualização concluída!"
sudo -u $SUDO_USER pm2 status
