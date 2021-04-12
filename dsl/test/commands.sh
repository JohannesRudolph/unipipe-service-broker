#!/usr/bin/env bash

set -e

source $(dirname $0)/helpers.sh

it_can_output_help() {
  unipipe --help
}

it_can_list() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")
  
  unipipe list "$repo_osb"
}

it_can_show_json() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")
  
  unipipe show -o "json" -i "49c96fa5-46cc-4334-a718-378ceed2de81" --pretty "$repo_osb"
}

it_can_show_yaml() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")
  
  unipipe show -o "yaml" -i "49c96fa5-46cc-4334-a718-378ceed2de81" --pretty "$repo_osb"
}

it_can_update() {
  local repo_osb=$(init_repo)
  cp -r ./osb-git/ "$repo_osb"
  
  local ref=$(make_commit_with_all_changes "$repo_osb")
  
  unipipe update -i "49c96fa5-46cc-4334-a718-378ceed2de81" --status "failed" --description "all is fine!" "$repo_osb"

  cat "$repo_osb"/instances/49c96fa5-46cc-4334-a718-378ceed2de81/status.yml  
}


run it_can_output_help
run it_can_list
run it_can_show_json
run it_can_show_yaml
run it_can_update