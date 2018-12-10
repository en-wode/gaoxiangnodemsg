'use strict';
const Service = require('egg').Service;

class EquipmentService extends Service {
  async addEquipmentPort(equipmentId, drainageOverflowHeight, InterceptingLimitflowHeight, sunnyToRain, vigilance, cod, ss, startWaterLevel1, stopWaterLevel1, startWaterLevel2, stopWaterLevel2, startWaterLevel3, stopWaterLevel3, rainGauge, clientState, seaLevel, pattern, bottomHoleHeight, truncatedPipeHeight, sewerageSluiceHeight, groundHeight, sewerageSluice, sluiceHeight, ph) {
    const result = await this.app.mysql.insert('equipment_part_copy', { equipmentId, drainageOverflowHeight, InterceptingLimitflowHeight, sunnyToRain, vigilance, cod, ss, startWaterLevel1, stopWaterLevel1, startWaterLevel2, stopWaterLevel2, startWaterLevel3, stopWaterLevel3, rainGauge, clientState, seaLevel, pattern, bottomHoleHeight, truncatedPipeHeight, sewerageSluiceHeight, groundHeight, sewerageSluice, sluiceHeight, ph });
    return result;
  }
  async getByEquipmentId(equipmentId, pattern) {
    const result = await this.app.mysql.get('equipment_part_copy', { equipmentId, pattern });
    return result;
  }
  async getListByEquipmentId(equipmentId) {
    const result = await this.app.mysql.select('equipment_part_copy', { where: { equipmentId } });
    return result;
  }
  async update(equipmentPort) {
    const result = await this.app.mysql.update('equipment_part_copy', equipmentPort);
    return result;
  }
}
module.exports = EquipmentService;
