# Debian 12 Communications Server

[[toc]]

## Services installed

* Firefish Fediverse server
* Matrix
* ejabberd XMPP/SIP

### Independent installs

* Meilisearch
* KeyDB

### AWS Hosted services

* Postgres - RDS
* Storage - S3
* Compute - EC2

## Create Debian 12

Using AWS and a small Graviton EC2 instance with Debian 12.

## Upgrade OS

```sh
sudo apt update && sudo apt upgrade -y
```

## Install nvm

### Install requirements

```sh
sudo apt install build-essential libssl-dev -y
```

### Install

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
```

## Install Node v20

```sh
nvm install 20
```

## Install Postgres client

```sh
sudo apt install postgresql-client -y
```

## Install Redis

```sh
sudo apt install redis
```

## Install libvips
```sh
sudo apt install libvips -y
```

## Install FFmpeg

```sh
sudo apt install -y
```

## Install ejabberd

### Install

```sh
sudo apt install ejabberd
```

### Configure

TBD

## Install Firefish

Based on the main [project] install](https://git.joinfirefish.org/firefish/firefish), with details on what was done for our install.

### Build Dependencies

#### Rust >= v1.68.0

Use Version 1.74.0

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### C/C++ compiler & build tools

```sh
sudo apt install build-essential
```

### Python3

This should be installed, but check.

```sh
python3 --version
```

Should see something similar to:

```sh
Python 3.11.2
```

### Install Git

```sh
sudo apt install git
```

### Download Firefish code

```sh
git clone https://git.joinfirefish.org/firefish/firefish.git
cd firefish/
git checkout main
```

### Install dependencies

```sh
corepack enable
corepack prepare pnpm@latest --activate
# To build without TensorFlow, append --no-optional
pnpm i # --no-optional
```

### Install pm2

```sh
npm i -g pm2
pm2 install pm2-logrotate
```


### Customize

* To add custom CSS for all users, edit `./custom/assets/instance.css`.
* To add static assets (such as images for the splash screen), place them in the `./custom/assets/` directory. They'll then be available on https://it.izzup.com/static-assets/filename.ext.
* To add custom locales, place them in the `./custom/locales/` directory. If you name your custom locale the same as an existing locale, it will overwrite it. If you give it a unique name, it will be added to the list. Also make sure that the first part of the filename matches the locale you're basing it on. (Example: `en-FOO.yml`)
* To add custom error images, place them in the `./custom/assets/badges` directory, replacing the files already there.
* To add custom sounds, place only mp3 files in the `./custom/assets/sounds` directory.
* To update custom assets without rebuilding, just run `pnpm run gulp`.
* To block ChatGPT, CommonCrawl, or other crawlers from indexing your instance, uncomment the respective rules in `./custom/robots.txt`.

### Configure

Copy the config file

```sh
cp .config/example.yml .config/default.yml
```

Edit `.config/default.yml`, note the following fields:



#### Tips and Tricks

* When editing the config file, please don't fill out the settings at the bottom. They're designed only for managed hosting, not self hosting. Those settings are much better off being set in Firefish's control panel.
* Port 3000 (used in the default config) might be already used on your server for something else. To find an open port for Firefish, run for p in {3000..4000}; do ss -tlnH | tr -s ' ' | cut -d" " -sf4 | grep -q "${p}$" || echo "${p}"; done | head -n 1. Replace 3000 with the minimum port and 4000 with the maximum port if you need it.
* I'd recommend you use a S3 Bucket/CDN for Object Storage, especially if you use Docker.
* When using object storage, setting a proper Access-Control-Allow-Origin response header is highly recommended.
* I'd **strongly** recommend against using CloudFlare, but if you do, make sure to turn code minification off.
* For push notifications, run npx web-push generate-vapid-keys, then put the public and private keys into Control Panel > General > ServiceWorker.
* For translations, make a DeepL account and generate an API key, then put it into Control Panel > General > DeepL Translation.
* To add another admin account:

  * Go to the user's page > 3 Dots > About > Moderation > turn on "Moderator"
  * Go back to Overview > click the clipboard icon next to the ID
  * Run psql -d firefish (or whatever the database name is)
  * Run UPDATE "user" SET "isAdmin" = true WHERE id='999999'; (replace 999999 with the copied ID)
  * Restart your Firefish server

### Install modules

```sh
pnpm install
```

## Install Caddy

```sh
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

### Caddyfile

```json
example.tld {
    reverse_proxy http://127.0.0.1:3000
}
```


## Install KeyDB on EC2

KeyDB installed on a new small Graviton EC2 for caching.

### Upgrade server

```sh
sudo apt update && sudo apt upgrade -y
```

### Install
```sh
echo "deb https://download.keydb.dev/open-source-dist $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/keydb.list
sudo wget -O /etc/apt/trusted.gpg.d/keydb.gpg https://download.keydb.dev/open-source-dist/keyring.gpg
sudo apt update
sudo apt install keydb
```

## Install Meilisearch on EC2

Generic install instructions for [Meilisearch](https://www.meilisearch.com/docs/learn/getting_started/installation)

[AWS Specific AMI Install for Meilisearch](https://www.meilisearch.com/docs/learn/cookbooks/aws)

When creating the instance add S3 connectivity for backups
Advanced details -> IAM instance profile

[Make sure to complete the production Meiliserch install steps](https://www.meilisearch.com/docs/learn/cookbooks/aws#part-2-configure-production-settings)

```sh
curl -v http://search.izzup.com/health
```

Logging into the server via SSH as admin will lead you through the prod setup.

```sh
ssh -i "~/.ssh/key.pem" admin@search.izzup.com
```
You should already have your hostname pointed to the server.
If not, you can update the config later by running

```sh
meilisearch-setup
```

after Prod changes:
```sh
curl -v https://search.izzup.com/health
```
