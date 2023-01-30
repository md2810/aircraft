#!/bin/bash

set -ex

git config --global --add safe.directory "*"

# initialize submodule (a32nx)
git submodule update --init --recursive

cd a32nx/fbw-common/msfs-avionics-mirror/src/msfstypes
npm pack
cd ../sdk
rm -rf node_modules
rm -rf build
npm ci
npm run build
cp package.json build/
cd build
npm pack

cd /external
rm -rf node_modules
npm ci