define('article/article_editarea.js',['require','exports','module'],function (require, exports, module) {
    var inputArea = React.createClass({displayName: "inputArea",
        render: function () {
            return (
            React.createElement("textarea", null)
            );
        }
    });
    var markdownArea = React.createClass({displayName: "markdownArea",
        render: function () {
            return (
            React.createElement("textarea", null)
            );
        }
    });
    return {
        inputArea : inputArea,
        markdownArea : markdownArea
    };
});

require(['article/article_editarea.js'], function (editarea) {
    React.render(
        React.createElement("div", null, 
            React.createElement(editarea.inputArea, null), 
            React.createElement(editarea.markdownArea, null)
        ),
        document.body
    );
});

define("article/article_edit_main", function(){});

