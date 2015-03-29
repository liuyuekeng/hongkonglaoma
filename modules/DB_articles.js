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
        'addArticle' : addArticleByUserId,
        'modArticleByArticleId' : modArticleByArticleId,
        'delArticleByArticleId' : delArticleByArticleId
    };
}
module.exports = Article;
