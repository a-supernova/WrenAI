#!/bin/bash
rsync -avz . --exclude .git --exclude node_modules --exclude .env --exclude .env.local /opt/WrenAI/wren-ui
