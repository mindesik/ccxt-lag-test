#!/bin/bash

ND_VERSION=8.11.1
wget https://nodejs.org/dist/v$ND_VERSION/node-v$ND_VERSION-linux-x64.tar.gz && tar -C /usr/local --strip-components 1 -xzf node-v$ND_VERSION-linux-x64.tar.gz && rm node-v$ND_VERSION-linux-x64.tar.gz
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update
apt install --no-install-recommends yarn git -y

git clone https://github.com/misterpaladin/ccxt-lag-test.git
cd ccxt-lag-test
yarn
