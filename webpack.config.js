const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const EncodingPlugin = require('webpack-encoding-plugin')

module.exports = {
    entry: "/src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png)$/u,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
            },
            {
                test: /\.html$/u,
                include: path.resolve(__dirname, 'src/components/'),
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false
        }),
        new EncodingPlugin({
            test: /\.(html|js|json)$/u,
            encoding: 'windows-1251'
        })
    ],
    devServer: {
        overlay: true,
        open: true,
        headers: {
            'Content-Type': 'text/html; charset=windows-1251'
         }
    },
    mode: process.env.NODE_ENV === 'production ' ? 'production' : 'development'
}