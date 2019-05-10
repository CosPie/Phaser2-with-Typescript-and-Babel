/**
 * @before 需确保webpack已经编译出/dist目录文件
 * 根据package.json中的config 属性,
 * 进行生成包含安卓/IOS的文件夹以及Zip压缩包
 *
 */

import fs from 'fs-extra';
import path from 'path';
const archiver = require('archiver');
const baseDir = path.resolve(__dirname, './dist');
const buildConfig = {
    gameName: process.env.npm_package_config_gameName,
    direction: process.env.npm_package_config_direction === 'vertical' ? '竖版' : '横版',
    developer: process.env.npm_package_config_developer,
};
const commonBuildPath = `${buildConfig.gameName}_${buildConfig.direction}`;

const buildAndroidDir = path.resolve(__dirname, `./build/${commonBuildPath}_安卓_${buildConfig.developer}`);
const buildIOSDir = path.resolve(__dirname, `./build/${commonBuildPath}_IOS_${buildConfig.developer}`);

const build = () => {
    fs.emptyDirSync(path.resolve(__dirname, './build'));
    fs.ensureDirSync(buildAndroidDir);
    fs.ensureDirSync(buildIOSDir);

    // copy assets folder
    fs.copy(path.resolve(baseDir, './assets'), path.resolve(buildAndroidDir, './assets'));
    fs.copy(path.resolve(baseDir, './assets'), path.resolve(buildIOSDir, './assets'));

    // copy android css
    fs.copy(path.resolve(baseDir, './css/android/index.css'), path.resolve(buildAndroidDir, './css/index.css'));
    // copy IOS css
    fs.copy(path.resolve(baseDir, './css/android/index.css'), path.resolve(buildIOSDir, './css/index.css'));

    // copy android js
    fs.copy(path.resolve(baseDir, './js/android/index.js'), path.resolve(buildAndroidDir, './js/index.js'));
    // copy ios js
    fs.copy(path.resolve(baseDir, './js/ios/index.js'), path.resolve(buildIOSDir, './js/index.js'));

    // copy lib folder
    fs.copy(path.resolve(baseDir, './lib'), path.resolve(buildAndroidDir, './lib'));
    fs.copy(path.resolve(baseDir, './lib'), path.resolve(buildIOSDir, './lib'));

    //copy html
    fs.copy(path.resolve(baseDir, './index-android.html'), path.resolve(buildAndroidDir, './index.html'));
    fs.copy(path.resolve(baseDir, './index-ios.html'), path.resolve(buildIOSDir, './index.html'));
};

export default build();
