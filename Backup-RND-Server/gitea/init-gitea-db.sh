#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER gitea WITH PASSWORD 'gitea_password';
    CREATE DATABASE gitea;
    GRANT ALL PRIVILEGES ON DATABASE gitea TO gitea;
EOSQL