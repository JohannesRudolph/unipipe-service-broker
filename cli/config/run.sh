#!/usr/bin/env bash
# Exit on all errors and undefined vars
set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

main() {
  # Generate application.yml configuration for unipipe service broker
  dhall-to-yaml < ./AppConfig.dhall | tee ../../src/main/resources/application-default.yml

}

main