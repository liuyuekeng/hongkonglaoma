define(function(require, exports, module){

    var ajax = require('lib/ajax');
    var util = require('lib/util');

    var PageTag = require('common/page_tag');

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
                React.createElement("div", {class: "article-list-item"}, 
                    React.createElement("h2", {class: "article-list-item-title", onClick: this.handleClick}, this.props.title), 
                    React.createElement("div", {class: "article-list-item-excerpt"}, 
                      content
                    )
                )
            );
        }
    });

    // 文章列表
    var ArticleList = React.createClass({displayName: "ArticleList",
        render: function(){
            var listItem = this.props.data.map(function(article){
                return(
                    React.createElement(ArticleListItem, {title: article.title, author: article.author}, 
                        article.content
                    )
                );
            });
            return(
                React.createElement("div", {class: "article-list"}, 
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
                totalPage: 1
            };
        },
        componentDidMount: function(){
            var _this = this;
            var queryObj = util.queryParse();
            var page = queryObj.page || 0;
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
            console.log(num);
        },
        render: function(){
            return(
                React.createElement("div", {className: "component-articles"}, 
                    React.createElement(ArticleList, {data: this.state.articleList}), 
                    React.createElement(PageTag, {total: this.state.totalPage, handelPageTagClick: this.handelChangePage})
                )
            )
        }
    });

    return {
        Articles: Articles
    }
})
