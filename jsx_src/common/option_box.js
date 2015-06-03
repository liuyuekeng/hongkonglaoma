define(function() {
    var OptionBox = React.createClass({
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
                <div className="option-box right-bottom-position">
                    <a className={"btn blue icon" + (this.state.open ? ' down' : ' up')} onClick={this.switchState}>
                        >
                    </a>
                    <div className={"menu" + (this.state.open ? ' show' : '')}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    });
    return OptionBox;
});
