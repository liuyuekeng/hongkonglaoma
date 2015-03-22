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

function initDbObj (req, res, next) {
    if (!req.db) {
        res.status(500).json({
            err : 'missing db in req'
        });
    } else {
        req.db_users = DB_users(req.db);
        next();
    }
}

userApi.use(initDbObj);

userApi.use(userParamsValidate);

userApi.get('/login', function(req, res){
    function loginCallback (err, ret) {
        if (ret) {
            req.authenticaJson = {
                mongo_err: err,
                message: 'authentication success'
            }
            //保持登陆
            res.cookie('username', ret._id, {signed: true});
        } else {
            req.authenticaJson = {
                mongo_err: err,
                err: 'NO_RESULT',
                message: 'authentication fail'
            }
        }
        console.log(req.signedCookies.username);
        res.json(req.authenticaJson);
    }
    req.db_users.authentication(req.query.username, req.query.passwd, loginCallback);
});
userApi.get('/sigup', function(req, res){
    req.db_users.creatUser(req.query.username, req.query.passwd, req);
});
/*
userApi.get('/modpasswd', function(req, res){
    req.db_users.modPasswd(req.query.username, req.query.passwd, res);
});
userApi.get('/removeUser', function(req, res){
    req.db_users.removeUser(req.query.username);
});
*/

module.exports = userApi;
