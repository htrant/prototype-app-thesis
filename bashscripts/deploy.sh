#!/bin/bash -e

SERVICE_STAGE=$1
SERVICE_REGION=eu-west-1

if [ "$#" -eq 0 ]; then
  echo "$(tput setaf 1)No service stage is specified"
  tput setaf 7
  exit 1
elif [ "$SERVICE_STAGE"= "prod" ] || [ "$SERVICE_STAGE" = "staging" ]; then
  node_modules/.bin/serverless deploy --stage $SERVICE_STAGE --region $SERVICE_REGION
else
  echo "$(tput setaf 1)Invalid service stage"
  tput setaf 7
  exit 1
fi
