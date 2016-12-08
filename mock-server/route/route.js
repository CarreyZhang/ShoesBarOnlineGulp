'use strict';
// var init = function(express, app, upload) {
module.exports.init = function(express, app, upload) {
    var routerM, routesModules = [
      './module/template',
      './module/test'   
    ];

    var rootPath = '/api';
    for (var i=0, len=routesModules.length; i<len; i++) {
        routerM = require(routesModules[i]);
        // console.log('Object.prototype.toString.call(routerM.root)', Object.prototype.toString.call(routerM.root));
        // console.log('Object.prototype.toString.call(routerM.router)', Object.prototype.toString.call(routerM.router));
        var rootIsArray = Object.prototype.toString.call(routerM.root) === '[object Array]';
        var routerIsArray = Object.prototype.toString.call(routerM.router) === '[object Array]';
        if (!rootIsArray) {
            routerM.root = [routerM.root];
        };
        if (!routerIsArray) {
            routerM.router = [routerM.router];
        }

        for (var j=0, rootLen = routerM.root.length; j<rootLen; j++) {
            app.use(
                rootPath + routerM.root[j],
                routerM.interceptor || [],
                routerM.router[j] ? routerM.router[j](express, upload) : routerM.router[routerM.length - 1](express, upload)
                );
        }
    }
};

// module.exports = init;