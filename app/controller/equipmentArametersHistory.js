/** Created by wanan on 2018\12\2 0002
 *作者:wanan
 */
const Controller = require('../core/base_controller');
class EquipmentArametersHistoryController extends Controller {
    async getByEquipmentId() {
        const { equipmentId = 0, title= 'creatTime'} = this.ctx.request.query;
        if (typeof Number(equipmentId) !== 'number'){
            return this.fail({}, '请传入设备ID')
        }
        const equipment = await this.ctx.service.equipment.getEquipmentById(equipmentId);
        if (!equipment) {
            return this.fail({}, '设备不存在');
        }
        const getData1 = async () => {
            const equipmentArameter = await this.ctx.service.equipmentArametersHistory.getByEquipmentId1(equipmentId, title);
            return equipmentArameter;
        };

        const equipmentArameters = [];

        const operation = async () => {
            const data = await Promise.all([ getData1()]);
            console.log(data[0], '1');
            console.log(data[0][title], '2');
            console.log(data[0][1][title], '3');
            for (let i = 0; i < data[0].length; i++) {
                if (data[0][i]) {
                    equipmentArameters.push({ title: data[0][i][title], creatTime: this.app.moment(data[0][i].creatTime).format('YYYY-MM-DD') });
                } else {
                    equipmentArameters.push({ title: 0, creatTime: day });
                }
            }
            return equipmentArameters;
        };
        let equipmentArameters2 = await operation();
        this.success(equipmentArameters2);
    }
}
module.exports = EquipmentArametersHistoryController;
