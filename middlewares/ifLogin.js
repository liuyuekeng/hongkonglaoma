var DB_users = require('../modules/DB_users.js');
var ifLogin = function (req, res, next) {
    var userId = req.helper.toObjectID(req.signedCookies.userId);
    if (!userId) {
        res.redirect('/login');
        return;
    }
    var db_users = DB_users(req.db);
    function loginCheckCallback (err, ret) {
        if (ret) {
            next();
        } else {
            res.redirect('/login');
        }
    }
    var user = db_users.getUserById(userId, loginCheckCallback);
}
module.exports = ifLogin;
