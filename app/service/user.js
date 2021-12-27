/**
 * Create on Tue Dec 21 2021
 * @file file comment
 * @author chaijianxiang
 */

'use strict';
const Service = require('egg').Service;

class UserService extends Service {
    // 根据手机号查询
    async getUserByPhone(phone) {
        const { app } = this;
        try {
            const user = await app.mysql.get('user', { phone });
            return user;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // 用户注册
    async register({ password, phone }) {
        const { app } = this;
        const defaultAvator = 'https://img2.baidu.com/it/u=395719964,2145680590&fm=26&fmt=auto';
        try {
            const result = await app.mysql.insert('user', {
                password,
                phone,
                avatar: defaultAvator,
                username: Date.now(),
                ctime: Date.now()
            });
            return result;
        } catch (e) {
            console.log('register error', e);
            return false;
        }
    }

    async updateUser(params) {
        const { app } = this;
        try {
            const result = await app.mysql.update('user', {
                ...params
            }, {
                id: params.id
            });
            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = UserService;
