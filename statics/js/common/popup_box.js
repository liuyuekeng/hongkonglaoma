define(function() {
    var PopupBox = React.createClass({displayName: "PopupBox",
        getInitialState: function() {
            return {
                open: false
            };
        },
        close: function() {
            this.setState({
                open: false
            });
        },
        open: function () {
            this.setState({
                open: true
            });
        },
        render: function() {
            return (
                React.createElement("div", {className: "popup-box mask" + (this.state.open ? ' open' : '')}, 
                    React.createElement("div", {className: "box"}, 
                        React.createElement("div", {className: "box-head"}, 
                            this.props.title, 
                            React.createElement("span", {className: "close", onClick: this.close}, "X")
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
