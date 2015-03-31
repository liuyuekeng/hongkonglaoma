define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var articleDetail = React.createClass({
        getInitData : function () {
        },
        getInitialState: function () {
            return {articleItemData: {}};
        },
        componentDidMount : function () {
            ajax(
                '/api/article/item',
                {
                    method: 'get',
                    success: function (data) {
                        console.log(data);
                    }
                }
            );
        },
        render: function () {
            return(
            <div class="article-wraper">
                <div class="article-title">
                    <h1>{this.props.titleText}</h1>
                </div>
                <p class="article-content">
                    {this.props.contentText}
                </p>
                <div class="creat-time">
                    {this.props.creatTime}
                </div>
                <div class="modify-time">
                    {this.props.modifyTime}
                </div>
            </div>
            );
        }
    });
    return {
        articleDetail : articleDetail,
    };
})
