/** Created by wanan on 2018\11\14 0014
 *作者:wanan
 */
module.exports = function(app) {
    app.role.use('user', async ctx => {
        // const hash = app.crypto(password);
        console.log('user')
        const cookie = ctx.cookies.get('login', {
            signed: false,
            encrypt: true,
        });
        let result = 0;
        console.log(cookie, 'cookie');
        if (cookie) {
            const jsonCookie = JSON.parse(cookie);
            const time = await app.redis.get('client2').get(jsonCookie.name);
            if (jsonCookie.time.toString() !== time) {
                result = 0;
            } else {
                result = 1;
            }
        } else {
            result = 0;
        }
        return !!result;
    });
    app.role.use('isAdmin', function(ctx) {
        const username = ctx.cookies.get('admin', {
            encrypt: true,
        });
        return !!username;
    });
    app.role.failureHandler = function(ctx) {
        ctx.body = { code: 0, msg: 2000 };
    };
};