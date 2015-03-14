define(['login_box.js'], function(box){
    React.render(
        <box.LoginBox />,
        document.getElementById('login-box')
    );
});
