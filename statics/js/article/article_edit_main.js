require(['article/article_editarea.js'], function (editarea) {
    React.render(
        React.createElement("div", null, 
            React.createElement(editarea.inputArea, null), 
            React.createElement(editarea.markdownArea, null)
        ),
        document.body
    );
});
