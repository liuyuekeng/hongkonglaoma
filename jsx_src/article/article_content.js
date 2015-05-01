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
            <div className="article-wraper">
                <div className="article-title">
                    <h1>{this.props.titleText}</h1>
                </div>
                <p className="article-content">
                    {this.props.contentText}
                </p>
                <div className="creat-time">
                    {this.props.creatTime}
                </div>
                <div className="modify-time">
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
