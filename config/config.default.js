'use strict';

module.exports = appInfo => {
  const config = exports = {
      user: {
          userName1: 'admin',
          password1: '123456',
      },
      redis: {
          clients: {
              client1: {
                  port: 6379, // Redis port
                  host: '127.0.0.1', // Redis host
                  password: '',
                  db: 0,
              },
              client2: {
                  port: 6379, // Redis port
                  host: '127.0.0.1', // Redis host
                  password: '',
                  db: 0,
              },
          },
      },
      security: {
          csrf: {
              enable: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
          },
          xframe: {
              enable: false,
          },
      },
      mysql: {
          // 单数据库信息配置
          client: {
              // host
              host: 'localhost',
              // 端口号
              port: '3306',
              // 用户名
              user: 'root',
              // 密码
              password: '123456',
              // 数据库名
              database: 'gaoxiangmanage',
          },
          // 是否加载到 app 上，默认开启
          app: true,
          // 是否加载到 agent 上，默认关闭
          agent: false,
      },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542177065545_4758';

  // add your config here
  config.middleware = [];

  return config;
};
