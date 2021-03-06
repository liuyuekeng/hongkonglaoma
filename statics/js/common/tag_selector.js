define(function(){
    /*
     *  tag 选择器
     *  接收三个属性
     *  tags: tag 数组
     *  selected: 已选中的 tag 数组
     *  handelTagSelectorClick: 点击事件响应，带一个参数，被点击的 tag 名
     */

     var TagSelector = React.createClass({displayName: "TagSelector",
        handleClick: function(ev){
            var target = ev.target;
            this.props.handelTagSelectorClick(target.innerHTML);
        },
        isSelected: function(tag){
            for(var i=0; i<this.props.selected.length; i++){
                if(tag === this.props.selected[i]){
                    return true;
                }
            }
            return false;
        },
        render: function(){
            var tags = this.props.tags;
            var tagItems = [];
            for(var i=0; i<tags.length; i++){
                if(isSelected(tags[i])){
                    tagItems.push(
                        React.createElement("li", {className: "selected", onClick: this.handleClick}, "tags[i]")
                    );
                }else{
                    tagItems.push(
                        React.createElement("li", {onClick: this.handleClick}, "tags[i]")
                    );
                }
            }

            return (
                React.createElement("ul", {className: "common-tagselector"}, 
                    tagItems
                )
            )
        }
     });

     return TagSelector;
})
