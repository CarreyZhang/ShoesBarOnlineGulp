'use strict';
//mock network delay, delay 2s
var maxDelay = 2000;
var middleware = function(req, res, next) {
    setTimeout(function() {
        next();
    }, parseInt(Math.random()*maxDelay))
};

module.exports = middleware;