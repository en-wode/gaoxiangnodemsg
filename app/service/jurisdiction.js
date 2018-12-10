'use strict';
const Service = require('egg').Service;

class JurisdictionService extends Service {
  async addJsc(grade, describe) {
    const result = await this.app.mysql.insert('jurisdiction', { grade, describe });
    return result;
  }
  async getByGrade(grade) {
    const result = await this.app.mysql.get('jurisdiction', { grade });
    return result;
  }
  async getById(id) {
    const result = await this.app.mysql.get('jurisdiction', { id });
    return result;
  }
  async list() {
    const list = await this.app.mysql.select('jurisdiction');
    return list;
  }
}
module.exports = JurisdictionService;
