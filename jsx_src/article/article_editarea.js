define(function (require, exports, module) {
    var inputArea = React.createClass({
        render: function () {
            return (
            <textarea></textarea>
            );
        }
    });
    var markdownArea = React.createClass({
        render: function () {
            return (
            <textarea></textarea>
            );
        }
    });
    return {
        inputArea : inputArea,
        markdownArea : markdownArea
    };
});
