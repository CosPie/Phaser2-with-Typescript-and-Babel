/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/, //匹配所有格式的图片资源
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                            // for scss to css : Use relative Path.
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
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
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
    plugins: [new ExtractTextPlugin('css/[name].css')],
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@images': path.resolve(__dirname, './assets/images'),
            '@assets': path.resolve(__dirname, './assets'),
        },
    },
};
