#!/usr/bin/env bash

if [[ "$OSTYPE" =~ ^msys ]]; then
  python "$@"
else
  python3 "$@"
fi