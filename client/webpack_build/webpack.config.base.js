var path = require('path'),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: "[name].js"
    },
    module: {
        rules: [
           {
                test: /\.(png|jpg|gif|jpeg)$/, //处理css文件中的背景图片
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    name: './static/[name].[hash:4].[ext]',
                    limit: '8192'//当图片大小小于这个限制的时候，会自动启用base64编码图片。减少http请求,提高性能
                }
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }]
            }]
    },
    resolve: {
        //注意一下, extensions webpack2第一个不是空字符串! 对应不需要后缀的情况.
        extensions: ['.js', '.json', '.sass', '.less', 'jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'api': path.resolve(__dirname, '../src/api')
        }
    },

    plugins: [
        //动态生成html插件
        new HtmlWebpackPlugin({
            // favicon:'./src/img/favicon.ico', //favicon路径
            template: path.join(__dirname, '../index.html'),
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),

        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        })
    ]
}
