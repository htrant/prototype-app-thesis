#!/bin/bash -e

echo 'Checking style...'

JS_FILES=$(find ./functions -type f -name '*.js')

for file in $JS_FILES; do
  node_modules/.bin/eslint $file
done
