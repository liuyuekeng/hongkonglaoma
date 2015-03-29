var express = require('express');
var articleApi = express();
var DB_articles = require('../modules/DB_articles.js');

articleApi.get('/item', function (req, res) {
    res.send('article item');
});
module.exports = articleApi;
