define(['login_box.js'], function(box){
    React.render(
        React.createElement(box.LoginBox, null),
        document.getElementById('login-box')
    );
});
