'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    mysql: {
        enable: true,
        package: 'egg-mysql'
    },
    jwt: {
        enable: true,
        package: 'egg-jwt'
    },
    ejs: {
        enable: true,
        package: 'egg-view-ejs'
    },
    cors: {
        enable: true,
        package: 'egg-cors'
    }
};
