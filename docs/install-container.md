# Running a Fedired server with containers


## Prerequisites

- Latest [Docker](https://docs.docker.com/get-docker/) installation
  - You can also use [Podman](https://podman.io/docs/installation) and [Podman Compose](https://github.com/containers/podman-compose).

## Guide to install Fedired using Dockerfile

1. Clone the Fedired repository:

```sh
git clone https://github.com/fedired-dev/fedired.git
cd fedired
```

2. Copy the example configuration files:

```sh
cp docker-compose.example.yml docker-compose.yml
cp .config/example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
```

3. Edit the configuration files according to your environment:

- Modify `docker-compose.yml` if necessary
- Adjust `.config/default.yml` and `.config/docker.env` with your configurations
4. Build the Docker image:

```sh
docker build -t fedired:latest .
```
5. Enable the database extension:

```sh
docker-compose up db --detach && sleep 5 && docker-compose exec db sh -c 'psql --user="${POSTGRES_USER}" --dbname="${POSTGRES_DB}" --command="CREATE EXTENSION pgroonga ;"'
```

6. Start services:

```sh
docker-compose up --detach
```

7. Wait for the services to start completely. This may take several minutes.

8. Access the Fedired web interface at `http://serverip:3000` (replace `serverip` with your server IP).

9. To publish your server, follow the instructions in [section 5 of the original installation guide](https://github.com/fedired-dev/fedired/-/blob/main/docs/install.md#5 -preparation-for-publishing-a-server).

## Important notes

- Make sure the Dockerfile is present in the project root directory.

- Building the image may take some time depending on your internet connection and system hardware.

- The initialization process may throw some error messages before successfully completing, especially while the `db` container is initializing.

This guide assumes that the Dockerfile is correctly configured to build the Fedired image. If you encounter problems during the build or deployment, review the Dockerfile and logs to troubleshoot any errors.
