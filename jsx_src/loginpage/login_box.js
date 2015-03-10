var LoginTitle = React.createClass({
    render: function () {
        return(
            <h1>Login</h1>
        )
    }
});

var LoginInput = React.createClass({
    render: function () {
        return(
            <div class="inputItem">
                <label for="{this.props.react_id}">{this.props.label}: </label>
                <input type="text" id="{this.props.react_id}" />
            </div>
        )
    }
});

var LoginWarning = React.createClass({
    render: function () {
        return(
            <div>test</div>
        )
    }
});

var LoginBtn = React.createClass({
    render: function () {
        return(
            <div>LOGIN</div>
        )
    }
});

var SigupBtn = React.createClass({
    render: function () {
        return(
            <div>SIGUP</div>
        )
    }
})


var LoginBox = React.createClass({
    render: function () {
        return(
            <div class="login-box">
                <LoginTitle />
                <form>
                    <LoginInput react_id="usernameInput" label="user name"/>
                    <br />
                    <LoginInput react_id="passwordInput" label="pass word"/>
                </form>
                <LoginWarning />
                <LoginBtn />
                <SigupBtn />
            </div>
        )
    }
});
React.render(
    <LoginBox />,
    document.getElementById('login-box')
);
