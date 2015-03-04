var express = require("express");
var app = express();
//var fs = require("fs");
//var path = require("path");
//var bodyParser = require("body-parser");

//静态文件
//app.use("/statics", express.static( __dirname + "/public" ));


app.get("/", function (req, res) {
    res.send("Hellow world!");
});

app.get("/hongkonglaoma", function (req, res) {
    res.send('香港老妈');
});

app.listen(3030);

console.log('server listen on 3030');
