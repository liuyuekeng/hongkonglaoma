define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var articleDetail = React.createClass({
        getInitData : function () {
            var queryObj = util.queryParse();
            ajax(
                '/api/article/item' + (
                    (queryObj && queryObj.id) ?
                    '?id=' + queryObj.id : ""),
                {
                    method: 'get',
                    success: function (data) {
                        console.log(data);
                    }
                }
            );
        },
        getInitialState: function () {
            return {articleItemData: {}};
        },
        componentDidMount : function () {
            this.getInitData();
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
