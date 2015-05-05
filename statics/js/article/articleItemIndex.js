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
            var self = this;
            ajax(
                '/api/article/item' + (
                    (queryObj && queryObj.id) ?
                    '?id=' + queryObj.id : ""),
                {
                    method: 'get',
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (JSONData && !JSONData.err) {
                            self.setState({
                                title: JSONData.ret.title,
                                content: JSONData.ret.content
                            });
                        } else {
                            alert(data.message);
                        }
                    }
                }
            );
        },
        getInitialState: function () {
            return {
                title: '',
                content: ''
            };
        },
        componentDidMount : function () {
            this.getInitData();
        },
        render: function () {
            console.log(this.state);
            return(
            React.createElement("div", {className: "article-content"}, 
                React.createElement("h1", {className: "title title1"}, this.state.title), 
                React.createElement("pre", {className: "article-detail"}, 
                    this.state.content
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
define('common/header.js',[],function(){
    var Header = React.createClass({displayName: "Header",
        render: function(){
            return (
                React.createElement("div", null, 
                    React.createElement("span", {className: "hongkonglaoma title"}, "Hongkonglaoma"), 
                    React.createElement("div", {className: "common-header-user"}
                    )
                )
            );
        }
    });

    return Header;
});

require(['article/article_content.js', 'common/header.js'], function (content, CommonHeader) {
    React.render(
        React.createElement(CommonHeader, null),
        document.getElementById('header')
    );
    React.render(
        React.createElement(content.articleDetail, null),
        document.getElementById('content')
    );
});

define("article/article_item_main", function(){});

