/* eslint valid-jsdoc: "off" */

'use strict';

const mysqlConf = {
    client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'juejue-cost'
    },
    app: 'true',
    agent: false
};

const securityConf = {
    csrf: {
        enable: false,
        ignoreJSON: true
    },
    domainWhiteList: [ '*' ]
};

const jwtConf = {
    secret: 'k2f4c016'
};

const viewConf = {
    mapping: { '.html': 'ejs' }
};

const multipartConf = {
    mode: 'file'
};

const cordConf = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
};

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1640086907733_3837';

    // add your middleware config here
    config.middleware = [];

    config.security = securityConf;

    config.mysql = mysqlConf;

    config.jwt = jwtConf;

    config.view = viewConf;

    config.multipart = multipartConf;

    config.cors = cordConf;

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        uploadDir: 'app/public/upload'
    };

    return {
        ...config,
        ...userConfig
    };
};
