define(function() {
    var OptionBox = React.createClass({displayName: "OptionBox",
        getInitialState: function () {
            return {
                open: false,
            };
        },
        switchState: function () {
            var open = !this.state.open;
            this.setState({
                open: open
            });
        },
        render: function() {
            var iconText = this.state.open ? '>' : '<';
            return (
                React.createElement("div", {className: "option-box right-bottom-position"}, 
                    React.createElement("a", {className: "icon btn blue", onClick: this.switchState}, 
                        iconText
                    ), 
                    React.createElement("div", {className: "menu" + (this.state.open ? '' : ' hide')}, 
                        this.props.children
                    )
                )
            );
        }
    });
    return OptionBox;
});
