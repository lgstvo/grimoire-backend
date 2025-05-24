#!/bin/bash

if [ -t 0 ]; then
  # Input from command line argument
  input="$1"
else
  # Input from a pipe
  input=$(cat)
fi

echo "$input" | tr -d "\n\r" < test.txt | tr -d " " | sed 's/,\[/,\n\t\t[/g' | sed 's/{\"/{\n\t\"/g' | sed 's/,\"/,\n\t\"/g' | sed 's/}/\n}\n/g'
