#!/bin/bash

# Script de manutenção do sistema
# Execute periodicamente para manter o sistema saudável

echo "🔧 Executando manutenção do sistema..."

PROJECT_DIR="/var/www/tv-bulletin-board"

# Limpar logs antigos
echo "🧹 Limpando logs antigos..."
find /var/log/nginx/ -name "*.log" -mtime +30 -delete
find /var/log/pm2/ -name "*.log" -mtime +30 -delete

# Limpar cache do npm
echo "📦 Limpando cache do npm..."
npm cache clean --force

# Verificar espaço em disco
echo "💾 Verificando espaço em disco..."
df -h

# Verificar status dos serviços
echo "⚡ Status dos serviços:"
systemctl status nginx --no-pager -l
systemctl status postgresql --no-pager -l

# Verificar aplicação PM2
echo "📱 Status da aplicação:"
sudo -u $SUDO_USER pm2 status

# Backup do banco de dados
echo "💾 Fazendo backup do banco..."
BACKUP_DIR="/var/backups/tv-bulletin-board"
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump tv_bulletin_board > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

echo "✅ Manutenção concluída!"
