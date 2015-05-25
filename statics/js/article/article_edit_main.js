require(['article/article_editarea.js', 'common/header.js'], function (editarea, CommonHeader) {
    React.render(
        React.createElement(CommonHeader, null),
        document.getElementById('header')
    );
    React.render(
        React.createElement(editarea.EditArea, null),
        document.getElementById('content')
    );
});
