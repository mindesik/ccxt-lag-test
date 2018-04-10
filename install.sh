#!/bin/bash

ND_VERSION=8.11.1
wget https://nodejs.org/dist/v$ND_VERSION/node-v$ND_VERSION-linux-x64.tar.gz && tar -C /usr/local --strip-components 1 -xzf node-v$ND_VERSION-linux-x64.tar.gz && rm node-v$ND_VERSION-linux-x64.tar.gz
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update
apt install --no-install-recommends yarn git -y

yarn global add pm2

git clone https://github.com/misterpaladin/ccxt-lag-test.git
cd ccxt-lag-test
yarn
echo ENV=$7 >> .env
echo DB_HOST=$1 >> .env
echo DB_PORT=$2 >> .env
echo DB_USER=$3 >> .env
echo DB_PASSWORD=$4 >> .env
echo DB_NAME=$5 >> .env
echo DB_TABLE=$6 >> .env

pm2 start index.js