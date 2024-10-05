# Instrucciones de actualización

## Para usuarios de systemd/pm2

1. Verificar [`docs/notice-for-admins.md`](https://github.com/fedired-dev/fedired/blob/main/docs/notice-for-admins.md)
1. Primero, detenga el servicio Fedired y luego ejecute los siguientes comandos:
    ```sh
    git stash
    ```
1. Extraiga el código fuente más reciente y Estable
    ```sh
    git checkout -- packages/backend/assets
    git pull --ff origin main
    ```
1. Construir Fedired y aplicar cambios a la base de datos
    ```sh
    corepack prepare pnpm@latest --activate
    pnpm install --frozen-lockfile
    NODE_ENV='production' NODE_OPTIONS='--max_old_space_size=3072' pnpm run rebuild
    pnpm run migrate
    ```
1. Reiniciar el servidor
    ```sh
    sudo systemctl restart fedired
    ```
