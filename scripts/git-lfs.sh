#!/bin/bash -v
set -e
mkdir -p /tmp/git-lfs && curl -L https://github.com/github/git-lfs/releases/download/v1.2.1/git-lfs-$([ "$TRAVIS_OS_NAME" == "linux" ] && echo "linux" || echo "darwin")-amd64-1.2.1.tar.gz | tar -xz -C /tmp/git-lfs --strip-components 1 && /tmp/git-lfs/git-lfs pull