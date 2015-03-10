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
            <form>
                <label for="usernameInput">username: </label>
                <input type="text" id="usernameInput" />
                <br />
                <label for="passwdInput">pass word: </label>
                <input type="text" id="passwdInput"/>
            </form>
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

var LoginBox = React.createClass({
    render: function () {
        return(
            <div class="login-box">
                <LoginTitle />
                <LoginInput />
            </div>
        )
    }
});
React.render(
    <LoginBox />,
    document.getElementById('login-box')
);
