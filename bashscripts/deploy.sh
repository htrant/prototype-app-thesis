#!/bin/bash -e

SERVICE_STAGE=$1

if [ $# -eq 0 ]; then
  echo "No stage is specified"
  exit 1
fi

if [ $SERVICE_STAGE = 'prod' ]; then
  node_modules/.bin/serverless deploy --stage prod
elif [ $SERVICE_STAGE = 'dev' ]; then
  serverless deploy --stage dev
else
  node_modules/.bin/serverless deploy --stage $SERVICE_STAGE
fi
