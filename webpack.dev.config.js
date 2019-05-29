/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const buildGlobalConfig = require('./build.config').buildGlobalConfig;

module.exports = merge(common, {
    mode: 'development',
    entry: path.resolve(__dirname, './src/ts/index.ts'),
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/index.js',
        chunkFilename: 'index.js',
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
                        {
                            search: 'GLOBALDOWNLOADURL',
                            replace: buildGlobalConfig.GLOBALDOWNLOADURL,
                            attr: 'g',
                        },
                    ],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: './index.ejs', // 配置文件模板
            chunks: ['index'],
            ADSIZE: buildGlobalConfig.ADSIZE,
        }),
    ],
    devtool: 'source-maps',
    devServer: {
        stats: 'errors-only',
        inline: true,
        host: '0.0.0.0',
        compress: true,
        useLocalIp: true,
        port: 4002,
    },
});
