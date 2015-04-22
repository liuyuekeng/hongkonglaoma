require(['loginpage/login_box', 'lib/ajax'], function(box, ajax){
    window.ajax = ajax;
    React.render(
        React.createElement(box.LoginBox, null),
        document.getElementById('login-box')
    );
});
