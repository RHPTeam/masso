#!/bin/bash

url=$1
#echo $URL

cd /home/$url/masso/client
git stash
git pull
npm i
npm run build
cd /home/$url/public_html
rm -rf css
rm -rf images
rm -rf img
rm -rf js
rm -rf index.html
mv /home/$url/masso/client/dist/*  /home/$url/public_html
