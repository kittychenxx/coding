module.exports = {
    //=>WEB服务端口号
    PORT: 3001,
    //=>CROS跨域相关信息
    CROS: {
        ALLOW_ORIGIN: 'http://127.0.0.1:5500',
        ALLOW_METHODS: 'PUT,POST,GET,DELETE,OPTIONS,HEAD',
        HEADERS: 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With',
        // 请求允许带cookie
        CREDENTIALS: true
    }
};

app.use((req, res, next) => {
    const {
        ALLOW_ORIGIN,
        CREDENTIALS,
        HEADERS,
        ALLOW_METHODS
    } = CONFIG.CROS;
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Credentials", CREDENTIALS);
    res.header("Access-Control-Allow-Headers", HEADERS);
    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});