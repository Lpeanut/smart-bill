'use strict';

module.exports = {
    success: {
        code: 200,
        message: '请求成功',
        data: {}
    },
    fail: {
        code: 500,
        message: '请求失败',
        data: {}
    },
    unlogin: {
        code: 8000,
        message: '你他娘的没登陆啊',
        data: {}
    },
    invalidToken: {
        code: 8001,
        message: 'token验证无效',
        data: {}
    },
    registerAlready: {
        code: 1000,
        message: '用户已注册',
        data: {}
    },
    userNotExit: {
        code: 1001,
        message: '用户不存在',
        data: {}
    },
    invalidPassword: {
        code: 1002,
        message: '密码不正确',
        data: {}
    },
    paramsError: {
        code: 4000,
        message: '参数错误',
        data: {}
    }
};
