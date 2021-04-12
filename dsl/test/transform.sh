#!/usr/bin/env bash

set -e

source $(dirname $0)/helpers.sh

# use some trickery to get an absolute path to the registry file
handlers_js="$(cd "$(dirname "$0")"; pwd)"/handlers/registry.js
handlers_ts="$(cd "$(dirname "$0")"; pwd)"/handlers/registry.ts

# these are needed so that `tree` output does not confused
export LC_CTYPE=C 
export LANG=C

it_can_transform_using_js() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")

  echo "Input repo OSB"
  tree "$repo_osb"

  local repo_tf=$(init_repo)

  unipipe transform --handlers "$handlers_js" --xport-repo "$repo_tf" "$repo_osb"

  echo "Output repo TF"
  tree "$repo_tf"
}

it_can_transform_using_ts() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")

  echo "Input repo OSB"
  tree "$repo_osb"

  local repo_tf=$(init_repo)

  unipipe transform --handlers "$handlers_ts" --xport-repo "$repo_tf" "$repo_osb"

  echo "Output repo TF"
  tree "$repo_tf"
}

run it_can_transform_using_js
run it_can_transform_using_ts