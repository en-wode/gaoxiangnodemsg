'use strict';
const Service = require('egg').Service;

class CameraManagementService extends Service {
  async getList() {
    const result = await this.app.mysql.select('camera_management');
    return result;
  }
  async addCamera(serialNumber, link, ip) {
    const result = await this.app.mysql.insert('camera_management', { serialNumber, link, ip });
    return result;
  }
}
module.exports = CameraManagementService;
