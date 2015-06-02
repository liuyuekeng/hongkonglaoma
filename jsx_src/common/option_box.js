define(function() {
    var OptionBox = React.createClass({
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
                <div className="option-box right-bottom-position">
                    <a className="icon btn blue" onClick={this.switchState}>
                        {iconText}
                    </a>
                    <div className={"menu" + (this.state.open ? '' : ' hide')}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    });
    return OptionBox;
});
