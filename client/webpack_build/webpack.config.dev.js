var webpack = require("webpack"),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    baseWebpackConfig = require('./webpack.config.base'),
    WebpackBuildDllPlugin = require('webpack-build-dll-plugin'),
    path = require('path');

module.exports = merge(baseWebpackConfig, {
    cache: true,
    //目前最流行的Source Maps选项是cheap-module-eval-source-map，这个工具会帮助开发环境下在Chrome/Firefox中显示源代码文件，其速度快于source-map与eval-source-map：
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './',
        publicPath: '/',
        historyApiFallback: true,
        host: "0.0.0.0",
        disableHostCheck: true,
        hot: true,
        inline: true,
        port: 8888,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001',  //线上环境
                secure: false,  //https，设置false
                changeOrigin: true
            }
        }
    },
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
                    ],
                    "env": {
                        "development": {
                            "presets": ["react-hmre"]
                        }
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }]
    },

    plugins: [
        //热插拔
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),

        new WebpackBuildDllPlugin({
            dllConfigPath: path.join(__dirname, './webpack.config.dll.js'),
            forceBuild: false
        }),

        new webpack.DllReferencePlugin({
            context: '/',
            manifest: require('../dist/dll/vendor-manifest.json'),
            name: 'vendor_library'
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
})
