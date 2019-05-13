/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
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
    };

    return {
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
                ADSIZE: buildEnvConfig.ADSIZE,
            }),
            new HtmlWebpackPlugin({
                filename: 'index-android.html', // 配置输出文件名和路径
                template: './index.ejs', // 配置文件模板
                chunks: [''],
                ADSIZE: buildEnvConfig.ADSIZE,
            }),
            new ExtractTextPlugin('css/[name].css'),

            // ! BUG: change file will clear the copyFile in build-watch mode .
            // please run again build task if you change src/anyfile.
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
        resolve: {
            modules: ['node_modules', path.resolve(__dirname, 'src')],
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@images': path.resolve(__dirname, './assets/images'),
                '@assets': path.resolve(__dirname, './assets'),
            },
        },
    };
};
