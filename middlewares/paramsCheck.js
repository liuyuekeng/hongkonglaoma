/**检查参数是否合法
 * paramsCheckSetting = {
 *   get: {
 *     id: {                    get参数中检查id字段
 *       regexp : RegExp obj    用于检查的正则
 *     }
 *   },
 *   post: {},
 * }
 *
 * 使用前req.body必须已经被解析
 * 使用方式app.user('xxxx', export(paramsCheckSetting));
 */

var paramsCheckSetting;

var paramsCheck = function (req, res, next) {
    var settings = paramsCheckSetting;
    if (!settings) {
        res.json({
            err: 'missing params check setting',
            message: '参数检查配置缺失'
        });
        return;
    }
    var errArray = [];          //记录所有不通过原因

    //检查get参数
    var getSettings = settings.get;
    var getParams = req.query;
    checkParams(getParams, getSettings, 'get');
    
    //检查post参数
    var postSettings = settings.post;
    var postParams = req.body;
    checkParams(postParams, postSettings, 'post');

    if (errArray.length === 0) {
        next();
    } else {
        res.json({
            err : errArray
        });
    }

    function checkParams (params, settings, method) {
        if (settings && typeof settings === 'object') {
            for (item in settings) {
                if (settings.hasOwnProperty(item)) {
                    var itemResult = checkParamItem(
                        item,
                        params[item],
                        method,
                        settings[item]);
                    if (itemResult.err) {
                        errArray.push(itemResult.err);
                    }
                }
            }
        }
    }

    function checkParamItem (name, value, method, settingItem) {
        if (!value) {
            return {
                err: 'missing ' + method + ' param "' + name + '"'
            };
        }
        if (!(value.match(settingItem.regexp))) {
            return {
                err: 'illegal ' + method + ' param "' + name + '""'
            };
        }
        return true;
    }
};

var initSetting = function (obj) {
    paramsCheckSetting = obj;
    return paramsCheck;
}

module.exports = initSetting;
