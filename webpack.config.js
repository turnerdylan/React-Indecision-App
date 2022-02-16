const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/
            },
        ]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: path.join(__dirname, 'public'),
    },
    mode: process.env.NODE_ENV || 'development'
}