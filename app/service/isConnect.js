'use strict';
const Service = require('egg').Service;

class IsConnectService extends Service {
  async addConnect(equipmentId, isConnection) {
    const date = new Date();
    const result = await this.app.mysql.insert('is_connect', { equipmentId, time: date, isConnection });
    return result;
  }
  async getConnect(equipmentId, date) {
    const result = await this.app.mysql.query(`select * from is_connect where equipmentId=${equipmentId} AND 
    DATE_FORMAT(time,'%Y-%m-%d') = '${date}'`);
    return result;
  }
}
module.exports = IsConnectService;
