/*
 * @Author: yuze.xia 
 * @Date: 2021-04-01 15:31:31 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-04-29 16:22:49
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件
    entry: './src/app.jsx', 
    // 出口文件
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    resolve: {
        alias: { // 文件别名
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component')
        }
    },
    module: {
        rules: [
            // react jsx语法的处理
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env']
                        presets: ['env', 'react']
                    }
                }
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
            },
            // sass文件的处理
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })
            // },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            //图片的配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 独立css文件
        new ExtractTextPlugin('css/[name].css'),
        // 提取出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port: 8086,
        historyApiFallback:{
            index: '/dist/index.html'
        }
    }
};