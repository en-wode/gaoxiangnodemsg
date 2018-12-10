'use strict';
const Service = require('egg').Service;

class UserequipmentService extends Service {
  async getUserEquipment(equipmentId, userId) {
    const result = await this.app.mysql.get('user_equipment', { equipmentId, userId });
    return result;
  }
  async addUserEquipment(equipmentId, userId) {
    const result = await this.app.mysql.insert('user_equipment', { equipmentId, userId });
    return result;
  }
  async getListByUserId(userId) {
    const result = await this.app.mysql.select('user_equipment', { where: { userId } });
    return result;
  }
  async getListByEquipmentId(equipmentId) {
    const result = await this.app.mysql.select('user_equipment', { where: { equipmentId } });
    return result;
  }
  async delete(id) {
    const result = await this.app.mysql.delete('user_equipment', { id });
    return result;
  }
  async deleteEquipmentId(equipmentId) {
    const result = await this.app.mysql.delete('user_equipment', { equipmentId });
    return result;
  }
}
module.exports = UserequipmentService;
