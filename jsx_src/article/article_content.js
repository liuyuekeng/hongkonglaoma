define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var articleDetail = React.createClass({
        getInitData : function () {
            var queryObj = util.queryParse();
            var self = this;
            ajax(
                '/api/article/item' + (
                    (queryObj && queryObj.id) ?
                    '?id=' + queryObj.id : ""),
                {
                    method: 'get',
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (JSONData && !JSONData.err) {
                            self.setState({
                                title: JSONData.ret.title,
                                content: JSONData.ret.content
                            });
                        } else {
                            alert(data.message);
                        }
                    }
                }
            );
        },
        getInitialState: function () {
            return {
                title: '',
                content: ''
            };
        },
        componentDidMount : function () {
            this.getInitData();
        },
        render: function () {
            console.log(this.state);
            return(
            <div className="article-content">
                <h1 className="title title1">{this.state.title}</h1>
                <pre className="article-detail">
                    {this.state.content}
                </pre>
            </div>
            );
        }
    });
    return {
        articleDetail : articleDetail,
    };
})
