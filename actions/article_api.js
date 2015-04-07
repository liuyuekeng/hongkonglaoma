var express = require('express');
var articleApi = express();
var paramsCheck = require('../middlewares/paramsCheck.js');

var initDbObj = require('../middlewares/initDbObj.js');

articleApi.use(initDbObj({
    moduleName: 'DB_articles',
    injectName: 'db_articles'
}));

articleApi.use('/item', paramsCheck({
    get : {
        id : {
            regexp: /\w+/
        }
    }
}));

articleApi.get('/item', function (req, res) {
    console.log(req.db_articles);
    res.send('article item');
});

articleApi.get('/list', function (req, res){
    var page = req.query.page;      // 页码
    var length = req.length.length; // 每页大小
    
    res.json(req.db_articles.getArticlesList(page, length));
});
module.exports = articleApi;
