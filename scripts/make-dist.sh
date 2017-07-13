#!/bin/bash -xe

# Install angular/cli
npm uninstall -g angular-cli
npm uninstall -g @angular/cli
npm cache clean
npm i -g @angular/cli@1.0.0

rm -rf node_modules dist
#npm install --save-dev @angular/cli@1.0.0

# Install deps
npm i

# Build the distribution
ng build --prod 

# Make a tarball
tar -czvf dist.tar.gz dist/
