'use strict';
const Service = require('egg').Service;

class EquipmentArametersService extends Service {
  async getByEquipmentId(equipmentId) {
    const result = await this.app.mysql.get('equipment_arameters', { equipmentId });
    return result;
  }
  async listByState(equipmentId) {
    const list = await this.app.mysql.get('equipment_arameters', { equipmentId });
    return list;
  }
  async list() {
    const list = await this.app.mysql.select('equipment_arameters');
    return list;
  }
  async update(data) {
    const result = await this.app.mysql.update('equipment_arameters', data);
    return result;
  }
}
module.exports = EquipmentArametersService;
