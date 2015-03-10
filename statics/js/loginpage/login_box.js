var LoginTitle = React.createClass({displayName: "LoginTitle",
    render: function () {
        return (
            React.createElement("h1", null, "Login")
        )
    }
});

var LoginInput = React.createClass({displayName: "LoginInput",
    render: function () {
        return (
        React.createElement("form", null, 
            React.createElement("label", {for: "usernameInput"}, "username: "), 
            React.createElement("input", {type: "text", id: "usernameInput"}), 
            React.createElement("label", {for: "passwdInput"}, "pass word: "), 
            React.createElement("input", {type: "text", id: "passwdInput"})
        )
        )
    }
});

var LoginBox = React.createClass({displayName: "LoginBox",
    render: function () {
        return (
        React.createElement("div", {class: "login-box"}, 
            React.createElement(LoginTitle, null), 
            React.createElement(LoginInput, null)
        )
        )
    }
});
React.render(
    React.createElement(LoginBox, null),
    document.getElementById('login-box')
);
