#!/bin/bash -e

ENV=$1
DBCONN=$2

npm install --quiet
npm run style

sh ./bashscripts/setdb.sh $ENV $DBCONN
sh ./bashscripts/deploy.sh $ENV
