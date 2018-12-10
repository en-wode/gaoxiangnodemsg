'use strict';
const Controller = require('../core/base_controller');
class UserController extends Controller {
  async addUserOrUpdate() {
    const { name = '', password = '', grade = 0, address = '', id = 0 } = this.ctx.request.body;
    const check = user(name, password, grade, address);
    const list = await this.ctx.service.user.list();
    const isReapet = repeatName(list, name, id);
    console.log('xiugai123')
    if (isReapet) {
      this.fail({}, isReapet);
    } else if (!check) {
      if (id > 0) {
        // 修改用户
          console.log('xiugai')
          const user = await this.ctx.service.user.getUserInfoById(id);
        const passwordNum = isSamePassword(this.app, user, password);
        if (passwordNum) {
          user.name = name;
          user.grade = grade;
          user.address = address;
          this.ctx.service.user.update(user);
          this.success();
        } else {
          this.fail({}, '密码不对');
        }
      } else {
          console.log('tianjia');
          // 添加用户
        const secret = password;
          console.log(secret, 'tianjia1');
          const hash = this.app.crypto(secret);
          console.log('tianjia2')
          await this.ctx.service.user.saveUserInfo(name, hash, grade, new Date(), address);
        this.success();
      }
    } else {
      this.fail({}, check);
    }
  }
  async login() {
      console.log('controller-login');
    const { name = '', password = '' } = this.ctx.request.body;
    if (!name) {
      return this.fail({}, '账号不能为空');
    }
    if (!password) {
      return this.fail({}, '密码不能为空');
    }
    const hash = this.app.crypto(password);
    const user = await this.ctx.service.user.login(name, hash);
    if (user) {
      const time = new Date().getTime();
      const cookie = { name, time };
      await this.app.redis.get('client2').set(name, time);
      this.ctx.cookies.set('login', JSON.stringify(cookie), {
        maxAge: 30 * 60 * 1000,
        httpOnly: false, // 默认就是 true
        encrypt: true, // 加密传输
      });
      this.success({ userId: user.id, userName: user.name }, '登录成功');
    } else {
      this.fail({}, '密码或者账号出错');
    }
  }
  async modifyPassword() {
    const { name, oldPassword, newPassword1, newPassword2 } = this.ctx.request.body;
    if (!name) {
      return this.fail({}, '账号不能为空');
    }
    if (!oldPassword) {
      return this.fail({}, '原始密码不能为空');
    }
    if (!newPassword1) {
      return this.fail({}, '新密码不能为空');
    }
    if (!newPassword2) {
      return this.fail({}, '再次输入密码不能为空');
    }
    if (newPassword1 !== newPassword2) {
      return this.fail({}, '两次输入的密码不一致');
    }
    const hash = this.app.crypto(oldPassword);
    const user = await this.ctx.service.user.login(name, hash);
    if (user) {
      const hash = this.app.crypto(newPassword1);
      user.password = hash;
      await this.ctx.service.user.update(user);
      this.success();
    } else {
      this.fail({}, '密码或者账号出错');
    }
  }
  async list() {
      console.log('controlllist1');
    const list = await this.ctx.service.user.list();
    for (const item of list) {
      item.createTime = this.app.moment(item.createTime).format('YYYY-MM-DD HH:mm');
    }
    console.log(list, 'controlllist');
    this.success(list);
  }
  async setUserJsc() {
    const { userId = 0, jurisdictionId = 0 } = this.ctx.request.body;
    if (!userId) {
      return this.fail({}, '不是合法用户');
    }
    if (!jurisdictionId) {
      return this.fail({}, '请选择等级');
    }
    const user = await this.ctx.service.user.getUserInfoById(userId);
    if (!user) {
      return this.fail({}, '用户不存在');
    }
    user.jurisdictionId = jurisdictionId;
    await this.ctx.service.user.update(user);
    this.success();
  }
  async getUserById() {
    const { userId = 0 } = this.ctx.request.query;
    if (!userId) {
      return this.fail({}, '不是合法用户');
    }
    const user = await this.ctx.service.user.getUserInfoById(userId);
    if (!user) {
      return this.fail({}, '用户不存在');
    }
    user.password = '';
    this.success(user);
  }
  async isWatch() {
    try {
      const { userId = 0, equipmentId = 0, where = 0 } = this.ctx.request.query;
      if (!userId) {
        return this.fail({}, '不是合法用户');
      }
      if (!equipmentId) {
        return this.fail({}, '设备不存在');
      }
      const user = await this.ctx.service.user.getUserInfoById(userId);
      if (!user) {
        return this.fail({}, '用户不存在');
      }
      const isWatch = await this.ctx.service.video.getByEquipmentIdAndWhere(equipmentId, where);
      const getAccessToken = await this.app.curl('https://open.ys7.com/api/lapp/token/get?appKey=77be9952adc9483a98e450c2999a85ab&appSecret=ceda8fe487dd712cb3ba71841ed7a08f', {
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        dataType: 'json',
        data: {
          appKey: '77be9952adc9483a98e450c2999a85ab',
          appSecret: 'ceda8fe487dd712cb3ba71841ed7a08f',
        },
      });
      const accessToken = getAccessToken.data.data.accessToken;
      if (getAccessToken && accessToken && isWatch && isWatch.videoNum) {
        const getEquipmentInfo = await this.app.curl(`https://open.ys7.com/api/lapp/live/address/limited?accessToken=${accessToken.toString()}&deviceSerial=${isWatch.videoNum.toString()}&channelNo=1&expireTime=300`, {
          method: 'POST',
          // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
          contentType: 'application/x-www-form-urlencoded',
          dataType: 'json',
        });
        let msg = '设备在线';
        if (getEquipmentInfo.data.data.status === 1) {
          return this.success(msg);
        }
        msg = '设备不在线';
        return this.fail('', msg);
      }
      return this.fail(getAccessToken.data.msg, '当前无设备');
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }
}

function repeatName(arr, name, id) {
  const isRepeat = arr.some(item => {
    return item.name === name && item.id !== id;
  });
  let info = '';
  if (isRepeat) {
    info = '账号已重复';
  }
  return info;
}
function user(name = '', password = '', grade = 0, address = '') {
  let info = '';
  if (!name) {
    info = '姓名不能为空';
  } else if (!password) {
    info = '密码不能为空';
  } else if (!grade) {
    info = '请选择等级';
  } else if (!address) {
    info = '地址不能为空';
  }
  return info;
}
function isSamePassword(app, user, password) {
  const hash = app.crypto(password);
  let result = 0;
  if (hash === user.password) {
    result = 1;
  }
  return result;
}
module.exports = UserController;
