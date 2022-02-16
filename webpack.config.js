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
                exclude: /(node_modules|bower_components)/,
                options: { presets: ['@babel/env','@babel/preset-react'] }
            },
        ]
    },
    mode: process.env.NODE_ENV || 'development'
}