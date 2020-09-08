#!/bin/bash

cd backend && npm run rollback && npm run migrate && npm run seed
