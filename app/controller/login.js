'use strict';

const Controller = require('../core/base_controller');

class LoginController extends Controller {
    async index() {
        const { userName = '', password = '' } = this.ctx.request.body;
        const { userName1 = '', password1 = '' } = this.config.user;
        if (!userName || !password) {
          return this.fail({}, '账号或密码不能为空');
        }
        if (userName !== userName1 || password !== password1) {
            return this.fail({}, '账号或密码输入有误');
        }
        this.ctx.cookies.set('admin', '123456', {
            maxAge: 30*60*1000,
            httpOnly: true,
            encrypt: true
        })
        console.log(this.config.user, 'jinrudenglu');
        this.success({
            id: 1,
            username: 'admin',
            password: '123456',
            avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
            name: '杨某某',
        });
    }
}

module.exports = LoginController;
