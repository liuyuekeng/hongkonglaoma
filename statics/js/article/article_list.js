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

var ArticleListItem = React.createClass({displayName: "ArticleListItem",
    render: function(){
        return(
            React.createElement("div", {class: "article-list-item"}, 
                React.createElement("h2", {class: "article-list-item-title"}, this.props.data), 
                React.createElement("div", {class: "article-list-item-excerpt"}, 
                    this.props.children
                )
            )
        );
    }
});
