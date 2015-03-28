/**articals表结构
 * title
 * content
 * tags
 * autherName
 * autherId
 * private
 */
var Artical = function (db) {
    if (!db.articals) {
        db.bind('articals');
    }
    var articals = db.articals;
    var getArticalsByUserId = function (userId) {
        var ret = articals.find({'autherId' : userId});
        return ret;
    }
    var getArticalByArticalId = function (articalId) {
        var ret = articals.findOne({'_id' : articalId});
        return ret;
    }
    var addArtical = function (userId) {
    }
    var modArticalByArticalId = function (articalId, articalObj) {
    }
    var delArticalByArticalId = function (articalId) {
        articals.remove({'_id' : articalId});
    }
    return {
        'articals' : articals,
        'getArticalsByUserId' : getArticalsByUserId,
        'addArtical' : addArticalByUserId,
        'modArticalByArticalId' : modArticalByArticalId,
        'delArticalByArticalId' : delArticalByArticalId
    };
}
module.exports = Artical;
