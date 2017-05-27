#!/bin/bash -e

ENV=$1
DBCONN=$2

npm install --quiet
npm run style

sh ./setdb.sh $ENV $DBCONN
sh ./deploy.sh $ENV
