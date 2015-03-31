define(['common/page_tag'], function(pageTag){
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
