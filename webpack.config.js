var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        build: ['./src/main.js'],
        subtle: ['./src/subtle.js']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi]
        })
    ]
} else {
    module.exports.devtool = '#source-map'
}
