define(function (require, exports, module) {
    var InputArea = React.createClass({displayName: "InputArea",
        handleChange: function () {
            var str = this.refs['input'].getDOMNode().value;
            console.log(str);
        },
        render: function () {
            return (
            React.createElement("textarea", {
                ref: "input", 
                onChange: this.handleChange
            })
            );
        }
    });
    var ShowArea = React.createClass({displayName: "ShowArea",
        render: function () {
            return (
            React.createElement("textarea", null)
            );
        }
    });
    var EditArea = React.createClass({displayName: "EditArea",
        render: function () {
            return (
                React.createElement("div", {class: "editarea"}, 
                    React.createElement(InputArea, null), 
                    React.createElement(ShowArea, null)
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
