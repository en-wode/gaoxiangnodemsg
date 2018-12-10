'use strict';
const Service = require('egg').Service;

class VideoService extends Service {
  async addVideo(equipmentId, link, where) {
    const result = await this.app.mysql.insert('video', { equipmentId, link, where });
    return result;
  }
  async list() {
    const result = await this.app.mysql.select('video');
    return result;
  }
  async getByEquipmentId(equipmentId) {
    const result = await this.app.mysql.get('video', { equipmentId });
    return result;
  }
  async getByEquipmentIdAndWhere(equipmentId, where) {
    const result = await this.app.mysql.get('video', { equipmentId: Number(equipmentId), where });
    return result;
  }
}
module.exports = VideoService;
