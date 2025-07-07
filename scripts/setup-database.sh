#!/bin/bash

# Script para configurar o banco de dados PostgreSQL
# Execute como usuário postgres ou com sudo

echo "🐘 Configurando banco de dados PostgreSQL..."

# Definir variáveis
DB_NAME="tv_bulletin_board"
DB_USER="tv_admin"
DB_PASSWORD="sua_senha_segura_aqui"

# Criar usuário do banco
sudo -u postgres createuser --interactive --pwprompt $DB_USER

# Criar banco de dados
sudo -u postgres createdb -O $DB_USER $DB_NAME

# Configurar PostgreSQL para aceitar conexões locais
echo "📝 Configurando PostgreSQL..."

# Backup da configuração original
cp /etc/postgresql/15/main/pg_hba.conf /etc/postgresql/15/main/pg_hba.conf.backup

# Adicionar configuração para conexões locais
echo "# Configuração para aplicação TV Bulletin Board" >> /etc/postgresql/15/main/pg_hba.conf
echo "local   $DB_NAME   $DB_USER   md5" >> /etc/postgresql/15/main/pg_hba.conf
echo "host    $DB_NAME   $DB_USER   127.0.0.1/32   md5" >> /etc/postgresql/15/main/pg_hba.conf

# Reiniciar PostgreSQL
systemctl restart postgresql

echo "✅ Banco de dados configurado!"
echo "📋 Informações do banco:"
echo "Nome do banco: $DB_NAME"
echo "Usuário: $DB_USER"
echo "Host: localhost"
echo "Porta: 5432"
echo ""
echo "🔗 String de conexão:"
echo "DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
