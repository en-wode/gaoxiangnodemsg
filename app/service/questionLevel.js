'use strict';
const Service = require('egg').Service;

class QuestiotLevelService extends Service {
  async list() {
    const result = await this.app.mysql.select('question_level');
    return result;
  }
}
module.exports = QuestiotLevelService;
