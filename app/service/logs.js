'use strict';
const Service = require('egg').Service;

class LogsService extends Service {
  async addLogs(equipmentId, online, pattern, weather, time, waterLevelInWell, riveRaterLevel, waterPump1, waterPump2, sluiceHeight, floatingBall, callThePolice, hydraulicPumpMotor, keyboardStatus, rainfall, ss, cod, sewageFlow1, totalDischargeOfSewage1, sewageFlow2, totalDischargeOfSewage2, monitoring1State, monitoring2State) {
    const result = await this.app.mysql.insert('logs', { equipmentId, online, pattern, weather, time, waterLevelInWell, riveRaterLevel, waterPump1, waterPump2, sluiceHeight, floatingBall, callThePolice, hydraulicPumpMotor, keyboardStatus, rainfall, ss, cod, sewageFlow1, totalDischargeOfSewage1, sewageFlow2, totalDischargeOfSewage2, monitoring1State, monitoring2State });
    return result;
  }
  async getLogs(equipmentId, date) {
    const result = await this.app.mysql.query(`select * from logs where equipmentId=${equipmentId} AND 
    DATE_FORMAT(time,'%Y-%m-%d') = '${date}'`);
    return result;
  }
}
module.exports = LogsService;
