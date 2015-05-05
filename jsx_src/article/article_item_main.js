require(['article/article_content.js', 'common/header.js'], function (content, CommonHeader) {
    React.render(
        <CommonHeader />,
        document.getElementById('header')
    );
    React.render(
        <content.articleDetail />,
        document.getElementById('content')
    );
});
