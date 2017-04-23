#!/bin/bash -e

echo "Checking code convention..."

JS_FILES=$(find ./models ./functions -type f -name '*.js')
COUNTER=0

for file in $JS_FILES; do
  CHECK_RESULT=$(node_modules/.bin/eslint $file)
  if [[ -z "$CHECK_RESULT" ]]; then
    echo "$(tput setaf 2)$file: Passed"
  else
    echo "$(tput setaf 1)$file: Failed"
    echo $CHECK_RESULT
    ((COUNTER++))
  fi
  echo "$(tput setaf 7)------------------"
done

if [ "$COUNTER" -gt 0 ]; then
  exit 1
fi
