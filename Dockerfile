# Fase de construcción
FROM docker.io/node:20-alpine AS build
WORKDIR /fedired

# Instalar herramientas necesarias para la compilación
RUN apk update && apk add --no-cache build-base linux-headers curl ca-certificates python3 perl
RUN ln -s $(which gcc) /usr/bin/aarch64-linux-musl-gcc

# Instalar Rust toolchain
RUN curl --proto '=https' --tlsv1.2 --silent --show-error --fail https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Configurar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar los archivos del proyecto y realizar la instalación de dependencias
COPY . ./

# Instalar dependencias de desarrollo (sin congelar el lockfile para CI)
RUN pnpm install --no-frozen-lockfile

# Construir el proyecto para producción
RUN NODE_ENV='production' NODE_OPTIONS='--max_old_space_size=3072' pnpm run build

# Eliminar las dependencias de desarrollo y dejar solo las de producción
RUN find . -path '*/node_modules/*' -delete && pnpm install --prod --frozen-lockfile

# Fase de ejecución (runtime)
FROM docker.io/node:20-alpine
WORKDIR /fedired

# Instalar dependencias necesarias para la ejecución
RUN apk update && apk add --no-cache zip unzip tini ffmpeg curl

# Copiar el código del proyecto
COPY . ./

# Copiar los node_modules desde la fase de construcción
COPY --from=build /fedired/node_modules /fedired/node_modules
COPY --from=build /fedired/packages/backend/node_modules /fedired/packages/backend/node_modules
COPY --from=build /fedired/packages/fedired-js/node_modules /fedired/packages/fedired-js/node_modules

# Copiar los archivos construidos
COPY --from=build /fedired/built /fedired/built
COPY --from=build /fedired/packages/backend/built /fedired/packages/backend/built
COPY --from=build /fedired/packages/backend/assets/instance.css /fedired/packages/backend/assets/instance.css
COPY --from=build /fedired/packages/backend-rs/built /fedired/packages/backend-rs/built
COPY --from=build /fedired/packages/fedired-js/built /fedired/packages/fedired-js/built

# Rehabilitar pnpm en el entorno de producción
RUN corepack enable && corepack prepare pnpm@latest --activate

# Establecer el entorno de producción
ENV NODE_ENV=production

# Definir el volumen para los archivos persistentes
VOLUME "/fedired/files"

# Usar Tini para la inicialización del contenedor
ENTRYPOINT [ "/sbin/tini", "--" ]

# Comando por defecto al arrancar el contenedor
CMD [ "pnpm", "run", "start:container" ]
