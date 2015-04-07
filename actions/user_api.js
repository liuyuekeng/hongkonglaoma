var express = require('express');
var userApi = express();
var DB_users = require("../modules/DB_users.js");

function userParamsValidate (req, res, next) {
    if (!req.query.username || !req.query.passwd) {
        res.status(500).json({
            err : 'missing params'
        });
    } else {
        next();
    }
}

var InitDbObj = require('../middlewares/initDbObj.js');

userApi.use(new InitDbObj({
    moduleName: 'DB_users',
    injectName: 'db_users'
}));

var paramsCheck = require('../middlewares/paramsCheck.js');

userApi.use('/login', paramsCheck({
    get : {
        username : {
            regexp : /\w+/
        },
        passwd : {
            regexp : /\w+/
        }
    }
}));

userApi.get('/login', function(req, res){
    function loginCallback (err, ret) {
        if (ret) {
            req.authenticaJson = {
                mongo_err: err,
                message: 'authentication success'
            }
            //保持登陆
            res.cookie('userId', ret._id, {signed: true});
        } else {
            req.authenticaJson = {
                mongo_err: err,
                err: 'NO_RESULT',
                message: 'authentication fail'
            }
        }
        res.json(req.authenticaJson);
    }
    req.db_users.authentication(req.query.username, req.query.passwd, loginCallback);
});
/*
userApi.get('/sigup', function(req, res){
    req.db_users.creatUser(req.query.username, req.query.passwd, req);
});
userApi.get('/modpasswd', function(req, res){
    req.db_users.modPasswd(req.query.username, req.query.passwd, res);
});
userApi.get('/removeUser', function(req, res){
    req.db_users.removeUser(req.query.username);
});
*/

module.exports = userApi;
