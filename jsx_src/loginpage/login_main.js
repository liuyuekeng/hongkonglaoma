require(['loginpage/login_box', 'lib/ajax'], function(box, ajax){
    React.render(
        <box.LoginBox />,
        document.getElementById('login-box')
    );
    window.ajax = ajax;
});
