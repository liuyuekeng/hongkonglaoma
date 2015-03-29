define(function(){
    /*
     *  分页组件
     *  接受三个属性，total(总页数)、selected(被选中页) 和 handelPageTagClick(点击事件)
     *  handelPageTagClick 传入一个参数，为被点击的页数
     */
    var PageTag = React.createClass({displayName: "PageTag",
        handleClick: function(num){
            this.props.handelPageTagClick(num);
        },
        render: function(){
            var _this = this;
            var tags = [];
            for(var i=0; i<=this.props.total; i++){
                if(i == _this.props.selected){
                    tags.push(
                        React.createElement("li", {className: "selected", onClick: _this.handleClick(i)}, i+1)
                    );
                }else{
                    tags.push(
                        React.createElement("li", {onClick: _this.handleClick(i)}, i+1)
                    );
                }
            }
        }
    });

    return PageTag;
});
