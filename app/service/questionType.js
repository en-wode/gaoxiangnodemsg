'use strict';
const Service = require('egg').Service;

class QuestiotTypeService extends Service {
  async list() {
    const result = await this.app.mysql.select('questiot_type');
    return result;
  }
}
module.exports = QuestiotTypeService;
