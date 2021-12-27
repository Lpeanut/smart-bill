'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        const { ctx } = this;
        // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
        await ctx.render('index.html', {
            title: 'index page' // 将 title 传入 index.html
        });
    }
}

module.exports = IndexController;
