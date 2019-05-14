/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const buildGlobalConfig = require('./build.config').buildGlobalConfig;

module.exports = merge(common, {
    mode: 'production',
    entry: {
        'android/index': path.resolve(__dirname, './src/ts/index.ts'),
        'ios/index': path.resolve(__dirname, './src/ts/index.ts'),
    },
    watch: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'webpack-replace-loader',
                options: {
                    arr: [
                        {
                            search: 'GLOBALWIDTH',
                            replace: buildGlobalConfig.GLOBALWIDTH,
                            attr: 'g',
                        },
                        {
                            search: 'GLOBALHEIGHT',
                            replace: buildGlobalConfig.GLOBALHEIGHT,
                            attr: 'g',
                        },
                    ],
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index-ios.html', // 配置输出文件名和路径
            template: './index.ejs', // 配置文件模板
            chunks: [''],
            ADSIZE: buildGlobalConfig.ADSIZE,
        }),
        new HtmlWebpackPlugin({
            filename: 'index-android.html', // 配置输出文件名和路径
            template: './index.ejs', // 配置文件模板
            chunks: [''],
            ADSIZE: buildGlobalConfig.ADSIZE,
        }),

        // ! BUG: change file will clear the copyFile in build-watch mode .
        // please run again build task if you change src/** file.
        new CopyPlugin([
            //  copy the lib file
            {
                from: './lib/*.js',
                to: './',
            },
            // copy the assets folder
            {
                from: './assets/**',
                to: './',
            },
        ]),
    ],
});
