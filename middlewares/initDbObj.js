/**
 * 初始化数据库module，并注入到req对象中
 * setting = {
 *      moduleName : str,
 *      injectName : str
 * }
 */
var setting;

var initSetting = function (obj) {
    setting = obj;
    return initDbObj;
};

var initDbObj = function (req, res, next) {
    if (!(setting && setting.moduleName && setting.injectName)) {
        res.status(500).json({
            err: "missing setting when useing initDbObj middleware"
        });
        return;
    }
    var DB_module = require('../modules/' + setting.moduleName);
    if (!req.db) {
        res.status(500).json({
            err: "missing db in req obj when useing initDbObj middleware"
        });
        return;
    } else {
        req[setting.injectName] = DB_module(req.db);
    }
    next();
}
module.exports = initSetting;
