require(['article/article_list.js', 'common/header.js'], function(list, CommonHeader){
    React.render(
        React.createElement(CommonHeader, null),
        document.getElementById('header')
    );
    React.render(
        React.createElement(list.Articles, null),
        document.getElementById('content')
    );
});
