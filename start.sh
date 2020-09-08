#!/bin/bash

docker-compose up -d & cd ./frontend && npm run --silent serve & cd ./backend && npm run dev
