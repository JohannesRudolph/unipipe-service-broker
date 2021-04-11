#!/usr/bin/env bash

set -e

source $(dirname $0)/helpers.sh

it_can_output_help() {
  unipipe --help
}

it_can_output_status() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")
  
  unipipe status "$repo_osb"
}

run it_can_output_help
run it_can_output_status