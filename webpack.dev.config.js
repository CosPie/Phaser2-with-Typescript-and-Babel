/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = ($env, argv) => {
    const env = process.env;
    const buildEnvConfig = {
        // html metaTag data
        ADSIZE:
            env.npm_package_config_direction === 'vertical'
                ? JSON.stringify('width=320,height=480')
                : JSON.stringify('width=480,height=320'),
        GLOBALWIDTH: env.npm_package_config_direction === 'vertical' ? 320 : 480,
        GLOBALHEIGHT: env.npm_package_config_direction === 'vertical' ? 480 : 320,
        GLOBALDOWNLOADURL: env.npm_package_config_devURL,
    };
    return {
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
                {
                    test: /\.(ts|js)x?$/,
                    loader: 'webpack-replace-loader',
                    options: {
                        arr: [
                            {
                                search: 'GLOBALWIDTH',
                                replace: buildEnvConfig.GLOBALWIDTH,
                                attr: 'g',
                            },
                            {
                                search: 'GLOBALHEIGHT',
                                replace: buildEnvConfig.GLOBALHEIGHT,
                                attr: 'g',
                            },
                            {
                                search: 'GLOBALDOWNLOADURL',
                                replace: buildEnvConfig.GLOBALDOWNLOADURL,
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
                ADSIZE: buildEnvConfig.ADSIZE,
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
            stats: 'errors-only',
            inline: true,
            host: '0.0.0.0',
            compress: true,
            useLocalIp: true,
            port: 4000,
        },
    };
};
