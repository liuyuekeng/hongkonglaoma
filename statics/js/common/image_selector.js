define(function(){

    /* 图片选择模块 */

    var ImageSelector = react.createClass({
        getInitialState: function(){
        },
        render: function(){
            return(
                React.createElement("div", {className: "common-imageselector"}, 
                    React.createElement("ul", null
                    )
                )
            );
        }
    });

    return ImageSelector;
});
