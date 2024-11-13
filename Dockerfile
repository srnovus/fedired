# Usa una imagen de Node como base
FROM node:20 AS base

# Instala dependencias de sistema
RUN apt-get update && \
    apt-get install -y build-essential python3 curl wget git lsb-release postgresql-client && \
    apt-get install -y ffmpeg redis-server

# Instala PostgreSQL y PGroonga
RUN curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
    echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    apt-get update && \
    apt-get install -y postgresql-16 && \
    apt-get install -y build-essential postgresql-server-dev-16 libgroonga-dev && \
    git clone --recursive https://github.com/pgroonga/pgroonga.git && \
    cd pgroonga && make && make install

# Instala pnpm y Rust
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    . "$HOME/.cargo/env"

# Clona el repositorio de Fedired
RUN git clone --branch=main https://github.com/fedired-dev/fedired.git /fedired
WORKDIR /fedired

# Instala dependencias de Fedired
RUN pnpm install --no-frozen-lockfile

# Copia y edita el archivo de configuración (esto se personaliza en tu entorno)
COPY .config/example.yml .config/default.yml
RUN sed -i 's|url: https://your-server-domain.example.com|url: http://localhost:3000|g' .config/default.yml
RUN sed -i 's|db:.*|db:\n  host: postgres\n  port: 5432\n  db: fedired_db\n  user: fedired\n  pass: your-database-password|g' .config/default.yml

# Ejecuta migraciones de base de datos
RUN pnpm run migrate

# Construye la aplicación para producción
RUN NODE_ENV=production NODE_OPTIONS='--max-old-space-size=3072' pnpm run build

# Configura el servidor
ENV NODE_ENV=production
ENV PORT=3000

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando de inicio de Fedired
CMD ["pnpm", "run", "start"]
