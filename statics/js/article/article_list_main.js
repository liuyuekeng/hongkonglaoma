require(['article/article_list.js', 'common/header.js'], function(list, header){
    React.render(
        React.createElement(list.Articles, null),
        document.getElementById('content')
    );
});
