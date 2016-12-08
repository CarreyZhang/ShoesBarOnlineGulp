'use strict';
var middleware = function(req, res, next) {
    //cors access
    // console.log('global.AppConfig.allowOrigin', global.AppConfig.allowOrigin);
    res.header('Access-Control-Allow-Origin', global.AppConfig.allowOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', 3600);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    //cors access option request
    if ('OPTIONS'===req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

module.exports = middleware;