define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var articleDetail = React.createClass({displayName: "articleDetail",
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
            React.createElement("div", {className: "article-wraper"}, 
                React.createElement("div", {className: "article-title"}, 
                    React.createElement("h1", null, this.props.titleText)
                ), 
                React.createElement("p", {className: "article-content"}, 
                    this.props.contentText
                ), 
                React.createElement("div", {className: "creat-time"}, 
                    this.props.creatTime
                ), 
                React.createElement("div", {className: "modify-time"}, 
                    this.props.modifyTime
                )
            )
            );
        }
    });
    return {
        articleDetail : articleDetail,
    };
})
