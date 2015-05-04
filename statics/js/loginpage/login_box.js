define(function () {

    var LoginInput = React.createClass({displayName: "LoginInput",
        hendleChange: function () {
            var name = this.props.name;
            var ref = this.props.react_ref;
            this.props.inputChangeHandler(name, this.refs[ref].getDOMNode().value);
        },
        render: function () {
            return(
                React.createElement("div", {className: "inputItem"}, 
                    React.createElement("label", {for: "{this.props.react_id}"}, this.props.label + " :"), 
                    React.createElement("input", {
                        type: "text", 
                        ref: this.props.react_ref, 
                        onChange: this.hendleChange}
                    )
                )
            )
        }
    });

    var LoginWarning = React.createClass({displayName: "LoginWarning",
        render: function () {
            var mark = "";
            var content = "";
            var messageObj = this.props.message;
            if (messageObj.err) {
                mark = "red";
            }
            return(
                React.createElement("div", {className: "message " + mark}, this.props.message)
            )
        }
    });

    var LoginBox = React.createClass({displayName: "LoginBox",
        getInitialState: function () {
            return {
                username: "",
                password: "",
                message: {}
            };
        },
        handleSubmit : function (e) {
            e.preventDefault();
            var self = this;
            var state = self.state;
            ajax(
                '/api/user/login?username=' + state.username + '&passwd=' + state.password,
                {
                    method: 'get',
                    success: function (data) {
                        var JSONData = JSON.parse(data);
                        var messageObj = {};
                        console.log(JSONData);
                        self.setState({message: JSONData});
                    }
                }
            );
        },
        inputChangeHandler : function (name, value) {
            var obj = {};
            obj[name] = value;
            this.setState(obj);
        },
        render: function () {
            return(
                React.createElement("div", {className: "login-box"}, 
                    React.createElement("h1", {className: "title title1"}, "Login"), 
                    React.createElement("form", {className: "loginFrom", method: "post", onSubmit: this.handleSubmit}, 
                        React.createElement(LoginInput, {
                            react_ref: "username", 
                            name: "username", 
                            label: "user name", 
                            inputChangeHandler: this.inputChangeHandler}), 
                        React.createElement("br", null), 
                        React.createElement(LoginInput, {
                            react_ref: "password", 
                            name: "password", 
                            label: "pass word", 
                            inputChangeHandler: this.inputChangeHandler}), 
                        React.createElement("br", null), 
                        React.createElement("input", {
                            type: "submit", 
                            className: "btn blue", 
                            value: "LOGIN"})
                    ), 
                    React.createElement("br", null), 
                    React.createElement(LoginWarning, {message: this.state.message})
                )
            )
        }
    });

    return {
        LoginInput : LoginInput,
        LoginWarning : LoginWarning,
        LoginBox : LoginBox
    }
});
