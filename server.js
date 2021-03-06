//express
var express = require("express");
var app = express();
//cookie
var cookieParser = require('cookie-parser');
//body
var bodyParser = require('body-parser');
var multer = require('multer');
//mongo
var mongo = require("mongoskin");
var MongoServer = mongo.Server;
var MongoDb = mongo.Db;
var MongoClient = mongo.MongoClient;
// 数据库配置
var bdconf = require('./conf/db.conf');
// 选取远程配置
var remoteHost = bdconf.remote;
// var localHost = bdconf.local;
//db
var db = new MongoDb('blog', new MongoServer(remoteHost.host, remoteHost.port));
db.authenticate(remoteHost.user, remoteHost.password, function(err,data){
});

//======================路由==========================
//静态文件
app.use("/statics", express.static( __dirname + "/statics" ));

app.get("/", function (req, res) {
    res.send("Hellow world!");
});

//预处理
app.use(cookieParser('RSYNK4KF1N4DDIA6'));              //cookie签名秘钥
app.use(bodyParser.urlencoded({ extended: true}));    //post参数解析
app.use(multer({dest: './tmp/'}));      // 处理 multipart/form-data
app.all("*", function (req, res, next) {
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

//文章列表
app.get('/article', function (req, res) {
    res.sendfile(__dirname + '/html/article.html');
});

//文章页面
app.get('/article/item', function (req, res) {
    res.sendfile(__dirname + '/html/article_item.html');
});

//文章编辑页面
app.get('/article/edit', function (req, res) {
    res.sendfile(__dirname + '/html/article_edit.html');
});

//articleApi
var articleApi = require('./actions/article_api.js');
app.use("/api/article", articleApi);

app.get("/hongkonglaoma", function (req, res) {
    res.send('香港老妈');
});

// 文件上传页面
app.get('/upload', function(req, res){
    res.sendfile(__dirname + '/html/upload.html');
});

// 上传 api
var uploadApi = require('./actions/upload_api.js');
app.use('/api/upload', uploadApi);
// 占位
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
