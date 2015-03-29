define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var articleDetail = React.createClass({displayName: "articleDetail",
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
            React.createElement("div", {class: "article-wraper"}, 
                React.createElement("div", {class: "article-title"}, 
                    React.createElement("h1", null, this.props.titleText)
                ), 
                React.createElement("p", {class: "article-content"}, 
                    this.props.contentText
                ), 
                React.createElement("div", {class: "creat-time"}, 
                    this.props.creatTime
                ), 
                React.createElement("div", {class: "modify-time"}, 
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
