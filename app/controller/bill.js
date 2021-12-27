'use strict';

const Controller = require('egg').Controller;
const resBody = require('../../common/config/response');

class BillService extends Controller {
    async add() {
        const { ctx, app } = this;
        const { amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;
        if (!amount || !type_id || !type_name || !date || !pay_type) {
            ctx.body = resBody.paramsError;
        }
        try {
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) {
                ctx.body = resBody.invalidToken;
                return;
            }
            const user_id = decode.id;
            const result = await ctx.service.bill.add({
                amount,
                type_id,
                type_name,
                date,
                pay_type,
                remark,
                user_id
            });
            console.log('result', result);
            if (!result) {
                ctx.body = resBody.fail;
            } else {
                ctx.body = resBody.success;
            }
        } catch (e) {
            ctx.body = resBody.fail;
        }
    }
    // 删除账单
    async delete() {
        const { ctx, app } = this;
        const { id } = ctx.request.body;
        if (!id) { ctx.body = resBody.paramsError; }
        try {
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) {
                ctx.body = resBody.invalidToken;
                return;
            }
            const user_id = decode.id;
            const billItem = await ctx.service.bill.getItemById(id);
            if (user_id !== billItem.user_id) {
                ctx.body = resBody.fail;
                return;
            }
            const result = await ctx.service.bill.delete(id);
            if (!result) {
                ctx.body = resBody.fail;
            } else {
                ctx.body = resBody.success;
            }
        } catch (e) {
            ctx.body = resBody.fail;
        }
    }

    async update() {
        const { ctx, app } = this;
        const { amount, type_id, type_name, date, pay_type, remark = '', id } = ctx.request.body;
        if (!amount || !type_id || !type_name || !date || !pay_type) {
            ctx.body = resBody.paramsError;
        }
        try {
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) {
                ctx.body = resBody.invalidToken;
                return;
            }
            const user_id = decode.id;
            const preBillItem = await ctx.service.bill.getItemById(id);
            if (user_id !== preBillItem.user_id) {
                ctx.body = resBody.fail;
                return;
            }
            const result = await ctx.service.bill.update({
                id,
                amount,
                type_id,
                type_name,
                date,
                pay_type,
                remark,
                user_id
            });
            console.log('result', result);
            if (!result) {
                ctx.body = resBody.fail;
            } else {
                ctx.body = resBody.success;
            }
        } catch (e) {
            ctx.body = resBody.fail;
        }
    }

    async list() {
        const { ctx } = this;
        try {
            const { date, pageIndex = 1, pageSize = 8 } = ctx.request.query;
            console.log('pageSize', pageSize)
            const result = await ctx.service.bill.list({
                date,
                pageIndex: +pageIndex,
                pageSize: +pageSize
            });
            if (!result) {
                ctx.body = resBody.fail;
            } else {
                ctx.body = {
                    ...resBody.success,
                    data: result
                };
            }
        } catch (e) {
            ctx.body = resBody.fail;
        }
    }
}

module.exports = BillService;
