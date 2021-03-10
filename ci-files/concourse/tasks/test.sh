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

echo 'npm run postinstall'
npm run postinstall

echo 'RUNNING JEST TESTS AND PRINTING RUN OUTPUT TO RESULTS FILE'
mkdir -p .ci/workflows/bamboo-ci/output-dir
npm run test:ci > .ci/workflows/bamboo-ci/output-dir/test_result_file.txt

echo 'FILTERING RESULT FILE LINES'
awk '/All files/{gsub(" ","");print}' .ci/workflows/bamboo-ci/output-dir/test_result_file.txt | awk '{split($0,a,"|");{gsub(" ","")}; print "**",a[5],"%**"}' | awk '{gsub(" ","");print}' > .ci/workflows/bamboo-ci/output-dir/result_summary.txt

echo 'ADDING PACKAGE LINK PREFIX TO PACKAGE RESULT LINES'
awk 'NR == 1 {$0 = "[@stubhub/bamboo-cli](https://github.com/stubhub/Stubhub-npm.bamboo/tree/master/packages/cli): " $0}; 1' .ci/workflows/bamboo-ci/output-dir/result_summary.txt >> .ci/workflows/bamboo-ci/output-dir/temp.txt
awk 'NR == 2 {$0 = "[@stubhub/bamboo-icons-react](https://github.com/stubhub/Stubhub-npm.bamboo/tree/master/packages/react-icons): " $0}; 1' .ci/workflows/bamboo-ci/output-dir/temp.txt >> .ci/workflows/bamboo-ci/output-dir/temp2.txt
awk 'NR == 3 {$0 = "[@stubhub/bamboo-components-react](https://github.com/stubhub/Stubhub-npm.bamboo/tree/master/packages/react): " $0}; 1' .ci/workflows/bamboo-ci/output-dir/temp2.txt >> .ci/workflows/bamboo-ci/output-dir/temp3.txt

echo 'ADDING TITLE TO THE COMMENT FILE'
awk 'NR==1{$0="### :shield: Coverage Report"RS$0}7' .ci/workflows/bamboo-ci/output-dir/temp3.txt > .ci/workflows/bamboo-ci/output-dir/final_comment.txt

echo 'FINISHED JEST TESTS RUN'
