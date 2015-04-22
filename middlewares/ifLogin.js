/**通过cookie确认用户是否已登陆
 * 未登陆重定向到登陆页面
 * 已登陆则执行下一个中间件
 * 并在req对象中加入userIdObj对象
 */

var DB_users = require('../modules/DB_users.js');
var ifLogin = function (req, res, next) {
    var userId = req.signedCookies.userId;
    var userIdObj = req.helper.toObjectID(req.signedCookies.userId);
    if (!userIdObj) {
        res.redirect('/login');
        return;
    }
    var db_users = DB_users(req.db);
    function loginCheckCallback (err, ret) {
        if (ret) {
            req.userId = userId;
            req.userIdObj = userIdObj;
            req.userName = ret.username;
            next();
        } else {
            res.redirect('/login');
        }
    }
    var user = db_users.getUserById(userIdObj, loginCheckCallback);
}
module.exports = ifLogin;
