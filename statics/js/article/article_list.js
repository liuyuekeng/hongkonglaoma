define(function(require, exports, module){

    var ajax = require('lib/ajax');
    var util = require('lib/util');

    var PageTag = require('common/page_tag');
    var TagSelector = require('common/tag_selector');

    // 文章列表项
    var ArticleListItem = React.createClass({displayName: "ArticleListItem",
        handleClick: function(ev){
            window.location="/article/item?id=" + this.props.id;
        },
        render: function(){
            var content = this.props.children;
            // 缩略标识
            var moreTag = content.indexOf('<!--more-->');
            if(moreTag != -1){
              content = content.slice(0,moreTag);
            }
            return(
                React.createElement("div", {className: "article-list-item", onClick: this.handleClick}, 
                    React.createElement("h2", {className: "article-list-item-title title title2"}, this.props.title), 
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
                    React.createElement(ArticleListItem, {title: article.title, author: article.author, key: index, id: article._id}, 
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
        urlParame: {
            page: util.queryParse().page || 1,
            length: util.queryParse().length || 5
        },
        getInitialState: function(){
            var _this = this;
            return {
                // 文章列表
                articleList: [],
                // 当前页
                selectedPage: this.urlParame.page,
                // 总页数
                totalPage: 1,
                // 标签列表
                tags: [],
                // 被选中的标签列表
                selectedTags: []
            };
        },
        componentDidMount: function(par){
            var _this = this;

            var page = ((par && par.page) || _this.urlParame.page);
            var length = ((par && par.length) || _this.urlParame.length);
            var url = 'api/article/list';
            url += '?page=' + page
                + '&length=' + length;
            ajax(
                url,
                {
                    method: 'get',
                    success: function (data) {
                        var ret = JSON.parse(data);
                        if(!ret.err){
                            _this.setState({
                                articleList: ret.data.list,
                                selectedPage: page,
                                totalPage: ret.data.total / length + 1
                            });
                        }
                    }
                }
            )
        },
        handelChangePage: function(num){
            if(parseInt(num) != parseInt(this.state.selectedPage)){
                this.componentDidMount({page:num});
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
