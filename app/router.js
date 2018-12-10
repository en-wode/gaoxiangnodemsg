'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // const user = app.role.can('user');
    // const isAdmin = app.role.can('isAdmin');
    router.get('/', controller.home.index);
    /*gaoxiangadmin*/
    router.post('/login', controller.login.index);
    router.get('/user/list', controller.user.list);
    router.post('/user/addUserOrUpdate', controller.user.addUserOrUpdate);
    // jurisdiction 权限
    router.post('/jurisdiction/addJsc', controller.jurisdiction.addJsc);
    router.get('/jurisdiction/list', controller.jurisdiction.list);
    /*获取所有设备列表及观看人数*/
    router.get('/equipment/getAllList', controller.equipment.getAllList);



    /*gaoxiangmsg*/
    router.post('/user/login', controller.user.login);
    router.post('/user/modifyPassword', controller.user.modifyPassword);
    // logs
    // router.get('/logs/getLogs', controller.logs.getLogs);
    router.get('/io/getData', controller.io.getData);
    router.get('/equipment/list', controller.equipment.list);
    router.get('/equipmentArametersHistory/getByEquipmentId', controller.equipmentArametersHistory.getByEquipmentId);
};
