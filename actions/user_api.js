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

userApi.use(userParamsValidate);

userApi.use(initDbObj);

userApi.get('/login', function(req, res){
    req.db_users.authentication(req.query.username, req.query.passwd, res);
});
userApi.get('/sigup', function(req, res){
    req.db_users.creatUser(req.query.username, req.query.passwd, res);
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
