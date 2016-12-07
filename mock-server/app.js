var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var Config = require('./Config/Config');
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
    var router = require('./router/router');
    router.init();
};