#!/bin/bash

# Script para fazer deploy do projeto
# Execute como usuário não-root

echo "🚀 Fazendo deploy do Sistema de Painel de TV..."

# Definir variáveis
PROJECT_DIR="/var/www/tv-bulletin-board"
REPO_URL="https://github.com/seu-usuario/tv-bulletin-board.git"  # Substitua pela URL do seu repositório

# Criar diretório do projeto
sudo mkdir -p $PROJECT_DIR
sudo chown $USER:$USER $PROJECT_DIR

# Clonar projeto (ou copiar arquivos)
echo "📥 Clonando projeto..."
cd /var/www
# git clone $REPO_URL tv-bulletin-board
# OU copie os arquivos manualmente para $PROJECT_DIR

# Navegar para o diretório do projeto
cd $PROJECT_DIR

# Instalar dependências
echo "📦 Instalando dependências do projeto..."
npm install

# Criar arquivo de variáveis de ambiente
echo "⚙️ Configurando variáveis de ambiente..."
cat > .env.local << EOF
# Configurações do Banco de Dados
DATABASE_URL=postgresql://tv_admin:sua_senha_segura_aqui@localhost:5432/tv_bulletin_board

# Configurações da Aplicação
NEXTAUTH_URL=http://seu-dominio.com
NEXTAUTH_SECRET=sua_chave_secreta_muito_longa_e_segura

# Configurações de Upload
UPLOAD_DIR=/var/www/tv-bulletin-board/public/uploads
MAX_FILE_SIZE=50MB

# Configurações de Produção
NODE_ENV=production
PORT=3000
EOF

# Criar diretório de uploads
mkdir -p public/uploads
chmod 755 public/uploads

# Build da aplicação
echo "🔨 Fazendo build da aplicação..."
npm run build

echo "✅ Deploy concluído!"
echo "📝 Próximo passo: configurar Nginx e PM2"
