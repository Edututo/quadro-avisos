#!/bin/bash

# Script de instalação para Debian 12
# Execute como root ou com sudo

echo "🚀 Instalando dependências para o Sistema de Painel de TV..."

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 20.x (LTS)
echo "📦 Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalação do Node.js
echo "Node.js versão: $(node --version)"
echo "NPM versão: $(npm --version)"

# Instalar PostgreSQL
echo "🐘 Instalando PostgreSQL..."
apt install -y postgresql postgresql-contrib

# Iniciar e habilitar PostgreSQL
systemctl start postgresql
systemctl enable postgresql

# Instalar Nginx
echo "🌐 Instalando Nginx..."
apt install -y nginx

# Iniciar e habilitar Nginx
systemctl start nginx
systemctl enable nginx

# Instalar PM2 para gerenciamento de processos
echo "⚡ Instalando PM2..."
npm install -g pm2

# Instalar Git
echo "📋 Instalando Git..."
apt install -y git

# Instalar ferramentas adicionais
echo "🔧 Instalando ferramentas adicionais..."
apt install -y curl wget unzip htop nano ufw

# Configurar firewall básico
echo "🔒 Configurando firewall..."
ufw allow ssh
ufw allow 80
ufw allow 443
ufw --force enable

echo "✅ Instalação de dependências concluída!"
echo "📝 Próximos passos:"
echo "1. Configure o banco de dados PostgreSQL"
echo "2. Clone o projeto"
echo "3. Configure as variáveis de ambiente"
echo "4. Execute o script de configuração do projeto"
