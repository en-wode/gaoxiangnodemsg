'use strict';
const Controller = require('../core/base_controller');
class EquipmentController extends Controller {
  async matching() {
    const { equipmentName = '', equipmentPassword = 0, userId = 0 } = this.ctx.request.body;
    if (!equipmentName) {
      return this.fail({}, '设备码不能为空');
    }
    if (!equipmentPassword) {
      return this.fail({}, '设备密码不能为空');
    }
    if (!userId) {
      return this.fail({}, '用户不能为空');
    }
    const code = await this.app.userOvertime(this, 'login');
    if (code === 2000) {
      this.ctx.body = { code };
    } else if (code === 0) {
      this.fail();
    } else {
      const equipments = [
        {
          name: '设备一',
          equipmentName: '001',
          equipmentPassword: '123456',
        },
        {
          name: '设备二',
          equipmentName: '002',
          equipmentPassword: '123456',
        },
        {
          name: '设备三',
          equipmentName: '003',
          equipmentPassword: '123456',
        },
        {
          name: '设备四',
          equipmentName: '004',
          equipmentPassword: '123456',
        },
      ];
      const matchingSuccess = equipments.filter(item => {
        return item.equipmentName === equipmentName && item.equipmentPassword === equipmentPassword;
      });
      if (matchingSuccess.length > 0) {
        for (const item of matchingSuccess) {
          const equipment = await this.ctx.service.equipment.getEquipment(item.name, item.equipmentName, equipmentPassword);
          if (!equipment) {
            const result = await this.ctx.service.equipment.addEquipment(item.name, item.equipmentName, equipmentPassword);
            await this.ctx.service.userequipment.addUserEquipment(result.insertId, userId);
            this.success({ equipmentId: result.insertId }, '添加成功');
          } else {
            const result = await this.ctx.service.userequipment.getUserEquipment(equipment.id, userId);
            if (!result) {
              await this.ctx.service.userequipment.addUserEquipment(equipment.id, userId);
              this.success({ equipmentId: equipment.id }, '添加成功');
            } else {
              this.fail({}, '设备已存在');
            }
          }
        }
      } else {
        this.fail({}, '添加失败，设备未找到');
      }
    }
  }
  async list() {
    const { userId = 0 } = this.ctx.request.query;
    if (!userId) {
      return this.fail({}, '用户不能为空');
    }
    const list = await this.ctx.service.userequipment.getListByUserId(userId);
    console.log(list)
    const result = [];
      for (const item of list) {
      const equipment = await this.ctx.service.equipment.getEquipmentById(item.equipmentId);
      if (equipment) {
          if(item.equipmentId == '37'){
              console.log(item);
          }
        const equipment_arameter = await this.ctx.service.equipmentArameters.getByEquipmentId(item.equipmentId);
          if(item.equipmentId == '37'){
              console.log(equipment_arameter, 'equipment_arameter');
          }
          const equipment_port = await this.ctx.service.equipmentPort.getByEquipmentId(item.equipmentId);

          if (equipment_arameter) {
          equipment.userEquipment = item.id;
          equipment.isConnection = equipment_arameter.isConnection;
          equipment.nowPattern = equipment_arameter.nowPattern;
          equipment.pressureGauge = equipment_arameter.pressureGauge;
          equipment.pattern = equipment_port.pattern;
          result.push(equipment);
          }
      }
    }
    this.success(result);
  }
  async getById() {
    const { equipmentId = 0 } = this.ctx.request.query;
    if (!equipmentId) {
      return this.fail({}, '设备不存在');
    }
    const equipment = await this.ctx.service.equipment.getEquipmentById(equipmentId);
    this.success(equipment);
  }
  async update() {
    const { equipmentId = 0, addressX = 0, addressY = 0 } = this.ctx.request.body;
    if (!equipmentId) {
      return this.fail({}, '设备不存在');
    }
    const equipment = await this.ctx.service.equipment.getEquipmentById(equipmentId);
    if (!equipment) {
      return this.fail({}, '设备不存在');
    }
    equipment.addressX = addressX;
    equipment.addressY = addressY;
    await this.ctx.service.equipment.update(equipment);
    this.success();
  }
  async getAllList() {
    const result = await this.ctx.service.equipment.getAllList();
    console.log(result, 'getlist')
    for (const item of result) {
      const userEquipments = await this.ctx.service.userequipment.getListByEquipmentId(item.id);
      console.log(userEquipments, 'userEquipments');
      const users = await Promise.all(userEquipments.map(async i => {
        const user = await this.ctx.service.user.getUserInfoById(i.userId);
              console.log(users, 'users');
              return user.name;
      }
      ));
      item.users = users.join(',');
    }
    this.success(result);
  }
  async setEquipmentConfig() {
    // const result = await this.ctx.service.equipment.getAllList();
    const { time = 0, insideTheWellHeight = 0, hanoiWaterLevel = 0, waterInterceptionPipe = 0, equipmentId = 0 } = this.ctx.request.body;
    const equipment = await this.ctx.service.equipment.getEquipmentById(equipmentId);
    if (!time) {
      return this.fail({}, '上传状态时间间隔');
    }
    if (!insideTheWellHeight) {
      return this.fail({}, '井内水位传感器长度');
    }
    if (!hanoiWaterLevel) {
      return this.fail({}, '河道水位传感器长度');
    }
    if (!waterInterceptionPipe) {
      return this.fail({}, '截污管水位传感器长度');
    }
    equipment.time = time;
    equipment.insideTheWellHeight = insideTheWellHeight;
    equipment.hanoiWaterLevel = hanoiWaterLevel;
    equipment.waterInterceptionPipe = waterInterceptionPipe;
    // for (const item of result) {
    //   const userEquipments = await this.ctx.service.userequipment.getListByEquipmentId(item.id);
    //   const users = await Promise.all(userEquipments.map(async i => {
    //     const user = await this.ctx.service.user.getUserInfoById(i.userId);
    //     return user.name;
    //   }
    //   ));
    //   console.log(users);
    //   item.users = users.join(',');
    // }
    // this.success(result);
  }
  async delete() {
    const { userEquipmentId = 0 } = this.ctx.request.body;
    if (!userEquipmentId) {
      return this.fail({}, '不能删除设备');
    }
    await this.ctx.service.userequipment.delete(userEquipmentId);
    this.success({}, '删除成功');
  }
}

module.exports = EquipmentController;
