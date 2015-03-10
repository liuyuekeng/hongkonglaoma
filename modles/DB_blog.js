var User = function (db) {
    var collection = db.collection('users', {strict: true});
    var creatUser = function (username, passwd) {
        collection.insert(
            {
                username: username,
                passwd: passwd
            },
            function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            }
        );
    };
    var removeUser = function (username) {
        collection.remove({username: username})
    };
    var modPasswd = function () {
    };
    var getUser = function () {
    };
    var authentication = function () {
    }
    return {
        "collection": collection,
    }
}
exports.User = User;
