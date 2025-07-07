#!/bin/bash

# Script para configurar SSL com Let's Encrypt
# Execute como root

echo "🔒 Configurando SSL com Let's Encrypt..."

DOMAIN="seu-dominio.com"  # Substitua pelo seu domínio

# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
certbot --nginx -d $DOMAIN -d www.$DOMAIN

# Configurar renovação automática
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

echo "✅ SSL configurado!"
echo "🔄 Certificado será renovado automaticamente"
