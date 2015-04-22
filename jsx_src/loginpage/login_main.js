require(['loginpage/login_box', 'lib/ajax'], function(box, ajax){
    window.ajax = ajax;
    React.render(
        <box.LoginBox />,
        document.getElementById('login-box')
    );
});
