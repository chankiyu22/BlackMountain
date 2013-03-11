#!/bin/bash
rm -rf public/docs/
docker -i ./ -x .git,node_modules,public -o public/docs
