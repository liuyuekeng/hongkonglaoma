define('lib/ajax',['require','exports','module'],function(require, exports, module){
    /**
     * suport setting
     *  method
     *  success
     *  data
     */
    function ajax (url, setting) {

        var xmlhttp = new XMLHttpRequest();
        var _method = setting.method ? setting.method : 'get';
        var _success = (setting.success && typeof setting.success === "function") ? setting.success : function () {return};
        var _data = setting.data ? setting.data : null;

        xmlhttp.open(_method, url, true);
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                _success(xmlhttp.responseText);
            }
        }
        xmlhttp.send(_method === "POST" ? _data : null);
    }
    module.exports = ajax;
});

define('lib/util',['require','exports','module'],function (require, exports, module) {
    /**
     * 辅助函数
     * query parse
     */
    exports.queryParse = function () {
        var searchStr = location.search;
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
            React.createElement("div", {class: "article-wraper"}, 
                React.createElement("div", {class: "article-title"}, 
                    React.createElement("h1", null, this.props.titleText)
                ), 
                React.createElement("p", {class: "article-content"}, 
                    this.props.contentText
                ), 
                React.createElement("div", {class: "creat-time"}, 
                    this.props.creatTime
                ), 
                React.createElement("div", {class: "modify-time"}, 
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

