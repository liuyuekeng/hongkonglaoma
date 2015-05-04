define(function () {

    var LoginInput = React.createClass({
        hendleChange: function () {
            var name = this.props.name;
            var ref = this.props.react_ref;
            this.props.inputChangeHandler(name, this.refs[ref].getDOMNode().value);
        },
        render: function () {
            return(
                <div className="inputItem">
                    <label for="{this.props.react_id}">{this.props.label + " :"}</label>
                    <input
                        type="text"
                        ref={this.props.react_ref}
                        onChange={this.hendleChange}
                    />
                </div>
            )
        }
    });

    var LoginWarning = React.createClass({
        render: function () {
            var mark = "";
            var content = "";
            var messageObj = this.props.message;
            if (messageObj.err) {
                mark = "red";
            }
            return(
                <div className={"message " + mark}>{this.props.message}</div>
            )
        }
    });

    var LoginBox = React.createClass({
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
                <div className="login-box">
                    <h1 className="title title1">Login</h1>
                    <form className="loginFrom" method="post" onSubmit={this.handleSubmit}>
                        <LoginInput 
                            react_ref="username"
                            name="username"
                            label="user name"
                            inputChangeHandler={this.inputChangeHandler}/>
                        <br />
                        <LoginInput
                            react_ref="password"
                            name="password"
                            label="pass word"
                            inputChangeHandler={this.inputChangeHandler}/>
                        <br />
                        <input
                            type="submit"
                            className="btn blue"
                            value="LOGIN" />
                    </form>
                    <br />
                    <LoginWarning message={this.state.message} />
                </div>
            )
        }
    });

    return {
        LoginInput : LoginInput,
        LoginWarning : LoginWarning,
        LoginBox : LoginBox
    }
});
