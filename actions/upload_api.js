var express = require('express');
var uploadApi = express();
var fs = require('fs');
var paramsCheck = require('../middlewares/paramsCheck.js');

uploadApi.post('/', function(req, res){
    console.log('lalala');
    console.log(req.files);
    console.log(req.body);
    res.end('test1');
});
uploadApi.get('/', function(req, res){
    console.log('lalala');
    console.log(req.files);
    console.log(req.body);
    res.end('test1');
});

module.exports = uploadApi;
