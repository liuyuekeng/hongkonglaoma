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

articleApi.get('/item', function (req, res) {
    res.send('article item');
});
module.exports = articleApi;
