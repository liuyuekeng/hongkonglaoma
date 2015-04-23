require(['article/article_list.js', 'common/header.js'], function(list, header){
    React.render(
        <list.Articles/>,
        document.getElementById('content')
    );
});
