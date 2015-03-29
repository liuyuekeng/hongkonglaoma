define(['common/page_tag'], function(pageTag){
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
                    <h2 class="article-list-item-title" onClick={this.handleClick}>{this.props.data.title}</h2>
                    <div class="article-list-item-excerpt">
                      {content}
                    </div>
                </div>
            );
        }
    });

    // 文章列表
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

    var Articles = React.createClass({
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
                <ArticleList />
                <PageTag total={this.state.totalPage}></PageTag>
            )
        }
    });

})
