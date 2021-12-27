/**
 * Create on Tue Dec 21 2021
 * @file file comment
 * @author chaijianxiang
 */

'use strict';
const Service = require('egg').Service;

class BillService extends Service {
    // 插入账单
    async add(params = {}) {
        const {
            app
        } = this;
        try {
            const result = await app.mysql.insert('bill', params);
            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    // 插入账单
    async update({ id, ...params }) {
        const {
            app
        } = this;
        try {
            const result = await app.mysql.update('bill', params, {
                where: { id }
            });
            console.log(result);
            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // 插入账单
    async delete(id) {
        const {
            app
        } = this;
        try {
            const result = await app.mysql.delete('bill', { id });
            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getItemById(id) {
        const { app } = this;
        try {
            const result = await app.mysql.get('bill', { id });
            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async list({ pageSize, pageIndex, ...query }) {
        const { app } = this;
        const selectOpt = {
            limit: pageSize,
            offset: (pageIndex - 1) * pageSize,
            where: query
        };
        try {
            const result = await app.mysql.select('bill', selectOpt);
            const count = await app.mysql.count('bill', query);
            return {
                list: result,
                count
            };
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
module.exports = BillService;
