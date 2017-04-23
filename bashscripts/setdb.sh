#!/bin/bash -e

SERVICE_STAGE=$1
DBCONN_STRING=$2

if [ "$#" -ne 2 ]; then
  echo "$(tput setaf 1)No service stage or database connection string is specified"
  tput setaf 7
  exit 1
fi

rm -f .env

echo "DB_PG_SCHEMA=prototype" >> .env

if [ "$SERVICE_STAGE" = "staging" ]; then
  echo "DB_STAGING="$DBCONN_STRING >> .env
elif [ "$SERVICE_STAGE" = "prod" ]; then
  echo "DB_PROD="$DBCONN_STRING >> .env
elif [ "$SERVICE_STAGE" = "local" ]; then
  echo "DB_LOCAL="$DBCONN_STRING >> .env
else
  echo "$(tput setaf 1)Invalid service stage"
  tput setaf 7
  exit 1
fi
