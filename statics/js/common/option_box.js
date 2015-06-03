define(function() {
    var OptionBox = React.createClass({displayName: "OptionBox",
        getInitialState: function () {
            return {
                open: false
            };
        },
        switchState: function () {
            var open = !this.state.open;
            this.setState({
                open: open
            });
        },
        render: function() {
            return (
                React.createElement("div", {className: "option-box right-bottom-position"}, 
                    React.createElement("a", {className: "btn blue icon" + (this.state.open ? ' down' : ' up'), onClick: this.switchState}, 
                        ">"
                    ), 
                    React.createElement("div", {className: "menu" + (this.state.open ? ' show' : '')}, 
                        this.props.children
                    )
                )
            );
        }
    });
    return OptionBox;
});
