# Subtle Tab

A new tab firefox addon and chrome extension

## Tech Stack

1. Using VUE > 2.0
2. Using Webpack for builds (using rollup and browserify for testing build only)
3. Web-ext for linting firefox plugin
4. Using Yarn for package management

## File Structure
- Firefox Directory (/firefox): It contains all files for firefox plugin
- Chrome Directory (/chrome): It contains all files for chrome plugin
- Static Directory (/static): It contains common static files used in chrome and firefox plugins. For development purposes, we use symlinks of this directory in firefox and chrome directory and copy this folder to both firefox and chrome for production ready code.
- Src directory (/src): It contains all files related to Vue for content script (build.js) and background script (subtle.js)

## Install Process
 In order to use below build processes, you must have yarn installed on your machine on global level. 
 Use command `yarn run install` to install Vue and other essential packages to build 
 
## Build Process

1. **Development Build**  `yarn run build`
2. **Production Build**`yarn run prod`
3. **Watch Dev Code** `yarn run watch`