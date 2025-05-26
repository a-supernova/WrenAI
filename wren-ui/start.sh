#!/bin/bash
nvm use 18
export OTHER_SERVICE_USING_DOCKER=true && export EXPERIMENTAL_ENGINE_RUST_VERSION=false && yarn dev
