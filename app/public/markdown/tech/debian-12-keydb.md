# Install KeyDB on EC2

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
