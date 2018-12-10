'use strict';
const moment = require('moment');
const crypto = require('crypto');
module.exports = app => {
    app.beforeStart(async () => {
        app.moment = moment;
        app.timer = null;
        app.rooms = [];
        app.eqis = [];
        app.crypto = value => {
            const hash = crypto.createHmac('sha256', value)
                .update('')
                .digest('hex');
            return hash;
        };
        await app.redis.get('client2').flushdb();
        await app.redis.get('client1').flushdb();
        await app.redis.get('client1').subscribe('chat');
    });
};

