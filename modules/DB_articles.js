/**articles表结构
 * title
 * content
 * tags
 * autherName
 * autherId
 * private
 */
var Article = function (db) {
    if (!db.articles) {
        db.bind('articles');
    }
    var articles = db.articles;
    var getArticlesByUserId = function (userId) {
        var ret = articles.find({'autherId' : userId});
        return ret;
    }
    var getArticle = function (articleId, callback) {
        var ret = articles.findOne({'_id' : articleId}, callback);
        return ret;
    }
    // 获取文章列表，接受两个参数
    // page: 页码
    // length: 每页数量
    var getArticlesList = function(page, length){
        var ret = articles.find().limit(length).skip(page*length);
        return ret;
    }
    var addArticle = function (insertObj, callback) {
        articles.insert(insertObj, callback);
    }
    var modArticle = function (articleId, userId, articleObj, callback) {
        articles.update(
            {
                '_id': articleId,
                'autherId': userId
            },
            {'$set': articleObj},
            callback
        );
    }
    var delArticle = function (articleId) {
        articles.remove({'_id' : articleId});
    }
    return {
        'articles' : articles,
        'getArticle' : getArticle,
        'getArticlesList' : getArticlesList,
        'addArticle' : addArticle,
        'modArticle' : modArticle,
        'delArticle' : delArticle
    };
}
module.exports = Article;
