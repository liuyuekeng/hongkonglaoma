var express = require('express');
var articleApi = express();
var paramsCheck = require('../middlewares/paramsCheck.js');

var initDbObj = require('../middlewares/initDbObj.js');

articleApi.use(initDbObj({
    moduleName: 'DB_articles',
    injectName: 'db_articles'
}));

articleApi.use('/item', paramsCheck({
    get: {
        id: {
            regexp: /\w{24}/
        }
    }
}));

articleApi.get('/item', function (req, res) {
    function callback (err, ret) {
        if (ret) {
            res.json({
                err: 0,
                message: 'get article success',
                ret: ret
            });
        } else {
            res.json({
                mongo_err: err,
                err: 'NO_RESULT',
                message: 'get article failed'
            });
        }
    }

    req.db_articles.getArticle(
        req.helper.toObjectID(req.query.id),
        callback);
});

articleApi.use('/new', paramsCheck({
    post: {
        title: {
            regexp: /\w+/,
        },
        content: {
            regexp: /.+/,
        }
    }
}));

articleApi.post('/new', function (req, res) {
    function callback (err, ret) {
        if (ret) {
            res.json({
                err: 0,
                message: 'create article success',
                ret: ret
            });
        } else {
            res.json({
                mongo_err: err,
                err: 'NO_RESULT',
                message: 'create article failed'
            });
        }
    }
    
    req.db_articles.addArticle({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags ? req.body.tags.split(',') : [],
        autherName: req.userName,
        autherId: req.userId,
        private: req.body.private
    }, callback);
});

articleApi.use('/up', paramsCheck({
    post: {
        title: {
            regexp: /\w+/
        },
        content: {
            regexp: /.+/
        },
        articleId: {
            regexp: /\w{24}/
        }
    }
}));

articleApi.use('/up', function (req, res) {
    function callback (err, ret) {
        res.json({
            err: 0,
            message: 'done'
        });
    }
    
    req.db_articles.modArticle(
        req.helper.toObjectID(req.body.articleId),
        req.userId,
        {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags ? req.body.tags.split(',') : [],
            private: req.body.private
        }, callback);
});

articleApi.get('/list', function (req, res){
    var page = req.query.page;      // 页码
    var length = req.query.length; // 每页大小
    
    var ret = req.db_articles.getArticlesList(
        page, length,
        function(err, data){
            res.json({
                err: err,
                data: data
            });
    });
});
module.exports = articleApi;
