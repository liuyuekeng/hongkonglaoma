define(function() {
    var PopupBox = React.createClass({
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
                <div className={"popup-box mask" + (this.state.open ? ' open' : '')}>
                    <div className="box">
                        <div className="box-head">
                            {this.props.title}
                            <span className="close" onClick={this.close}>X</span>
                        </div>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        }
    });
    return PopupBox;
});
