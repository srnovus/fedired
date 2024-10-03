# Upgrade instruction

## For systemd/pm2 users

1. Check [`docs/notice-for-admins.md`](https://github.com/fedired-dev/fedired/-/blob/main/docs/notice-for-admins.md)
1. Stop the server
    ```sh
    sudo systemctl stop your-fedired-service.service
    # or pm2 stop fedired
    ```
1. Pull the latest source code
    ```sh
    git checkout -- packages/backend/assets
    git pull --ff origin main
    ```
1. Build Fedired and apply changes to the database
    ```sh
    corepack prepare pnpm@latest --activate
    pnpm install --frozen-lockfile
    NODE_ENV='production' NODE_OPTIONS='--max_old_space_size=3072' pnpm run rebuild
    pnpm run migrate
    ```
1. Start the server
    ```sh
    sudo systemctl start your-fedired-service.service
    # or pm2 start fedired
    ```

## For Docker/Podman users

1. Check [`docs/notice-for-admins.md`](https://github.com/fedired-dev/fedired/-/blob/main/docs/notice-for-admins.md)
1. Pull the latest container image
    ```sh
    docker pull registry.github.com/fedired-dev/fedired:latest
    # or podman pull registry.github.com/fedired-dev/fedired:latest
    ```
1. Start the container
    ```sh
    docker compose up --detach
    # or podman-compose up --detach
    ```
