#!/bin/bash

# Script para configurar Nginx e PM2
# Execute como root ou com sudo

echo "⚙️ Configurando serviços..."

PROJECT_DIR="/var/www/tv-bulletin-board"

# Configurar Nginx
echo "🌐 Configurando Nginx..."

# Copiar configuração do site
cp $PROJECT_DIR/configs/nginx-site.conf /etc/nginx/sites-available/tv-bulletin-board

# Habilitar site
ln -sf /etc/nginx/sites-available/tv-bulletin-board /etc/nginx/sites-enabled/

# Remover site padrão (opcional)
rm -f /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuração do Nginx válida"
    systemctl reload nginx
else
    echo "❌ Erro na configuração do Nginx"
    exit 1
fi

# Configurar PM2
echo "⚡ Configurando PM2..."

# Criar diretório de logs do PM2
mkdir -p /var/log/pm2
chown $SUDO_USER:$SUDO_USER /var/log/pm2

# Iniciar aplicação com PM2 (como usuário não-root)
sudo -u $SUDO_USER bash << EOF
cd $PROJECT_DIR
pm2 start configs/pm2.config.json
pm2 save
pm2 startup
EOF

# Configurar PM2 para iniciar automaticamente
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $SUDO_USER --hp /home/$SUDO_USER

echo "✅ Serviços configurados!"
echo "📋 Status dos serviços:"
systemctl status nginx --no-pager -l
sudo -u $SUDO_USER pm2 status
