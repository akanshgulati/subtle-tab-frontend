cd firefox
rm -r images; rm -r vendors; rm -r fonts; rm -r css; rm index.html
ln -sf ../static/images images
ln -sf ../static/vendors vendors
ln -sf ../static/fonts fonts
ln -sf ../static/css css
ln -sf ../static/index.html index.html
cd ../chrome
rm -r images; rm -r vendors; rm -r fonts; rm -r css; rm index.html
ln -sf ../static/images images
ln -sf ../static/vendors vendors
ln -sf ../static/fonts fonts
ln -sf ../static/css css
ln -sf ../static/index.html index.html
cd ..