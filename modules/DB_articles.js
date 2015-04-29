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

    // 分页函数
    // data: array 文章数组
    // page: int 页码
    // length: int 每页数量
    var articlesPaging = function (data, page, length){
        var total = data.length;
        if ( (page-1) * length <=  total ){
            if ( page * length <= total ){
                return {
                    'err': null,
                    'data': data.slice((page-1) * length, page * length)
                }
            }else{
                return {
                    'err': null,
                    'data': data.slice((page-1) * length)
                }
            }
        }else{
            return {'err': 'no enough articles.'}
        }
    };

    // 条件过滤函数
    // data: array 文章数组
    // filter: {autherName: 'xxx', tag: ['xx', 'xx']}
    var articlesFilter = function (data, filter){
    };

    var getArticlesByUserId = function (userId) {
        var ret = articles.find({'autherId' : userId});
        return ret;
    };
    var getArticle = function (articleId, callback) {
        var ret = articles.findOne({'_id' : articleId}, callback);
        return ret;
    };

    // 获取文章列表，接受两个参数
    // page: number 页码
    // length: 每页长度
    var getArticlesList = function(page, length, callback){
        articles.find().toArray(function(err,data){
            if(!err){
                var pagedCollection = articlesPaging(data, page, length);
                callback(pagedCollection.err, pagedCollection.data);
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
