/**
 * Create on Tue Dec 21 2021
 * @file file comment
 * @author chaijianxiang
 */

'use strict';

const resBody = require('../../common/config/response');
const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx: { request, service }, ctx } = this;
        const { phone, password } = request.body;
        const userInfo = await service.user.getUserByPhone(phone);
        if (userInfo === false) { // 查询失败
            ctx.body = resBody.fail;
        } else if (userInfo && userInfo.id) { // 已注册
            ctx.body = resBody.registerAlready;
        } else {
            try {
                const result = await service.user.register({ phone, password });
                if (result === false) {
                    ctx.body = resBody.fail;
                } else {
                    ctx.body = resBody.success;
                }
            } catch (e) {
                ctx.body = resBody.fail;
            }
        }
    }

    async login() {
        const { ctx, app } = this;
        const { phone, password } = ctx.request.body;
        const userInfo = await ctx.service.user.getUserByPhone(phone);
        if (!userInfo || !userInfo.id) { // 用户不存在
            ctx.body = resBody.userNotExit;
            return;
        }
        if (password !== userInfo.password) {
            ctx.body = resBody.invalidPassword;
            return;
        }
        // 生成 token
        const token = app.jwt.sign({
            id: userInfo.id,
            phone,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
        }, app.config.jwt.secret);
        ctx.body = {
            ...resBody.success,
            data: { token }
        };
    }

    // 获取用户信息
    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        try {
            const userInfo = await ctx.service.user.getUserByPhone(decode.phone);
            console.log('userInfo', userInfo);
            if (userInfo === false) {
                ctx.body = resBody.fail;
            } else if (userInfo === null) {
                ctx.body = resBody.userNotExit;
            } else {
                ctx.body = {
                    ...resBody.success,
                    data: {
                        id: userInfo.id,
                        username: userInfo.username,
                        phone: userInfo.phone,
                        avatar: userInfo.avatar,
                        signature: userInfo.signature
                    }
                };
            }
        } catch (e) {
            ctx.body = resBody.fail;
        }
    }

    // 更新用户信息
    async update() {
        const { ctx, app } = this;
        try {
            const token = ctx.request.header.authorization;
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            const userInfo = await ctx.service.user.getUserByPhone(decode.phone);
            if (!userInfo) {
                ctx.body = resBody.userNotExit;
                return;
            }
            const result = await ctx.service.user.updateUser({
                id: userInfo.id,
                ...ctx.request.body
            });
            if (!result) {
                ctx.body = resBody.fail;
            } else {
                ctx.body = resBody.success;
            }
        } catch (e) {
            ctx.body = resBody.fail;
        }
    }
}

module.exports = UserController;
