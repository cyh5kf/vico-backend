var webpack = require("webpack"),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    baseWebpackConfig = require('./webpack.config.base');

process.env.BABEL_ENV='production';

module.exports = merge(baseWebpackConfig, {
    devtool: 'hidden-source-map',
    module: {
        rules: [
        {
            test: /\.js$/, //用babel编译jsx和es6
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0', 'stage-3'],
                plugins: [
                    ["import", { libraryName: "antd", "libraryDirectory": "lib", style: "css" }],
                    ["transform-object-rest-spread"],
                    ["transform-runtime"]
                ]
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader"
                },
                {
                    loader: 'autoprefixer-loader'
                }]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader"
                },
                {
                    loader: 'autoprefixer-loader'
                },{
                    loader: 'less-loader'
                }]
            })
        }]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BABEL_ENV: JSON.stringify('production')
            }
        }),

        //loader的最小化文件模式将会在webpack 3或者后续版本中被彻底取消掉.为了兼容部分旧式loader，你可以通过 LoaderOptionsPlugin 的配置项来提供这些功能。
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        //压缩混淆JS插件,UglifyJsPlugin 将不再支持让 Loaders 最小化文件的模式。debug 选项已经被移除。Loaders 不能从 webpack 的配置中读取到他们的配置项。
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            comments: false,
            beautify: false,
            sourceMap: false
        }),

        new webpack.DllReferencePlugin({
            context: '/',
            manifest: require('../dist/dll/vendor-manifest.json'),
            name: 'vendor_library'
        })
    ]
})
