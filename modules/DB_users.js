var User = function (db) {
    if (!db.users) {
        db.bind("users");
    }
    var users = db.users;
    var creatUser = function (username, passwd, res) {
        users.insert(
            {
                username: username,
                passwd: passwd
            },
            function (err, data) {
                res.json({
                    mongo_err : err,
                    ret : data
                });
            }
        );
    };
    var removeUser = function (username) {
        users.remove({username: username})
    };
    var modPasswd = function (username, passwd) {
        users.update(
            {'username' : username},
            {'$set' : {'passwd' : passwd}}
        );
    };

    var authentication = function (username, passwd, res) {
        users.findOne({'username' : username, 'passwd' : passwd}, function (err, ret) {
            if (ret) {
                res.json({
                    mongo_err: err,
                    message: 'authentication sucess'
                });
            } else {
                res.json({
                    mongo_err: err,
                    err: 'NO_RESULT',
                    message: 'authentication fail'
                });
            }
        });
    }
    return {
        "users" : users,
        "creatUser" : creatUser,
        "removeUser" : removeUser,
        "modPasswd" : modPasswd,
        "authentication" : authentication
    }
}
module.exports = User;
