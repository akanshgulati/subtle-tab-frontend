import path from 'path'
import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
const bundleSize = require('rollup-plugin-bundle-size');
import fs from 'fs';

const isProduction = process.env.NODE_ENV === `production`

const plugins = [
    buble({
        objectAssign: 'Object.assign'
    }),
    bundleSize(),
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    commonjs(),
    nodeGlobals(),
    replace({
        'process.env.NODE_ENV': (isProduction ? JSON.stringify('dev') : JSON.stringify('production'))
    }),
    (isProduction && uglify())
]

let config = {
    input: 'src/main.js',
    output: [{
        file: 'chrome/build.js',
        format: 'umd',
        sourcemap: !isProduction
    },{
        file: 'firefox/build.js',
        format: 'umd',
        sourcemap: !isProduction
    }],
    plugins: plugins
}

config.plugins.unshift(
    vue({
        css (style) {
            // to minify css
            let content = style;
            content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
            content = content.replace( / {2,}/g, ' ' );
            content = content.replace( / ([{:}]) /g, '$1' );
            content = content.replace( /([;,]) /g, '$1' );
            content = content.replace( / !/g, '!' );
            fs.writeFileSync('static/css/bundle.css', content)
        }
    }),
    alias({
        vue$: 'vue/dist/vue.runtime.js',
        '@': path.resolve('./src/'),
        resolve: ['.js', '.vue']
    })
)

/* SUBTLE.JS*/
let config_subtle = {
    input: './src/subtle.js',
    output: [{
        file: './chrome/subtle.js',
        format: 'umd',
        sourcemap: !isProduction
    },{
        file: './firefox/subtle.js',
        format: 'umd',
        sourcemap: !isProduction
    }],
    plugins: plugins
}

export default [config, config_subtle]