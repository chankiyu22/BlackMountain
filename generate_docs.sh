#!/bin/bash
rm -rf public/docs/
docker -i ./ -x .git,node_modules,public/docs,public/javascript/jquery.js -o public/docs
