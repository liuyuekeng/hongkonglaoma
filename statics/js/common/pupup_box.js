define(function() {
    var PopupBox = React.createClass({displayName: "PopupBox",
        getInitialState: function() {
            return {
                open: false
            };
        },
        switchState: function() {
            var open = !this.state.open;
            this.setState({
                open: open
            });
        },
        render: function() {
            return (
                React.createElement("div", {className: "popup-box mask"}, 
                    React.createElement("div", {className: "box"}, 
                        React.createElement("div", {className: "title"}, 
                            this.props.title, 
                            React.createElement("span", {className: "close"}, "X")
                        ), 
                        React.createElement("div", {className: "content"}, 
                            this.props.children
                        )
                    )
                )
            );
        }
    });
    return PopupBox;
});
