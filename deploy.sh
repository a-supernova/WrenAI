#!/bin/bash
rsync -avz . --exclude .git --exclude node_modules --exclude .env --exclude .env.local --exclude .next ubuntu@54.196.19.197:/opt/WrenAI
