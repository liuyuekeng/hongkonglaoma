require(['common/file_uploader.js', 'common/header.js'], function(CommonUploader, CommonHeader){
    React.render(
        <CommonHeader/>,
        document.getElementById('header')
    );
    React.render(
        <CommonUploader/>,
        document.getElementById('content')
    );
})
