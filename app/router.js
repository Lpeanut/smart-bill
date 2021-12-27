/**
 * Create on Tue Dec 21 2021
 * @file router
 * @author chaijianxiang
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller,
        middleware
    } = app;
    const _jwt = middleware.jwtErr(app.config.jwt.secret);
    router.get('/index', controller.index.index);
    router.post('/user/register', controller.user.register);
    router.post('/user/login', controller.user.login);
    router.get('/user/get', _jwt, controller.user.getUserInfo);
    router.post('/user/update', _jwt, controller.user.update);
    router.post('/upload', _jwt, controller.upload.upload);

    router.get('/bill/list', _jwt, controller.bill.list);
    router.post('/bill/add', _jwt, controller.bill.add);
    router.post('/bill/update', _jwt, controller.bill.update);
    router.post('/bill/delete', _jwt, controller.bill.delete);
};
