#/bin/bash
cd firefox
rm images; rm vendors; rm fonts; rm css; rm index.html
rm -rf images; rm -rf vendors; rm -rf fonts; rm -rf css; rm -rf index.html
cp -R ../static/images images
cp -R ../static/vendors vendors
cp -R ../static/fonts fonts
cp -R ../static/css css
cp -R ../static/index.html index.html
cd ../chrome
rm images; rm vendors; rm fonts; rm css; rm index.html
rm -rf images; rm -rf vendors; rm -rf fonts; rm -rf css; rm -rf index.html
cp -R ../static/images images
cp -R ../static/vendors vendors
cp -R ../static/fonts fonts
cp -R ../static/css css
cp -R ../static/index.html index.html
cd ..