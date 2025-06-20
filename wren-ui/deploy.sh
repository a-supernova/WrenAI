#!/bin/bash
rsync -avz . --exclude .git --exclude node_modules --exclude .env --exclude .env.local ubuntu@cashmind.asupernova.com.br:/opt/WrenAI/wren-ui
