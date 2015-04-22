define('loginpage/login_box',[],function () {

    var LoginInput = React.createClass({displayName: "LoginInput",
        hendleChange: function () {
            var name = this.props.name;
            var ref = this.props.react_ref;
            this.props.inputChangeHandler(name, this.refs[ref].getDOMNode().value);
        },
        render: function () {
            return(
                React.createElement("div", {class: "inputItem"}, 
                    React.createElement("label", {for: "{this.props.react_id}"}, this.props.label, ": "), 
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
            var messageObj = this.props.message;
            if (messageObj.err) {
                mark = "red";
            }
            return(
                React.createElement("div", {className: mark}, messageObj.message)
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
                    method: 'GET',
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
                React.createElement("div", {class: "login-box"}, 
                    React.createElement("h1", null, "Login"), 
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
                        React.createElement("input", {type: "submit", value: "LOGIN"})
                    ), 
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

define('lib/ajax',['require','exports','module'],function(require, exports, module){
    /**
     * suport setting
     *  method
     *  success
     *  data
     */
    function ajax (url, setting) {
        //默认参数
        var defaultObj = {
            method: "GET",
            success: function () {
                return;
            },
            data: null,
            contentType: {
                "POST": "application/x-www-form-urlencoded"
            }
        };

        //参数整理
        var xmlhttp = new XMLHttpRequest();
        var _method = setting.method ? setting.method.toLocaleUpperCase() : defaultObj.method;
        var _success = (setting.success && typeof setting.success === "function") ? setting.success : defaultObj.success;
        var dataObj = setting.data ? setting.data : false;
        var _data = "";
        if (dataObj) {
            for (item in dataObj) {
                if (dataObj.hasOwnProperty(item)) {
                    _data += (item + "=" + dataObj[item] + "&");
                }
            }
            _data = _data.substring(0, _data.length - 1);
        } else {
            _data = defaultObj.data;
        }
        var _contentType = setting.contentType ? setting.contentType : false;
        if (!_contentType && defaultObj.contentType[_method]) {
            _contentType = defaultObj.contentType[_method];
        }

        //发送请求
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                _success(xmlhttp.responseText);
            }
        }

        xmlhttp.open(_method, url, true);

        if (_contentType) {
            xmlhttp.setRequestHeader("Content-Type", _contentType); 
        }
        xmlhttp.send(_data);
    }
    module.exports = ajax;
});

require(['loginpage/login_box', 'lib/ajax'], function(box, ajax){
    window.ajax = ajax;
    React.render(
        React.createElement(box.LoginBox, null),
        document.getElementById('login-box')
    );
});

define("loginpage/login_main", function(){});

