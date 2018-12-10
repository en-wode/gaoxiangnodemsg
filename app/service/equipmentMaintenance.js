'use strict';
const Service = require('egg').Service;

class EquipmentMaintenanceService extends Service {
  async addQuestion(equipmentId, questionTypeId, questionLevelId, questionDescribe, tel) {
    const result = await this.app.mysql.insert('equipment_maintenance', { equipmentId, questionTypeId, questionLevelId, questionDescribe, tel });
    return result;
  }
}
module.exports = EquipmentMaintenanceService;
