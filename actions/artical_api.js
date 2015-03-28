var express = require('express');
var articalApi = express();
var DB_articals = require('../modules/DB_articals.js');

articalApi.get('/item', function (req, res) {
    res.send('artical item');
});
