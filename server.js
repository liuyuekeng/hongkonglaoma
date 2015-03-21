//express
var express = require("express");
var app = express();
//mongo
var mongo = require("mongoskin");
var MongoServer = mongo.Server;
var MongoDb = mongo.Db;
var MongoClient = mongo.MongoClient;
//conf
var bdconf = require('./conf/db.conf');
//db
var db = new MongoDb('blog', new MongoServer(bdconf.local.host, bdconf.local.port));

*/
//======================路由==========================
//静态文件
app.use("/statics", express.static( __dirname + "/statics" ));

app.get("/", function (req, res) {
    res.send("Hellow world!");
});

app.get("/login", function (req, res) {
    res.sendfile(__dirname + "/html/login.html");
});

app.get("/api/*", function (req, res, next) {
    req.db = db;
    next();
});

var userApi = require("./actions/user_api.js");
app.use("/api/user", userApi);
app.get("/api/test", function (req, res) {
    res.send('hello');
});

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
