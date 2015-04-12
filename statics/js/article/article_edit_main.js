require(['article/article_editarea.js'], function (editarea) {
    React.render(
        React.createElement(editarea.EditArea, null),
        document.body
    );
});
