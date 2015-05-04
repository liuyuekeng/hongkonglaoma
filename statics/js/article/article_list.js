define(function(require, exports, module){

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
