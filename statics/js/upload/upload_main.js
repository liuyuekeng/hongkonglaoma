require(['common/file_uploader.js', 'common/header.js'], function(CommonUploader, CommonHeader){
    React.render(
        React.createElement(CommonHeader, null),
        document.getElementById('header')
    );
    React.render(
        React.createElement(CommonUploader, null),
        document.getElementById('content')
    );
})
