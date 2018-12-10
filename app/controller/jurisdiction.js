'use strict';

const Controller = require('../core/base_controller');

class JurisdictionController extends Controller {
  async addJsc() {
    const { grade = 0, describe = '' } = this.ctx.request.body;
    if (!grade) {
      return this.fail({}, '请输入等级');
    }
    if (!describe) {
      return this.fail({}, '请输入描述信息');
    }
    const jurisdiction = await this.ctx.service.jurisdiction.getByGrade(grade);
    if (jurisdiction) {
      return this.fail({}, '等级不能重复');
    }
    const result = await this.ctx.service.jurisdiction.addJsc(grade, describe);
    if (result.insertId > 0) {
      this.success();
    }
  }
  async list() {
    const list = await this.ctx.service.jurisdiction.list();
    this.success(list);
  }
}

module.exports = JurisdictionController;
