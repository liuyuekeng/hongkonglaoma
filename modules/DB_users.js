/**users表结构
 * passwd
 * username
 * _id
 */
var md5 = require('MD5');
var User = function (db) {
    if (!db.users) {
        db.bind("users");
    }
    var users = db.users;
    var getUserById = function (id, callback) {
        users.findOne({"_id" : id}, callback);
    }
    var creatUser = function (username, passwd, res) {
        users.insert(
            {
                username: username,
                passwd: md5(passwd)
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
            {'$set' : {'passwd' : md5(passwd)}}
        );
    };

    var authentication = function (username, passwd, callback) {
        users.findOne({'username' : username, 'passwd' : md5(passwd)}, callback);
    }
    return {
        "users" : users,
        "creatUser" : creatUser,
        "getUserById" : getUserById,
        "removeUser" : removeUser,
        "modPasswd" : modPasswd,
        "authentication" : authentication
    }
}
module.exports = User;
