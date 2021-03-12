#!/bin/bash

echo 'calling an external script'

node -v
npm -version

set -e

cd github-repo
./.ci/config/gitConfig.sh

echo "Setting npm registry URL: ${REGISTRY_URL}"
npm config set registry "https://${REGISTRY_URL}"

echo "Login to npm repository URL: ${AUTH_URL}"
set +x
echo "curl -k -u${REGISTRY_USER}:${REGISTRY_PASS} ${AUTH_URL} | tee -a ~/.npmrc"
curl -k -u${REGISTRY_USER}:${REGISTRY_PASS} ${AUTH_URL} | tee -a ~/.npmrc
set -x
echo "INFO :: run command :: npm config list"
npm config list

echo 'npm install'
npm install

echo 'npm run test:remote'
