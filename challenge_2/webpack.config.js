var path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
    entry: [
        '@babel/polyfill',
        `${SRC_DIR}/app.jsx`
    ],
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            {
                test: [/\.jsx$/],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            }
        ]
    },
}