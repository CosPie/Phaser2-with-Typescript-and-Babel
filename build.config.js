const env = process.env;
const packageConfig = {
    gameName: env.npm_package_config_gameName,
    direction: env.npm_package_config_direction,
    developer: env.npm_package_config_developer,
    devURL: env.npm_package_config_devURL,
    androidURL: env.npm_package_config_androidURL,
    iosURL: env.npm_package_config_iosURL,
};
const buildGlobalConfig = {
    // html metaTag data
    ADSIZE:
        packageConfig.direction === 'vertical'
            ? JSON.stringify('width=320,height=480')
            : JSON.stringify('width=480,height=320'),
    GLOBALWIDTH: packageConfig.direction === 'vertical' ? 320 : 480,
    GLOBALHEIGHT: packageConfig.direction === 'vertical' ? 480 : 320,
    GLOBALDOWNLOADURL: packageConfig.devURL,
};

module.exports = {
    packageConfig,
    buildGlobalConfig,
};
