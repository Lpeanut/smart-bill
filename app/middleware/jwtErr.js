'use strict';

module.exports = secret => async (ctx, next) => {
    const token = ctx.request.header.authorization;
    let decode;
    if (token !== 'null' && token) {
        try {
            decode = ctx.app.jwt.verify(token, secret);
            console.log('decode', decode);
            await next();
        } catch (e) {
            console.log('e', e);
            ctx.status = 200;
            ctx.body = {
                message: 'token 已过期',
                code: 401
            };
        }
    } else {
        ctx.status = 200;
        ctx.body = {
            message: 'token 不存在',
            code: 401
        };
    }
};
