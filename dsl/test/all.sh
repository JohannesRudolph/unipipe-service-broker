#!/usr/bin/env bash

set -e

$(dirname $0)/commands.sh
$(dirname $0)/transform.sh

echo -e '\e[32mall tests passed!\e[0m'
