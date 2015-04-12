define(function (require, exports, module) {
    var InputArea = React.createClass({
        handleChange: function () {
            var str = this.refs['input'].getDOMNode().value;
            console.log(str);
        },
        render: function () {
            return (
            <textarea
                ref='input'
                onChange={this.handleChange}
            ></textarea>
            );
        }
    });
    var ShowArea = React.createClass({
        render: function () {
            return (
            <textarea></textarea>
            );
        }
    });
    var EditArea = React.createClass({
        render: function () {
            return (
                <div class="editarea">
                    <InputArea/>
                    <ShowArea/>
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
