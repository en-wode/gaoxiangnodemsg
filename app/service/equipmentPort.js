'use strict';
const Service = require('egg').Service;

class EquipmentService extends Service {
  async addEquipmentPort(equipmentId, drainageOverflowHeight, InterceptingLimitflowHeight, sunnyToRain, vigilance, cod, ss, startWaterLevel1, stopWaterLevel1, startWaterLevel2, stopWaterLevel2, startWaterLevel3, stopWaterLevel3, rainGauge, clientState, seaLevel, sluiceTime) {
    const result = await this.app.mysql.insert('equipment_part', { equipmentId, drainageOverflowHeight, InterceptingLimitflowHeight, sunnyToRain, vigilance, cod, ss, startWaterLevel1, stopWaterLevel1, startWaterLevel2, stopWaterLevel2, startWaterLevel3, stopWaterLevel3, rainGauge, clientState, seaLevel, sluiceTime });
    return result;
  }
  async getByEquipmentId(equipmentId) {
    const result = await this.app.mysql.get('equipment_part', { equipmentId });
    return result;
  }
  async update(equipmentPort) {
    const result = await this.app.mysql.update('equipment_part', equipmentPort);
    return result;
  }
}
module.exports = EquipmentService;
