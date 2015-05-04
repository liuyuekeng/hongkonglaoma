require(['article/article_list.js', 'common/header.js'], function(list, CommonHeader){
    React.render(
        <CommonHeader/>,
        document.getElementById('header')
    );
    React.render(
        <list.Articles/>,
        document.getElementById('content')
    );
});
