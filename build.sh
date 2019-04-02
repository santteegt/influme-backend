#!/bin/bash

cd src && npm install && cd ..
rm -rf dist && mkdir dist
npx babel src --out-dir dist --ignore node_modules
cp src/package.json dist
cd dist && npx yarn install --production --modules-folder node_modules