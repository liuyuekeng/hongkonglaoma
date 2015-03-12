var ArticleList = React.createClass({
    render: function(){
        var listItem = this.props.data.map(function(article){
            return(
                <ArticleListItem title={article.title} author={article.author}>
                    {article.content}
                </ArticleListItem>
            );
        });
        return(
            <div class="article-list">
                {listItem}
            </div>
        );
    }
});

var ArticleListItem = React.createClass({
    render: function(){
        return(
            <div class="article-list-item">
                <h2 class="article-list-item-title">{this.props.data}</h2>
                <div class="article-list-item-excerpt">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
