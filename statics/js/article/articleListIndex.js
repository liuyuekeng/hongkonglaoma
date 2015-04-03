define('common/page_tag',[],function(){
    /*
     *  分页组件
     *  接受三个属性，total(总页数)、selected(被选中页) 和 handelPageTagClick(点击事件)
     *  handelPageTagClick 传入一个参数，为被点击的页数
     */
    var PageTag = React.createClass({displayName: "PageTag",
        handleClick: function(num){
            this.props.handelPageTagClick(num);
        },
        render: function(){
            var _this = this;
            var tags = [];
            for(var i=0; i<=this.props.total; i++){
                if(i == _this.props.selected){
                    tags.push(
                        React.createElement("li", {className: "selected", onClick: _this.handleClick(i)}, i+1)
                    );
                }else{
                    tags.push(
                        React.createElement("li", {onClick: _this.handleClick(i)}, i+1)
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

define('article/article_list.js',['common/page_tag'], function(pageTag){
    // 文章列表项
    var ArticleListItem = React.createClass({displayName: "ArticleListItem",
        handleClick: function(ev){
            location.pathname = '/articel/' + this.props.data._id;
        },
        render: function(){
            var content = this.props.data.content;
            // 缩略标识
            var moreTag = content.indexOf('<!--more-->');
            if(moreTag != -1){
              content = content.slice(0,moreTag);
            }
            return(
                React.createElement("div", {class: "article-list-item"}, 
                    React.createElement("h2", {class: "article-list-item-title", onClick: this.handleClick}, this.props.data.title), 
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
        componentDidMount: function(){
            // 文章列表
            this.state.articleList = [
            ];
            // 当前页
            this.state.selectedPage = 1;
            // 总页数
            this.state.totalPage = this.state.articleList.length / 5 + 1;
        },
        render: function(){
            return(
                React.createElement("div", {className: "component-articles"}, 
                    React.createElement(ArticleList, null), 
                    React.createElement(PageTag, {total: this.state.totalPage})
                )
            )
        }
    });

})
;
define('common/header.js',[],function(){
    var Header = React.createClass({displayName: "Header",
        render: function(){
            return (
                React.createElement("div", {className: "common-header"}, 
                    React.createElement("span", null, "Hongkonglaoma"), 
                    React.createElement("div", {className: "common-header-user"}
                    )
                )
            );
        }
    });

    return Hearder;
});

require(['article/article_list.js', 'common/header.js'], function(list, header){
});

define("article/article_list_main", function(){});

