'use strict';

const Controller = require('../core/base_controller');

class ioController extends Controller {
  async getData() {
    const { ctx, app } = this;
    const equipmentId = this.ctx.query.equipmentId;
      console.log(equipmentId, 'equipmentId');
      const equipmentArameters = await ctx.service.equipmentArameters.listByState(equipmentId);
    const equipmentPort = await ctx.service.equipmentPort.getByEquipmentId(equipmentId);
    if (!equipmentPort) {
      return;
    }
    const equipment = await ctx.service.equipment.getEquipmentById(equipmentId);
      console.log(' io ');
      equipmentArameters.bottomHoleHeight = equipmentPort.bottomHoleHeight ? equipmentPort.bottomHoleHeight : 0;
    /* 进水管 */
    equipmentArameters.truncatedPipeHeight = equipmentPort.truncatedPipeHeight;
    equipmentArameters.inletPipeHeight = equipmentPort.inletPipeHeight;
    /* 污水管 */
    equipmentArameters.sewerageSluiceHeight = equipmentPort.sewerageSluiceHeight;
    /* 进水闸 */
    equipmentArameters.sluiceHeight = equipmentPort.sluiceHeight;
    /* 污水闸 */
    equipmentArameters.sewerageSluice = equipmentPort.sewerageSluice;
    const bth = (equipmentArameters.bottomHoleHeight - 10000) / 100;
    equipmentArameters.creatTime = app.moment(equipmentArameters.creatTime).format('YYYY-MM-DD HH:mm:ss');
    // equipmentArameters.waterLevelInWell= (equipmentArameters.waterLevelInWell/100 + (equipmentArameters.bottomHoleHeight-10000)/100).toFixed(2);
    equipmentArameters.ss === 4294967295 ? equipmentArameters.ss = '???' : equipmentArameters.ss = equipmentArameters.ss / 100;
    equipmentArameters.cod === 65535 ? equipmentArameters.cod = '???' : equipmentArameters.cod = equipmentArameters.cod / 100;
    equipmentArameters.sewageFlow1 === 65535 ? equipmentArameters.sewageFlow1 = '???' : equipmentArameters.sewageFlow1 = equipmentArameters.sewageFlow1 / 100;
    equipmentArameters.sewageFlow2 === 65535 ? equipmentArameters.sewageFlow2 = '???' : equipmentArameters.sewageFlow2 = equipmentArameters.sewageFlow2 / 100;
    equipmentArameters.totalDischargeOfSewage1 === 4294967295 ? equipmentArameters.totalDischargeOfSewage1 = '???' : equipmentArameters.totalDischargeOfSewage1 = equipmentArameters.totalDischargeOfSewage1;
    equipmentArameters.totalDischargeOfSewage2 === 4294967295 ? equipmentArameters.totalDischargeOfSewage2 = '???' : equipmentArameters.totalDischargeOfSewage2 = equipmentArameters.totalDischargeOfSewage2;

    equipmentArameters.waterLevelInWell === 65535 ? equipmentArameters.waterLevelInWell = '???' : equipmentArameters.waterLevelInWell = trans(equipmentArameters.waterLevelInWell, bth);
    equipmentArameters.riveRaterLevel === 65535 ? equipmentArameters.riveRaterLevel = '???' : equipmentArameters.riveRaterLevel = trans(equipmentArameters.riveRaterLevel, bth);
    equipmentArameters.waterLevelOfSewagePipe === 65535 ? equipmentArameters.waterLevelOfSewagePipe = '???' : equipmentArameters.waterLevelOfSewagePipe = trans(equipmentArameters.waterLevelOfSewagePipe, bth);
    equipmentArameters.garbageHeight === 65535 ? equipmentArameters.garbageHeight = '???' : equipmentArameters.garbageHeight = trans(equipmentArameters.garbageHeight, bth);
    if (equipmentArameters.waterPump1 === 0) {
      equipmentArameters.waterPump1 = '停';
    } else {
      equipmentArameters.waterPump1 = '开';
    }
    if (equipmentArameters.waterPump2 === 0) {
      equipmentArameters.waterPump2 = '停';
    } else {
      equipmentArameters.waterPump2 = '开';
    }
    if (equipmentArameters.waterPump3 === 0) {
      equipmentArameters.waterPump3 = '停';
    } else {
      equipmentArameters.waterPump3 = '开';
    }
    if (equipmentArameters.hydraulicPumpMotor === 0) {
      equipmentArameters.hydraulicPumpMotor = '停';
    } else {
      equipmentArameters.hydraulicPumpMotor = '开';
    }


      if((equipmentArameters.sluiceSwitch&0x30) == 0x20)
          equipmentArameters.sluiceSwitch = '关(堵)';
      else if((equipmentArameters.sluiceSwitch&0x30) == 0x10)
          equipmentArameters.sluiceSwitch = '开(堵)';
      else if((equipmentArameters.sluiceSwitch&3) === 2)
          equipmentArameters.sluiceSwitch = '关';
      else if ((equipmentArameters.sluiceSwitch&3) === 1)
          equipmentArameters.sluiceSwitch = '开';
      else {
          equipmentArameters.sluiceSwitch = '停';
      }

      if((equipmentArameters.sluiceSwitch2&0x30) == 0x20)
          equipmentArameters.sluiceSwitch2 = '关(堵)';
      else if((equipmentArameters.sluiceSwitch2&0x30) == 0x10)
          equipmentArameters.sluiceSwitch2 = '开(堵)';
      else if((equipmentArameters.sluiceSwitch2&3) === 2)
          equipmentArameters.sluiceSwitch2 = '关';
      else if ((equipmentArameters.sluiceSwitch2&3) === 1)
          equipmentArameters.sluiceSwitch2 = '开';
      else {
          equipmentArameters.sluiceSwitch2 = '停';
      }

      if((equipmentArameters.sluiceSwitch3&0x30) == 0x20)
          equipmentArameters.sluiceSwitch3 = '关(堵)';
      else if((equipmentArameters.sluiceSwitch3&0x30) == 0x10)
          equipmentArameters.sluiceSwitch3 = '开(堵)';
      else if((equipmentArameters.sluiceSwitch3&3) === 2)
          equipmentArameters.sluiceSwitch3 = '关';
      else if ((equipmentArameters.sluiceSwitch3&3) === 1)
          equipmentArameters.sluiceSwitch3 = '开';
      else {
          equipmentArameters.sluiceSwitch3 = '停';
      }
    // if (equipmentArameters.sluiceSwitch === 0) {
    //   equipmentArameters.sluiceSwitch = '停';
    // } else if (equipmentArameters.sluiceSwitch === 1) {
    //   equipmentArameters.sluiceSwitch = '开';
    // } else {
    //   equipmentArameters.sluiceSwitch = '关';
    // }


    if (equipmentArameters.sluiceSluiceSwitch === 0) {
      equipmentArameters.sluiceSluiceSwitch = '停';
    } else if (equipmentArameters.sluiceSluiceSwitch === 1) {
      equipmentArameters.sluiceSluiceSwitch = '开';
    } else {
      equipmentArameters.sluiceSluiceSwitch = '关';
    }
    if (equipmentArameters.liftingGrid === 0) {
      equipmentArameters.liftingGrid = '停';
    } else if (equipmentArameters.liftingGrid === 1) {
      equipmentArameters.liftingGrid = '升';
    } else {
      equipmentArameters.liftingGrid = '降';
    }
    equipmentArameters.addressX = equipment.addressX;
    equipmentArameters.addressY = equipment.addressY;
    // console.log(equipmentArameters);
    // await ctx.socket.nsp.to(ctx.socket.id).emit(name, equipmentArameters);
    // await ctx.socket.emit(equipmentArameters);
    // for (const item of app.rooms[id]) {
    //   await ctx.socket.nsp.to(item).emit(name, equipmentArameters);
    // }
    try {
      this.success(equipmentArameters);
    } catch (err) {
      ctx.app.logger.error('#error');
    }
  }
}
function trans(value, btht) {
  return parseFloat((value / 100 + btht).toFixed(2));
}
module.exports = ioController;
