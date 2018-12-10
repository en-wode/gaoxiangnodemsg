'use strict';
const Service = require('egg').Service;

class equipmentArametersHistoryService extends Service {
  async getByEquipmentId(equipmentId, title, day) {
    // const result = await this.app.mysql.select('equipment_arameters_history', { where: { equipmentId, creatTime: day }, columns: [ title, 'creatTime' ] });
    // return result[0];
    const result = await this.app.mysql.query(`select ${title}, creatTime from equipment_arameters_history where equipmentId=${equipmentId} AND 
    DATE_FORMAT(creatTime,'%Y-%m-%d') = '${day}'`);
    return result[0];
  }
  async getByEquipmentId1(equipmentId, title) {
    // const result = await this.app.mysql.select('equipment_arameters_history', { where: { equipmentId, creatTime: day }, columns: [ title, 'creatTime' ] });
    // return result[0];
    const result = await this.app.mysql.query(`select ${title}, creatTime from equipment_arameters_history where equipmentId=${equipmentId}`);
      return result;
  }
}
module.exports = equipmentArametersHistoryService;
