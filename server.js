//express
var express = require("express");
var app = express();
//cookie
var cookieParser = require('cookie-parser');
//mongo
var mongo = require("mongoskin");
var MongoServer = mongo.Server;
var MongoDb = mongo.Db;
var MongoClient = mongo.MongoClient;
//conf
var bdconf = require('./conf/db.conf');
//db
var db = new MongoDb('blog', new MongoServer(bdconf.local.host, bdconf.local.port));


//======================路由==========================
//静态文件
app.use("/statics", express.static( __dirname + "/statics" ));

app.get("/", function (req, res) {
    res.send("Hellow world!");
});

//预处理
app.use(cookieParser('RSYNK4KF1N4DDIA6'));
app.get("*", function (req, res, next) {
    req.db = db;
    // 通用方法
    req.helper = {
        toObjectID : mongo.helper.toObjectID,
    }
    next();
});

//登陆页面
app.get("/login", function (req, res) {
    res.sendfile(__dirname + "/html/login.html");
});

//userApi
var userApi = require("./actions/user_api.js");
app.use("/api/user", userApi);

//已登陆验证
var ifLogin = require('./middlewares/ifLogin.js')
app.use('*', ifLogin);

//文章页面
app.get('/article/item', function (req, res) {
    res.sendfile(__dirname + '/html/article_item.html');
})

//articleApi
var articleApi = require('./actions/article_api.js');
app.use("/api/article", articleApi);

app.get("/hongkonglaoma", function (req, res) {
    res.send('香港老妈');
});
//======================路由 end==========================

/*var testCollection = db.collection('blog', {strict: true});
testCollection.insert({"title": "test"}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})*/

app.listen(3030);

console.log('server listen on 3030');
