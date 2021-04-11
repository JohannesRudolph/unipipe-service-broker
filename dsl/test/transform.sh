#!/usr/bin/env bash

set -e

source $(dirname $0)/helpers.sh

# use some trickery to get an absolute path to the registry file
handlers="$(cd "$(dirname "$0")"; pwd)"/handlers/registry.js

# these are needed so that `tree` output does not confused
export LC_CTYPE=C 
export LANG=C

it_can_transform() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")

  echo "Input repo OSB"
  tree "$repo_osb"

  local repo_tf=$(init_repo)

  unipipe transform "$repo_osb" "$handlers" --xport-repo "$repo_tf"

  echo "Output repo TF"
  tree "$repo_tf"
}

run it_can_transform