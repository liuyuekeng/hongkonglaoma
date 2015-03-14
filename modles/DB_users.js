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
    var modPasswd = function (username, passwd) {
        collection.update(
            {'username' : username},
            {'$set' : {'passwd' : passwd}}
        );
    };
    var getUserByUsername = function (username) {
        var ret = collection.findOne({'username' : username});
        return ret;
    };
    var authentication = function (username, passwd) {
        var ret = collection.findOne({'username' : username, 'passwd' : passwd});
        return ret;
    }
    return {
        "collection": collection,
    }
}
exports.User = User;
