'use strict';

const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;
const resBody = require('../../common/config/response');

class UploadController extends Controller {
    async upload() {
        const { ctx } = this;
        const file = ctx.request.files[0];
        try {
            const uploadDir = await this.writeFiles(file);
            if (uploadDir) {
                ctx.body = {
                    ...resBody.success,
                    data: uploadDir.replace(/app/g, '')
                };
            } else {
                ctx.body = resBody.fail;
            }
        } catch (e) {
            ctx.body = resBody.fail;
        } finally {
            ctx.cleanupRequestFiles();
        }
    }

    async writeFiles(file) {
        const f = fs.readFileSync(file.filepath);
        const currentDay = moment(new Date()).format('YYYYMMDD');
        const writePath = path.join(this.config.uploadDir, currentDay);
        await mkdirp(writePath);
        const uploadFileName = Date.now() + path.extname(file.filename);
        const uploadFilePath = path.join(writePath, uploadFileName);
        fs.writeFileSync(uploadFilePath, f);
        return uploadFilePath;
    }

}

module.exports = UploadController;
