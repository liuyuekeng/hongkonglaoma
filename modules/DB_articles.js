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
    // page: 页码，从0 开始
    // length: 每页数量
    var getArticlesList = function(page, length, callback){
        articles.find().toArray(function(err,data){
            if(!err){
                var total = data.length;
                // 参数合法检测
                if( !isNaN(page) && !isNaN(length) && page>=0 && length>0){
                    // 页码过大检测
                    if( page*length < total ){
                        callback(
                           err,
                           data.slice( page*length, (page+1)*length<total?(page+1)*length:total )
                        );
                    }else{
                        callback('no enough articles');
                    }
                }else{
                    callback('illegal params');
                }
            }else{
                callback(err,data);
            }
        });
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
