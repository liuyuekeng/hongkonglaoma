require(['article/article_editarea.js'], function (editarea) {
    React.render(
        <div>
            <editarea.inputArea />
            <editarea.markdownArea />
        </div>,
        document.body
    );
});
