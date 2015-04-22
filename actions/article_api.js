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
            regexp: /\w+/
        }
    }
}));

articleApi.get('/item', function (req, res) {
    console.log(req.db_articles);
    res.send('article item');
});

articleApi.use('/edit', paramsCheck({
    post: {
        title: {
            regexp: /\w+/
        },
        content: {
            regexp: /.+/
        },
        articleId: {
            regexp: /.+/
        },
        userId: {
            regexp: /.+/
        }
    }
}));

articleApi.post('/edit', function (req, res) {
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

articleApi.get('/list', function (req, res){
    var page = req.query.page;      // 页码
    var length = req.length.length; // 每页大小
    
    res.json(req.db_articles.getArticlesList(page, length));
});
module.exports = articleApi;
