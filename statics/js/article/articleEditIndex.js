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

define('article/article_editarea.js',['require','exports','module','lib/ajax','lib/util'],function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var urlParams = util.queryParse();
    var InputArea = React.createClass({displayName: "InputArea",
        handleTitleChange: function () {
            var str = this.refs['title'].getDOMNode().value;
            this.props.onInput('title', str);
        },
        handleContetChange: function () {
            var str = this.refs['content'].getDOMNode().value;
            this.props.onInput('content', str);
        },
        render: function () {
            return (
            React.createElement("div", {className: "input-arear"}, 
                React.createElement("input", {
                    ref: "title", 
                    onChange: this.handleTitleChange
                }), 
                React.createElement("br", null), 
                React.createElement("textarea", {
                    ref: "content", 
                    onChange: this.handleContetChange
                })
            )
            );
        }
    });
    var ShowArea = React.createClass({displayName: "ShowArea",
        render: function () {
            var title = this.props.title;
            var content = this.props.content;
            return (
            React.createElement("div", {className: "show-area"}, 
                React.createElement("h1", {dangerouslySetInnerHTML: {__html: title}}), 
                React.createElement("br", null), 
                React.createElement("p", {dangerouslySetInnerHTML: {__html: content}})
            )
            );
        }
    });
    var SubmitBtn = React.createClass({displayName: "SubmitBtn",
        render: function () {
            return (
            React.createElement("a", {onClick: this.props.onSubmit}, "Save")
            );
        }
    });
    var EditArea = React.createClass({displayName: "EditArea",
        converter: new Showdown.converter(),
        getInitialState: function () {
            return {
                title: '',
                content: '',
                titleMD: '',
                contentMD: '',
                articleId: '',
            };
        },
        getArticleData: function () {

        },
        onInput: function (key, val) {
            var stateObj = {};
            stateObj[key] = val;
            stateObj[key + 'MD'] = this.converter.makeHtml(val);
            this.setState(stateObj);
        },
        onSubmit: function () {
            var title = this.state.title;
            var content = this.state.content;
            if (!(title && content)) {
                console.log('内容不能为空');
                return;
            }
            if (urlParams.id) {
                //修改
                this.upArticle(title, content, [], false);
            } else {
                //新建
                this.newArticle(title, content, [], false);
            }
            
        },
        newArticle: function (title, content, tags, private) {
            var self = this;
            ajax(
                '/api/article/new',
                {
                    method: 'POST',
                    data: {
                        title: title,
                        content: content,
                        tags: tags.join(','),
                        private: private
                    },
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (data.err) {
                            alert("submit falied: " + data.message);
                        } else {
                            alert("submit success!");
                        }
                        var queryStr = util.queryBuild({id: JSONData.ret[0]._id});
                        location.href = location.pathname + '?' + queryStr;
                    }
                }
            );
        },
        upArticle: function () {
            var self = this;
            ajax(
                '/api/article/new',
                {
                    method: 'POST',
                    data: {
                        title: title,
                        content: content,
                        tags: tags.join(','),
                        private: private
                    },
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (data.err) {
                            alert("submit falied: " + data.message);
                        } else {
                            alert("submit success!");
                        }
                        self.setState({'articleId': JSONData.ret[0]._id});
                    }
                }
            )
        },
        getArtile: function () {},
        render: function () {
            return (
                React.createElement("div", {class: "editarea"}, 
                    React.createElement(InputArea, {onInput: this.onInput}), 
                    React.createElement(ShowArea, {
                        title: this.state.titleMD, 
                        content: this.state.contentMD}), 
                    React.createElement(SubmitBtn, {onSubmit: this.onSubmit})
                )
            );
        }
    });
    return {
        InputArea : InputArea,
        ShowArea : ShowArea,
        EditArea: EditArea
    };
});

require(['article/article_editarea.js'], function (editarea) {
    React.render(
        React.createElement(editarea.EditArea, null),
        document.body
    );
});

define("article/article_edit_main", function(){});
