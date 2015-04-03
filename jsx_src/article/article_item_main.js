require(['article/article_content.js'], function (content) {
    React.render(
        <content.articleDetail titleText="test" contentText="content test" creatTime="2015-3-28" modifyTime="2015-3-28"/>,
        document.body
    );
});
