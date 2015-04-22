define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var urlParams = util.queryParse();
    var InputArea = React.createClass({
        handleTitleChange: function () {
            var str = this.refs['title'].getDOMNode().value;
            this.props.onInput('title', str);
        },
        handleContetChange: function () {
            var str = this.refs['content'].getDOMNode().value;
            this.props.onInput('content', str);
        },
        render: function () {
            return (
            <div className="input-arear">
                <input
                    ref='title'
                    onChange={this.handleTitleChange}
                ></input>
                <br />
                <textarea
                    ref='content'
                    onChange={this.handleContetChange}
                ></textarea>
            </div>
            );
        }
    });
    var ShowArea = React.createClass({
        render: function () {
            var title = this.props.title;
            var content = this.props.content;
            return (
            <div className="show-area">
                <h1 dangerouslySetInnerHTML={{__html: title}}></h1>
                <br />
                <p dangerouslySetInnerHTML={{__html: content}}></p>
            </div>
            );
        }
    });
    var SubmitBtn = React.createClass({
        render: function () {
            return (
            <a onClick={this.props.onSubmit}>Save</a>
            );
        }
    });
    var EditArea = React.createClass({
        converter: new Showdown.converter(),
        getInitialState: function () {
            return {
                title: '',
                content: '',
                titleMD: '',
                contentMD: '',
                articleId: '',
            };
        },
        getArticleData: function () {

        },
        onInput: function (key, val) {
            var stateObj = {};
            stateObj[key] = val;
            stateObj[key + 'MD'] = this.converter.makeHtml(val);
            this.setState(stateObj);
        },
        onSubmit: function () {
            var title = this.state.title;
            var content = this.state.content;
            if (!(title && content)) {
                console.log('内容不能为空');
                return;
            }
            if (urlParams.id) {
                //修改
                this.upArticle(title, content, [], false);
            } else {
                //新建
                this.newArticle(title, content, [], false);
            }
            
        },
        newArticle: function (title, content, tags, private) {
            var self = this;
            ajax(
                '/api/article/new',
                {
                    method: 'POST',
                    data: {
                        title: title,
                        content: content,
                        tags: tags.join(','),
                        private: private
                    },
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (data.err) {
                            alert("submit falied: " + data.message);
                        } else {
                            alert("submit success!");
                        }
                        var queryStr = util.queryBuild({id: JSONData.ret[0]._id});
                        location.href = location.pathname + '?' + queryStr;
                    }
                }
            );
        },
        upArticle: function () {
            var self = this;
            ajax(
                '/api/article/new',
                {
                    method: 'POST',
                    data: {
                        title: title,
                        content: content,
                        tags: tags.join(','),
                        private: private
                    },
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (data.err) {
                            alert("submit falied: " + data.message);
                        } else {
                            alert("submit success!");
                        }
                        self.setState({'articleId': JSONData.ret[0]._id});
                    }
                }
            )
        },
        getArtile: function () {},
        render: function () {
            return (
                <div class="editarea">
                    <InputArea onInput={this.onInput}/>
                    <ShowArea
                        title={this.state.titleMD}
                        content={this.state.contentMD}/>
                    <SubmitBtn onSubmit={this.onSubmit}/>
                </div>
            );
        }
    });
    return {
        InputArea : InputArea,
        ShowArea : ShowArea,
        EditArea: EditArea
    };
});
