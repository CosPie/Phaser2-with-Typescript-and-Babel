/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/ts/index.ts'),
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/, //匹配所有格式的图片资源
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'src/ts')],
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: './index.html', // 配置文件模板
        }),
        new ExtractTextPlugin('css/[name].css'),
    ],
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@images': path.resolve(__dirname, 'assets/images'),
            '@assets': path.resolve(__dirname, 'assets'),
        },
    },
    devtool: 'source-maps',
    devServer: {
        // contentBase: path.join('/dist/'),
        stats: 'errors-only',
        inline: true,
        host: '127.0.0.1',
        port: 5050,
    },
};
