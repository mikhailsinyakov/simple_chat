"use strict";

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'script.js'
    },
    module: {
        rules: [{
            use: 'babel-loader'
        }]
    }
};