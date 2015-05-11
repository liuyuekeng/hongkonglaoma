define(function (require, exports, module) {
    var ajax = require('lib/ajax');
    var util = require('lib/util');
    var urlParams = util.queryParse();
    var InputArea = React.createClass({displayName: "InputArea",
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
            React.createElement("div", {className: "input-area"}, 
                React.createElement("input", {
                    className: "title title1", 
                    ref: "title", 
                    onChange: this.handleTitleChange, 
                    value: this.props.title
                }), 
                React.createElement("br", null), 
                React.createElement("textarea", {
                    ref: "content", 
                    onChange: this.handleContetChange, 
                    value: this.props.content
                })
            )
            );
        }
    });
    var ShowArea = React.createClass({displayName: "ShowArea",
        render: function () {
            var title = this.props.title;
            var content = this.props.content;
            return (
            React.createElement("div", {className: "show-area"}, 
                React.createElement("h1", {
                    className: "title title1", 
                    dangerouslySetInnerHTML: {__html: title}}), 
                React.createElement("div", {
                    className: "article-detail", 
                    dangerouslySetInnerHTML: {__html: content}})
            )
            );
        }
    });
    var SubmitBtn = React.createClass({displayName: "SubmitBtn",
        render: function () {
            return (
            React.createElement("a", {className: "btn blue", onClick: this.props.onSubmit}, "Save")
            );
        }
    });
    var EditArea = React.createClass({displayName: "EditArea",
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
        componentDidMount: function () {
            if (urlParams.id) {
                //编辑文章时获取初始数据
                this.getArtile(urlParams.id);
            }
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
                this.upArticle(urlParams.id, title, content, [], false);
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
                        if (JSONData.err) {
                            alert("submit falied: " + JSONData.message);
                        } else {
                            alert("submit success!");
                        }
                        var queryStr = util.queryBuild({id: JSONData.ret[0]._id});
                        location.href = location.pathname + '?' + queryStr;
                    }
                }
            );
        },
        upArticle: function (articleId, title, content, tags, private) {
            var self = this;
            ajax(
                '/api/article/up',
                {
                    method: 'POST',
                    data: {
                        articleId: articleId,
                        title: title,
                        content: content,
                        tags: tags.join(','),
                        private: private
                    },
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (JSONData.err) {
                            alert("update falied!");
                        } else {
                            alert("update success!");
                        }
                    }
                }
            )
        },
        getArtile: function (articleId) {
            var self = this;
            ajax(
                '/api/article/item?id=' + articleId,
                {
                    method: 'GET',
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        if (JSONData.err) {
                            alert(JSONData.message);
                        } else {
                            self.onInput('title', JSONData.ret.title);
                            self.onInput('content', JSONData.ret.content);
                        }
                    }
                }
            );
        },
        render: function () {
            return (
                React.createElement("div", {className: "article-editarea"}, 
                    React.createElement(InputArea, {
                        onInput: this.onInput, 
                        title: this.state.title, 
                        content: this.state.content}
                        ), 
                    React.createElement(ShowArea, {
                        title: this.state.title, 
                        content: this.state.contentMD}), 
                    React.createElement(SubmitBtn, {onSubmit: this.onSubmit})
                )
            );
        }
    });
    return {
        InputArea : InputArea,
        ShowArea : ShowArea,
        EditArea: EditArea
    };
});
