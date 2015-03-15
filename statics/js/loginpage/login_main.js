require(['loginpage/login_box', 'lib/ajax'], function(box, ajax){
    React.render(
        React.createElement(box.LoginBox, null),
        document.getElementById('login-box')
    );
    window.ajax = ajax;
});
