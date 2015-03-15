define('loginpage/login_box',[],function () {
    var LoginTitle = React.createClass({displayName: "LoginTitle",
        render: function () {
            return(
                React.createElement("h1", null, "Login")
            )
        }
    });

    var LoginInput = React.createClass({displayName: "LoginInput",
        render: function () {
            return(
                React.createElement("div", {class: "inputItem"}, 
                    React.createElement("label", {for: "{this.props.react_id}"}, this.props.label, ": "), 
                    React.createElement("input", {type: "text", id: "{this.props.react_id}"})
                )
            )
        }
    });

    var LoginWarning = React.createClass({displayName: "LoginWarning",
        render: function () {
            return(
                React.createElement("div", null, "test")
            )
        }
    });

    var LoginBtn = React.createClass({displayName: "LoginBtn",
        render: function () {
            return(
                React.createElement("div", null, "LOGIN")
            )
        }
    });

    var SigupBtn = React.createClass({displayName: "SigupBtn",
        render: function () {
            return(
                React.createElement("div", null, "SIGUP")
            )
        }
    })


    var LoginBox = React.createClass({displayName: "LoginBox",
        render: function () {
            return(
                React.createElement("div", {class: "login-box"}, 
                    React.createElement(LoginTitle, null), 
                    React.createElement("form", null, 
                        React.createElement(LoginInput, {react_id: "usernameInput", label: "user name"}), 
                        React.createElement("br", null), 
                        React.createElement(LoginInput, {react_id: "passwordInput", label: "pass word"})
                    ), 
                    React.createElement(LoginWarning, null), 
                    React.createElement(LoginBtn, null), 
                    React.createElement(SigupBtn, null)
                )
            )
        }
    });

    return {
        LoginTitle : LoginTitle,
        LoginInput : LoginInput,
        LoginWarning : LoginWarning,
        LoginBtn : LoginBtn,
        SigupBtn : SigupBtn,
        LoginBox : LoginBox
    }
});

define('lib/ajax',['require','exports','module'],function(require, exports, module){
    function ajax (url, setting) {
        var xmlhttp = new XMLHttpRequest();
        var _method = setting.method ? setting.method : 'GET';
        var _success = null;
        var _data = setting.data ? setting.data : null;
        if (setting.success && setting.success) {
            var _success = setting.success
        }
        xmlhttp.open(_method, url, true);
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                _success(xmlhttp.responseText);
            }
        }
        xmlhttp.send(_method === "POST" ? _data : null);
    }
    module.exports = ajax;
})
;
require(['loginpage/login_box', 'lib/ajax'], function(box, ajax){
    React.render(
        React.createElement(box.LoginBox, null),
        document.getElementById('login-box')
    );
    window.ajax = ajax;
});

define("loginpage/login_main", function(){});

