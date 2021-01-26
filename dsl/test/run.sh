#!/usr/bin/env bash
# Exit on all errors and undefined vars
set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

main() {
  local instanceYml
  instanceYml="$(yaml-to-dhall ../UniPipe/OSB/ServiceInstance.dhall < instance.yml)"

  dhall <<< "./runner.dhall $instanceYml ./handler.dhall"
}


main