#!/bin/bash
rsync -avz . --exclude .git --exclude node_modules --exclude .env --exclude .env.local --exclude .next ubuntu@cashmind.asupernova.com.br:/opt/WrenAI
