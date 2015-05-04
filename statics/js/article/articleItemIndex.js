define('lib/ajax',['require','exports','module'],function(require, exports, module){
    /**
     * suport setting
     *  method
     *  success
     *  data
     */
    function ajax (url, setting) {
        //默认参数
        var defaultObj = {
            method: "GET",
            success: function () {
                return;
            },
            data: null,
            contentType: {
                "POST": "application/x-www-form-urlencoded"
            }
        };

        //参数整理
        var xmlhttp = new XMLHttpRequest();
        var _method = setting.method ? setting.method.toLocaleUpperCase() : defaultObj.method;
        var _success = (setting.success && typeof setting.success === "function") ? setting.success : defaultObj.success;
        var dataObj = setting.data ? setting.data : false;
        var _data = "";
        if (dataObj) {
            for (item in dataObj) {
                if (dataObj.hasOwnProperty(item)) {
                    _data += (item + "=" + dataObj[item] + "&");
                }
            }
            _data = _data.substring(0, _data.length - 1);
        } else {
            _data = defaultObj.data;
        }
        var _contentType = setting.contentType ? setting.contentType : false;
        if (!_contentType && defaultObj.contentType[_method]) {
            _contentType = defaultObj.contentType[_method];
        }

        //发送请求
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                _success(xmlhttp.responseText);
            }
        }

        xmlhttp.open(_method, url, true);

        if (_contentType) {
            xmlhttp.setRequestHeader("Content-Type", _contentType); 
        }
        xmlhttp.send(_data);
    }
    module.exports = ajax;
});

define('lib/util',['require','exports','module'],function (require, exports, module) {
    /**
     * 辅助函数
     * queryParse
     * queryBuild
     */
    exports.queryParse = function (str) {
        var searchStr = str ? str : location.search;
        if (!searchStr) {
            return false;
        }
        searchStr = searchStr.slice(1);
        var queryObj = {};
        var searchArr = searchStr.split('&');
        var searchItem;
        for (var i = searchArr.length - 1; i > -1; i --) {
            searchItem = searchArr[i].split('=');
            queryObj[searchItem[0]] = searchItem[1];
        }
        return queryObj;
    }
    exports.queryBuild = function (obj) {
        var queryStr = ""
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                queryStr += (item + "=" + obj[item] + "&");
            }
        }
        queryStr = queryStr.substring(0, queryStr.length - 1);
        return queryStr;
    }
});

define('article/article_content.js',['require','exports','module','lib/ajax','lib/util'],function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var articleDetail = React.createClass({displayName: "articleDetail",
        getInitData : function () {
            var queryObj = util.queryParse();
            ajax(
                '/api/article/item' + (
                    (queryObj && queryObj.id) ?
                    '?id=' + queryObj.id : ""),
                {
                    method: 'get',
                    success: function (data) {
                        console.log(data);
                    }
                }
            );
        },
        getInitialState: function () {
            return {articleItemData: {}};
        },
        componentDidMount : function () {
            this.getInitData();
        },
        render: function () {
            return(
            React.createElement("div", {className: "article-wraper"}, 
                React.createElement("div", {className: "article-title"}, 
                    React.createElement("h1", null, this.props.titleText)
                ), 
                React.createElement("p", {className: "article-content"}, 
                    this.props.contentText
                ), 
                React.createElement("div", {className: "creat-time"}, 
                    this.props.creatTime
                ), 
                React.createElement("div", {className: "modify-time"}, 
                    this.props.modifyTime
                )
            )
            );
        }
    });
    return {
        articleDetail : articleDetail,
    };
})
;
require(['article/article_content.js'], function (content) {
    React.render(
        React.createElement(content.articleDetail, {titleText: "test", contentText: "content test", creatTime: "2015-3-28", modifyTime: "2015-3-28"}),
        document.body
    );
});

define("article/article_item_main", function(){});

