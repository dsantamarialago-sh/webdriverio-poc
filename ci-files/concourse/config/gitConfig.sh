#!/bin/bash +x

## Trust github hosts
echo "[INFO] Add GithubKey to known hosts  "
[[ ! -d ~/.ssh/ ]] && mkdir -p ~/.ssh/ || echo "INFO .ssh exists proceed"
cd ~/.ssh/
ls -la
echo "${GIT_SSH_KEY}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -H  10.254.180.205  >> ~/.ssh/known_hosts
ssh-keyscan -H  github.com  >> ~/.ssh/known_hosts
eval "$(ssh-agent -s)"
ssh-add -k
export GIT_SSH_COMMAND='ssh -i ~/.ssh/id_rsa -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no'


echo "INFO :: Set Git Config"
git config --global user.email "machinegithub-sh@stubhub.com"
git config --global user.name "CI-Bot"
