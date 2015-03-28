define(function(){
    // 文章列表项
    var ArticleListItem = React.createClass({
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
                <div class="article-list-item">
                    <h2 class="article-list-item-title" onClick{this.handleClick}=>{this.props.data.title}</h2>
                    <div class="article-list-item-excerpt">
                      {content}
                    </div>
                </div>
            );
        }
    });

    // 分页
    var PageTag = React.createClass({
    });

    // 文章列表
    var ArticleList = React.createClass({
        componentDidMount: function(){
            this.state.List = [
                {
                    title: 'test1',
                    content: 'test1`s content'
                }
            ];
        },
        getArticles: function(){
        },
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
})
