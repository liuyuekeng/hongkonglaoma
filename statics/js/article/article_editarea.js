define(function (require, exports, module) {
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
