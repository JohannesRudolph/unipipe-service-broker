#!/usr/bin/env bash

set -e

source $(dirname $0)/helpers.sh

# these are needed so that `tree` output does not confuse sed
export LC_CTYPE=C 
export LANG=C

it_can_transform() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  local ref=$(make_commit_with_all_changes $repo_osb)

  echo "Input repo OSB"
  tree "$repo_osb"

  local repo_tf=$(init_repo)

  unipipe transform "$repo_osb" "$repo_tf"

  echo "Output repo TF"
  tree "$repo_tf"
}
 

run it_can_transform