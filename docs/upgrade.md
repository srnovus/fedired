# Instrucciones de actualización

## Para usuarios de systemd/pm2

1. Verificar [`docs/notice-for-admins.md`](https://github.com/fedired-dev/fedired/blob/main/docs/notice-for-admins.md)

1. Cambiar al usuario `fedired` y de ir al directorio Fedired antes de ejecutar el comando `git`:

```sh
sudo su --login fedired
cd ~/fedired
```

2. Primero, detenga el servicio Fedired y luego ejecute los siguientes comandos:
    ```sh
    git stash
    ```
3. Extraiga el código fuente más reciente y Estable
    ```sh
    git checkout -- packages/backend/assets
    git pull --ff origin main
    ```
4. Construir Fedired y aplicar cambios a la base de datos
    ```sh
    corepack prepare pnpm@latest --activate
    pnpm install --frozen-lockfile
    NODE_ENV='production' NODE_OPTIONS='--max_old_space_size=3072' pnpm run rebuild
    pnpm run migrate
    ```
4. Reiniciar el servidor
    ```sh
    sudo systemctl restart fedired
    ```
