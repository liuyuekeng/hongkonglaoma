require(['article/article_editarea.js', 'common/header.js'], function (editarea, CommonHeader) {
    React.render(
        <CommonHeader />,
        document.getElementById('header')
    );
    React.render(
        <editarea.EditArea/>,
        document.getElementById('content')
    );
});
