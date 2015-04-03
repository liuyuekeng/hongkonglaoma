var express = require('express');
var articleApi = express();
var DB_articles = require('../modules/DB_articles.js');
var paramsCheck = require('../middlewares/paramsCheck.js');

articleApi.use

articleApi.use('/item', paramsCheck({
    get : {
        id : {
            regexp: /\w+/
        }
    }
}));

function initDbObj (req, res, next){
    if (!req.db) {
        res.status(500).json({
            err : 'missing db in req'
        });
    } else {
        req.db_article = DB_articles(req.db);
        next();
    }
}

articleApi.use(initDbObj);

articleApi.get('/item', function (req, res) {
    res.send('article item');
});

articleApi.get('/list', function (req, res){
    var page = req.query.page;      // 页码
    var length = req.length.length; // 每页大小
    
    res.json(req.db_article.getArticlesList(page, length));
});
module.exports = articleApi;
