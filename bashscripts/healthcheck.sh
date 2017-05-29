#!/bin/bash -e

HEALTH_CHECK_URL=$1
echo "Doing health check..."

HTTP_CODE=`curl -X GET -H "x-api-key:api_key_if_necessary" -m 2 -I $HEALTH_CHECK_URL 2>/dev/null | head -n 1 | awk -F" " '{print $2}'`

if [ "$HTTP_CODE" == "200" ]; then
  echo "$(tput setaf 2)Passed health check"
  tput setaf 7
  exit 0
else
  echo "$(tput setaf 1)Failed health check"
  tput setaf 7
  exit 1
fi
