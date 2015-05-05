require(['article/article_content.js', 'common/header.js'], function (content, CommonHeader) {
    React.render(
        React.createElement(CommonHeader, null),
        document.getElementById('header')
    );
    React.render(
        React.createElement(content.articleDetail, null),
        document.getElementById('content')
    );
});
