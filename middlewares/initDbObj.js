/**
 * 初始化数据库module，并注入到req对象中
 * setting = {
 *      moduleName : str,
 *      injectName : str
 * }
 */

var initSetting = function (obj) {
    var initDbObj = new InitDbObj(obj);
    return initDbObj.excute.bind(initDbObj);
};

var InitDbObj = function (setting) {
    this.setting = setting;
}

InitDbObj.prototype.excute = function (req, res, next) {
    var setting = this.setting;
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
