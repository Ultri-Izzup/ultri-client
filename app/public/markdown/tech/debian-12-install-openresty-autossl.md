## Install OpenResty / Lua / AutoSSL

[Upstream docs](https://openresty.org/en/linux-packages.html#debian)

```sh
sudo apt-get -y install --no-install-recommends wget gnupg ca-certificates
wget -O - https://openresty.org/package/pubkey.gpg | sudo apt-key add -
```

```sh
codename=`grep -Po 'VERSION="[0-9]+ \(\K[^)]+' /etc/os-release`

echo "deb http://openresty.org/package/arm64/debian $codename openresty" \
    | sudo tee /etc/apt/sources.list.d/openresty.list
```

```sh
sudo apt update
sudo apt-get -y install openresty
```

### Install `lua-resty-acme` for auto SSL certs.

```sh
sudo opm install fffonion/lua-resty-acme
```

### Create account key

```sh
sudo openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out /etc/openresty/account.key
```

### Create cert

```sh
sudo  openssl req -newkey rsa:2048 -nodes -keyout /etc/openresty/default.key -x509 -days 365 -out /etc/openresty/default.pem
```
