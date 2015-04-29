define(function(require, exports, module){

    var ajax = require('lib/ajax');
    var util = require('lib/util');

    var PageTag = require('common/page_tag');

    // 文章列表项
    var ArticleListItem = React.createClass({
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
                <div class="article-list-item">
                    <h2 class="article-list-item-title" onClick={this.handleClick}>{this.props.title}</h2>
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
            var listItem = this.props.data.map(function(article, index){
                return(
                    <ArticleListItem title={article.title} author={article.author} key={index}>
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
                <div className="component-articles">
                    <ArticleList data={this.state.articleList} />
                    <PageTag total={this.state.totalPage} handelPageTagClick={this.handelChangePage} selected={this.state.selectedPage} />
                </div>
            )
        }
    });

    return {
        Articles: Articles
    }
})
