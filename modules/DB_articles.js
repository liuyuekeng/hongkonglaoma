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
    var getArticleByArticleId = function (articleId) {
        var ret = articles.findOne({'_id' : articleId});
        return ret;
    }
    // 获取文章列表，接受两个参数
    // page: 页码
    // length: 每页数量
    var getArticlesList = function(page, length){
        var ret = articles.find().limit(length).skip(page*length);
        return ret;
    }
    var addArticle = function (userId) {
    }
    var modArticleByArticleId = function (articleId, articleObj) {
    }
    var delArticleByArticleId = function (articleId) {
        articles.remove({'_id' : articleId});
    }
    return {
        'articles' : articles,
        'getArticlesByUserId' : getArticlesByUserId,
        'getArticlesList' : getArticlesList,
        'addArticle' : addArticle,
        'modArticleByArticleId' : modArticleByArticleId,
        'delArticleByArticleId' : delArticleByArticleId
    };
}
module.exports = Article;
