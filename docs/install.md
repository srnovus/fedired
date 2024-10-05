
## Requisitos Previos

- **Servidor**: Se recomienda un servidor con al menos 1 CPU, 2GB de RAM y 20GB de espacio en disco.
- **Sistema Operativo**: Ubuntu Server (18.04 o superior).
- **Acceso a la Terminal**: Acceso root o sudo en el servidor.
- **Nombre de Dominio**: Un dominio válido que apunte a tu servidor.


### Runtime dependencies

- Al menos [NodeJS](https://nodejs.org/en/) v18.20.0 (v20/v22 recomendado)
- Al menos [PostgreSQL](https://www.postgresql.org/) v12 (v16 recomendado) con [PGroonga](https://pgroonga.github.io/) extension
- Al menos [Redis](https://redis.io/) v7 o [Valkey](https://valkey.io/) v7
- Proxy web (uno de los siguientes)
  - Caddy (recomendado)
  - Nginx (recomendado)
  -Apache
- [FFmpeg](https://ffmpeg.org/) para transcodificación de vídeo (**opcional**)
- Servidor de caché (**opcional**, uno de los siguientes)
  - [DragonflyDB](https://www.dragonflydb.io/)
  - [KeyDB](https://keydb.dev/)
  - Another [Redis](https://redis.io/) / [Valkey](https://valkey.io/) server

### Construir dependencias

- Al menos [Rust](https://www.rust-lang.org/) v1.74
- C/C++ compilador y herramientas de construcción (like [GNU Make](https://www.gnu.org/software/make/))
  - `build-essential` on Debian/Ubuntu Linux
  - `base-devel` on Arch Linux
  - `"Development Tools"` on Fedora/Red Hat Linux
- [Python 3](https://www.python.org/)
- [Perl](https://www.perl.org/)

Este documento muestra un procedimiento de ejemplo para instalar estas dependencias y Fedired en Debian 12. Tenga en cuenta que hay mucho espacio para personalizar la configuración del servidor; Este documento simplemente demuestra una instalación sencilla.

### Instalar en sistemas que no sean Linux

No probamos Fedired en sistemas que no sean Linux, por lo que te recomendamos que instales Fedired en un entorno de este tipo **solo si puedes solucionar los problemas tú mismo**. No hay ningún tipo de soporte. Dicho esto, es posible instalar Fedired en algunos sistemas que no sean Linux.

<details>

<summary>Posible configuración en FreeBSD (a partir de la versión<code>20240725</code>)</summary>

Puede instalar Fedired en FreeBSD agregando estos pasos adicionales a las instrucciones estándar:

1. Instalar el paquete `vips`
2. Añade el siguiente bloque a [`package.json`](../package.json)
    ```json
      "pnpm": {
        "overrides": {
          "rollup": "npm:@rollup/wasm-node
        }
      }
    ```
3. Crear un script rc para Fedired
    ```sh
    #!/bin/sh

    # PROVIDE: fedired
    # REQUIRE: DAEMON redis caddy postgresql
    # KEYWORD: shutdown

    . /etc/rc.subr

    name=fedired
    rcvar=fedired_enable

    desc="Fedired daemon"

    load_rc_config ${name}

    : ${fedired_chdir:="/path/to/fedired/local/repository"}
    : ${fedired_env:="npm_config_cache=/tmp NODE_ENV=production NODE_OPTIONS=--max-old-space-size=3072"}

    pidfile="/var/run/${name}.pid"
    command=/usr/sbin/daemon
    command_args="-f -S -u fedired -P ${pidfile} /usr/local/bin/pnpm run start"

    run_rc_command "$1"
    ```

</details>

Por favor, háganos saber si ha implementado Fedired en un entorno curioso :smile:


## 1. Instalar dependencias en Linux (Ubuntu Server)

Asegúrese de que puede utilizar el comando `sudo` antes de continuar.

### Utilidades

```sh
sudo apt update
sudo apt install build-essential python3 curl wget git lsb-release
```

### Node.js y pnpm

Las instrucciones se pueden encontrar en [Este repositorio](https://github.com/nodesource/distributions).

```sh
NODE_MAJOR=20
curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
sudo apt install nodejs

# check version
node --version
```

También es necesario habilitar `pnpm`.
```sh
sudo corepack enable
corepack prepare pnpm@latest --activate

# check version
pnpm --version
```

### PostgreSQL y PGroonga

Las instrucciones de instalación de PostgreSQL se pueden encontrar en [esta pagina](https://www.postgresql.org/download/).

```sh
sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-16

sudo systemctl enable --now postgresql

# check version
psql --version
```

Las instrucciones de instalación de PGroonga se pueden encontrar en [esta pagina](https://pgroonga.github.io/install/).

```sh
wget "https://apache.jfrog.io/artifactory/arrow/$(lsb_release --id --short | tr 'A-Z' 'a-z')/apache-arrow-apt-source-latest-$(lsb_release --codename --short).deb"
sudo apt install "./apache-arrow-apt-source-latest-$(lsb_release --codename --short).deb"
wget "https://packages.groonga.org/debian/groonga-apt-source-latest-$(lsb_release --codename --short).deb"
sudo apt install "./groonga-apt-source-latest-$(lsb_release --codename --short).deb"
sudo apt update
sudo apt install postgresql-16-pgdg-pgroonga

rm "apache-arrow-apt-source-latest-$(lsb_release --codename --short).deb" "groonga-apt-source-latest-$(lsb_release --codename --short).deb"
```

### Redis

Las instrucciones se pueden encontrar en [esta pagina](https://redis.io/docs/install/install-redis/).

```sh
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt update
sudo apt install redis

sudo systemctl enable --now redis-server

# check version
redis-cli --version
```

### FFmpeg

```sh
sudo apt install ffmpeg
```

## 2. Configurar una base de datos

1. Crear un usuario de base de datos
    ```sh
    sudo -u postgres createuser --no-createdb --no-createrole --no-superuser --encrypted --pwprompt fedired
    ```
    Si olvidó la contraseña que ingresó, puede restablecerla ejecutando `sudo -u postgres psql -c "ALTER USER fedired PASSWORD 'password';"`.
2. Crear una base de datos
    ```sh
    sudo -u postgres createdb --encoding='UTF8' --owner=fedired fedired_db
    ```
3. Habilitar la extensión PGronnga
    ```sh
    sudo -u postgres psql --command='CREATE EXTENSION pgroonga;' --dbname=fedired_db
    ```

## 3. Configurar Fedired

1. Crear un usuario para Fedired y cambiar de usuario
   ```sh
   sudo useradd --create-home --user-group --shell /bin/bash fedired
   sudo su --login fedired
   
   # check the current working directory
   # the result should be /home/fedired
   pwd
   ```
1. Instalar la cadena de herramientas de Rust

    Instructions can be found at [this page](https://www.rust-lang.org/tools/install).
    
    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    . "${HOME}/.cargo/env"
    
    # check version
    cargo --version
    ```
3. Clonar el repositorio Fedired
    ```sh
    git clone --branch=main https://github.com/fedired-dev/fedired.git
    ```
1. Copiar y editar el archivo de configuración
    ```sh
    cd fedired
    cp .config/example.yml .config/default.yml
    nano .config/default.yml
    ```

    ```yaml
    url: https://your-server-domain.example.com  # change here
    port: 3000
    
    db:
      host: localhost
      port: 5432
      db: fedired_db
      user: fedired
      pass: your-database-password  # and here
    ```

## 4. Construir Fedired

1. Construir
    ```sh
    pnpm install --frozen-lockfile
    NODE_ENV=production NODE_OPTIONS='--max-old-space-size=3072' pnpm run build
    ```
1. Ejecutar migraciones de bases de datos
    ```sh
    pnpm run migrate
    ```
1. Cerrar sesión del usuario `federed`
    ```sh
    exit
    ```

## 5. Preparación para publicar un servidor

### 1. Configurar un firewall

Para exponer su servidor de forma segura, puede configurar un firewall. En esta instrucción, utilizamos [ufw](https://launchpad.net/ufw).

```sh
sudo apt install ufw
# if you use SSH
# SSH_PORT=22
# sudo ufw limit "${SSH_PORT}/tcp"
sudo ufw default deny
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# check status
sudo ufw status
```

### 2. Configurar un proxy inverso

En esta instrucción, usamos [Caddy](https://caddyserver.com/) para que el servidor Fedired sea accesible desde Internet. Sin embargo, también puedes usar [Nginx](https://nginx.org/en/) si lo deseas ([archivo de configuración de Nginx de ejemplo](./fedired.nginx.conf)).

1. Instalar Caddy
    ```sh
    sudo apt install debian-keyring debian-archive-keyring apt-transport-https
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
    sudo apt update
    sudo apt install caddy

    # check version
    caddy version
    ```
1. Reemplazar el archivo de configuración
    ```sh
    sudo mv /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak
    sudo nano /etc/caddy/Caddyfile
    ```

    ```Caddyfile
    your-server-domain.example.com {
    	reverse_proxy http://127.0.0.1:3000
    
    	log {
    		output file /var/log/caddy/fedired.log
    	}
    }
    ```
1. Reiniciar Caddy
    ```sh
    sudo systemctl restart caddy
    ```

## 6. Publica tu servidor Fedired

1. Crear un archivo de servicio
    ```sh
    sudo nano /etc/systemd/system/fedired.service
    ```

    ```service
    [Unit]
    Description=Fedired daemon
    Requires=redis.service caddy.service postgresql.service
    After=redis.service caddy.service postgresql.service network-online.target

    [Service]
    Type=simple
    User=fedired
    Group=fedired
    UMask=0027
    ExecStart=/usr/bin/pnpm run start
    WorkingDirectory=/home/fedired/fedired
    Environment="NODE_ENV=production"
    Environment="npm_config_cache=/tmp"
    Environment="NODE_OPTIONS=--max-old-space-size=3072"
    # uncomment the following line if you use jemalloc (note that the path varies on different environments)
    # Environment="LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2"
    StandardOutput=journal
    StandardError=journal
    SyslogIdentifier=fedired
    TimeoutSec=60
    Restart=always

    CapabilityBoundingSet=
    DevicePolicy=closed
    NoNewPrivileges=true
    LockPersonality=true
    PrivateDevices=true
    PrivateIPC=true
    PrivateMounts=true
    PrivateUsers=true
    ProtectClock=true
    ProtectControlGroups=true
    ProtectHostname=true
    ProtectKernelTunables=true
    ProtectKernelModules=true
    ProtectKernelLogs=true
    ProtectProc=invisible
    RestrictNamespaces=true
    RestrictRealtime=true
    RestrictSUIDSGID=true
    SecureBits=noroot-locked
    SystemCallArchitectures=native
    SystemCallFilter=~@chown @clock @cpu-emulation @debug @ipc @keyring @memlock @module @mount @obsolete @privileged @raw-io @reboot @resources @setuid @swap
    SystemCallFilter=capset pipe pipe2 setpriority

    [Install]
    WantedBy=multi-user.target
    ```
2. Iniciar Fedired
    ```sh
    sudo systemctl enable --now fedired
    ```

# Mantener el servidor

## Actualizar la versión de Fedired

Consulta las [instrucciones de actualización](https://github.com/fedired-dev/fedired/blob/main/docs/upgrade.md). Asegúrate de cambiar al usuario `fedired` y de ir al directorio Fedired antes de ejecutar el comando `git`:

```sh
sudo su --login fedired
cd ~/fedired
```

## Rotar registros

A medida que el servidor se ejecuta durante más tiempo, el tamaño de los archivos de registro aumenta y llena el espacio del disco. Para evitarlo, debe configurar una rotación de registros (eliminación automática de registros antiguos).

Puede editar el valor `SystemMaxUse` en la sección `[journal]` de `/etc/systemd/journald.conf` para hacerlo:

```conf
[journal]
... (omitted)
SystemMaxUse=500M
...
```

Asegúrese de eliminar el `#` inicial para descomentar la línea. Después de editar el archivo de configuración, debe reiniciar el servicio `systemd-journald`.

```sh
sudo systemctl restart systemd-journald
```

También se recomienda cambiar el [nivel de registro de PGroonga](https://pgroonga.github.io/reference/parameters/log-level.html). El nivel predeterminado es `notice`, pero es demasiado detallado para el uso diario.

Para controlar el nivel de registro, agregue esta línea a su `postgresql.conf`:

```conf
pgroonga.log_level = error
```

Puede comprobar la ubicación de `postgresql.conf` con este comando:

```sh
sudo --user=postgres psql --command='SHOW config_file'
```

El archivo de registro de PGroonga (`pgroonga.log`) se encuentra en este directorio:

```sh
sudo --user=postgres psql --command='SHOW data_directory'
```

## Ajustar la configuración de la base de datos

La configuración predeterminada de PostgreSQL no es adecuada para ejecutar un servidor Fedired. Por lo tanto, se recomienda encarecidamente que utilice [PGTune](https://pgtune.leopard.in.ua/) para modificar la configuración.

A continuación se muestra un conjunto de ejemplos de parámetros que puede proporcionar a PGTune:

|             Parámetro | Valor                                                  |
|----------------------:|---------------------------------------------------------|
|            DB version | 16 (your PostgreSQL major version)                      |
|               OS Type | Linux                                                   |
|               DB Type | Data warehouse                                          |
|          Total Memory | [total physical memory] minus 700 MB                    |
|        Number of CPUs | number of CPU threads (or lower value if you have many) |
| Number of connections | 200                                                     |
|          Data storage | SSD storage                                             |

Dado que un servidor Fedired no es un servidor de base de datos dedicado, asegúrese de dejar algo de espacio en la memoria para otro software como Fedired, Redis y proxy inverso.

Una vez que haya ingresado los valores apropiados para su entorno, haga clic en el botón "Generar" para generar una configuración y reemplazar los valores en `postgresql.conf` con los valores sugeridos.

Después de eso, debes reiniciar el servicio PostgreSQL.

```sh
sudo systemctl stop fedired
sudo systemctl restart postgresql
sudo systemctl start fedired
```

## Vacíe su base de datos

Si la base de datos se ejecuta durante mucho tiempo, la "basura" acumulada puede degradar su rendimiento o causar problemas. Para evitarlo, debe "VACÍAR" su base de datos con regularidad.

```sh
sudo systemctl stop fedired
sudo --user=postgres psql --dbname=fedired_db --command='VACUUM FULL VERBOSE ANALYZE'
sudo systemctl start fedired
```

Tenga en cuenta que esta operación tarda algún tiempo.

## Personalizar

- Para agregar CSS personalizado para todos los usuarios, edite `./custom/assets/instance.css`.
- Para agregar recursos estáticos (como imágenes para la pantalla de inicio), colóquelos en el directorio `./custom/assets/`. Luego estarán disponibles en `https://yourserver.tld/static-assets/filename.ext`.
- Para agregar configuraciones regionales personalizadas, colóquelas en el directorio `./custom/locales/`. Si nombra su configuración regional personalizada con el mismo nombre que una configuración regional existente, la sobrescribirá. Si le da un nombre único, se agregará a la lista. Asegúrese también de que la primera parte del nombre del archivo coincida con la configuración regional en la que la está basando. (Ejemplo: `en-FOO.yml`)
- Para agregar imágenes de error personalizadas, colóquelas en el directorio `./custom/assets/badges`, reemplazando los archivos que ya están allí.
- Para agregar sonidos personalizados, coloque solo archivos mp3 en el directorio `./custom/assets/sounds`.
- Para actualizar los recursos personalizados sin volver a generarlos, simplemente ejecute `pnpm run build:assets`.
- Para evitar que ChatGPT, CommonCrawl u otros rastreadores indexen su instancia, descomente las reglas respectivas en `./custom/robots.txt`.

## Consejos y trucos

- Al editar el archivo de configuración, no complete los ajustes en la parte inferior. Están diseñados *solo* para hospedaje administrado, no para hospedaje propio. Es mucho mejor configurar esos ajustes en el panel de control de Fedired.
- El puerto 3000 (usado en la configuración predeterminada) podría ya estar en uso en su servidor para otra cosa. Para encontrar un puerto abierto para Fedired, ejecute `for p in {3000..4000}; do ss -tlnH | tr -s ' ' | cut -d" " -sf4 | grep -q "${p}$" || echo "${p}"; done | head -n 1`. Reemplace 3000 con el puerto mínimo y 4000 con el puerto máximo si lo necesita.
- Le recomendamos que use un S3 Bucket/CDN para Object Storage, especialmente si usa contenedores.
- Al utilizar el almacenamiento de objetos, se recomienda encarecidamente configurar un encabezado de respuesta `Access-Control-Allow-Origin` adecuado.
- Recomendamos no utilizar CloudFlare, pero si lo hace, asegúrese de desactivar la minimización de código.
- Para las notificaciones push, ejecute `npx web-push generate-vapid-keys`, luego coloque las claves pública y privada en Panel de control > General > ServiceWorker.
- Para las traducciones, cree una cuenta [DeepL](https://deepl.com) y genere una clave API, luego colóquela en Panel de control > General > DeepL Translation.
- Para agregar otra cuenta de administrador:
- Vaya a la página del usuario > 3 puntos > Acerca de > Moderación > active "Moderador"
- Vuelva a Descripción general > haga clic en el ícono del portapapeles junto al ID
- Ejecute `psql -d fedired` (o el nombre que sea el de la base de datos)
- Ejecute `UPDATE "user" SET "isAdmin" = true WHERE id='999999';` (reemplace `999999` con el ID copiado)
- Reinicie su servidor Fedired
