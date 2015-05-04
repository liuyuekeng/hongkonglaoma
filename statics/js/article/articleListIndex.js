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

define('common/page_tag',[],function(){
    /*
     *  分页组件
     *  接受三个属性，total(总页数)、selected(被选中页) 和 handelPageTagClick(点击事件)
     *  handelPageTagClick 传入一个参数，为被点击的页数
     */
    var PageTag = React.createClass({displayName: "PageTag",
        handleClick: function(ev){
            this.props.handelPageTagClick(ev.target.innerHTML);
        },
        render: function(){
            var tags = [];
            for(var i=1; i<=this.props.total; i++){
                if(i == this.props.selected){
                    tags.push(
                        React.createElement("li", {className: "selected btn blue", onClick: this.handleClick, key: i}, i)
                    );
                }else{
                    tags.push(
                        React.createElement("li", {className: "btn blue", onClick: this.handleClick, key: i}, i)
                    );
                }
            }
            return(
                React.createElement("ul", {className: "common-pagetag"}, 
                    tags
                )
            );
        }
    });

    return PageTag;
});

define('common/tag_selector',[],function(){
    /*
     *  tag 选择器
     *  接收三个属性
     *  tags: tag 数组
     *  selected: 已选中的 tag 数组
     *  handelTagSelectorClick: 点击事件响应，带一个参数，被点击的 tag 名
     */

     var TagSelector = React.createClass({displayName: "TagSelector",
        handleClick: function(ev){
            var target = ev.target;
            this.props.handelTagSelectorClick(target.innerHTML);
        },
        isSelected: function(tag){
            for(var i=0; i<this.props.selected.length; i++){
                if(tag === this.props.selected[i]){
                    return true;
                }
            }
            return false;
        },
        render: function(){
            var tags = this.props.tags;
            var tagItems = [];
            for(var i=0; i<tags.length; i++){
                if(isSelected(tags[i])){
                    tagItems.push(
                        React.createElement("li", {className: "selected", onClick: this.handleClick}, "tags[i]")
                    );
                }else{
                    tagItems.push(
                        React.createElement("li", {onClick: this.handleClick}, "tags[i]")
                    );
                }
            }

            return (
                React.createElement("ul", {className: "common-tagselector"}, 
                    tagItems
                )
            )
        }
     });

     return TagSelector;
})
;
define('article/article_list.js',['require','exports','module','lib/ajax','lib/util','common/page_tag','common/tag_selector'],function(require, exports, module){

    var ajax = require('lib/ajax');
    var util = require('lib/util');

    var PageTag = require('common/page_tag');
    var TagSelector = require('common/tag_selector');

    // 文章列表项
    var ArticleListItem = React.createClass({displayName: "ArticleListItem",
        handleClick: function(ev){
            console.log(ev);
        },
        render: function(){
            var content = this.props.children;
            // 缩略标识
            var moreTag = content.indexOf('<!--more-->');
            if(moreTag != -1){
              content = content.slice(0,moreTag);
            }
            return(
                React.createElement("div", {className: "article-list-item"}, 
                    React.createElement("h2", {className: "article-list-item-title title title2", onClick: this.handleClick}, this.props.title), 
                    React.createElement("pre", {className: "article-list-item-excerpt"}, 
                      content
                    )
                )
            );
        }
    });

    // 文章列表
    var ArticleList = React.createClass({displayName: "ArticleList",
        render: function(){
            var listItem = this.props.data.map(function(article, index){
                return(
                    React.createElement(ArticleListItem, {title: article.title, author: article.author, key: index}, 
                        article.content
                    )
                );
            });
            return(
                React.createElement("section", {className: "article-list"}, 
                    listItem
                )
            );
        }
    });

    var Articles = React.createClass({displayName: "Articles",
        getInitialState: function(){
            return {
                // 文章列表
                articleList: [],
                // 当前页
                selectedPage: 1,
                // 总页数
                totalPage: 1,
                // 标签列表
                tags: [],
                // 被选中的标签列表
                selectedTags: []
            };
        },
        componentDidMount: function(){
            var _this = this;
            var queryObj = util.queryParse();
            var page = queryObj.page || 1;
            var length = queryObj.length || 5;

            var url = 'api/article/list';
            url += '?page=' + page + '&length=' + length;
            ajax(
                url,
                {
                    method: 'get',
                    success: function (data) {
                        var ret = JSON.parse(data);
                        if(!ret.err){
                            _this.setState({
                                articleList: ret.data,
                                selectedPage: page,
                                totalPage: ret.data.length / length + 1
                            });
                        }
                    }
                }
            )
        },
        handelChangePage: function(num){
            if(parseInt(num) != parseInt(this.state.selectedPage)){
                this.setState({
                    page: parseInt(num)
                });
            }
        },
        render: function(){
            return(
                React.createElement("div", {className: "component-articles"}, 
                    React.createElement(ArticleList, {data: this.state.articleList}), 
                    React.createElement(PageTag, {total: this.state.totalPage, handelPageTagClick: this.handelChangePage, selected: this.state.selectedPage})
                )
            )
        }
    });

    return {
        Articles: Articles
    }
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

require(['article/article_list.js', 'common/header.js'], function(list, CommonHeader){
    React.render(
        React.createElement(CommonHeader, null),
        document.getElementById('header')
    );
    React.render(
        React.createElement(list.Articles, null),
        document.getElementById('content')
    );
});

define("article/article_list_main", function(){});

