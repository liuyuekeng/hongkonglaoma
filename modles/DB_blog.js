var User = function (db) {
    var collection = db.collection('users', {strict: true});
    return {
        "collection": collection,
        "test": "yoooo"
    }
}
exports.User = User;
