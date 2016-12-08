var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var Config = require('./config/config');
var app = express();

console.log('welcome to server........');

//for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(require('./middleware/cors.js'));
app.use(require('./middleware/delay.js'));

//Config router
function configRouter(express, app) {
    var router = require('./route/route');
    // console.log('*********************router****************************');
    // console.log('router', router);
    // console.log('*********************router****************************');
    router.init(express, app, upload);
    // router(express, app, upload);
};

//start server
function createServer(app, port) {
    var server = require('http').createServer(app);
    server.listen(port, function() {});
}

//handle exception
(function logError() {
    process.on('uncaughtException', function(err) {
        console.log(('uncaughtException' + err).red);
    });
    process.on('unhandledRejection', function(reason, p) {
        console.log('unhandled Rejection at:promise ', p, ' reason: ', reason);
    });    
})();

Config.init().then(function (configs) {
    // console.log('configs', configs);
    global.AppConfig = configs;
    configRouter(express, app);
    createServer(app, configs.mockServerPort);
});