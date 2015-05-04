define(function(){
    /*
     *  分页组件
     *  接受三个属性，total(总页数)、selected(被选中页) 和 handelPageTagClick(点击事件)
     *  handelPageTagClick 传入一个参数，为被点击的页数
     */
    var PageTag = React.createClass({
        handleClick: function(ev){
            this.props.handelPageTagClick(ev.target.innerHTML);
        },
        render: function(){
            var tags = [];
            for(var i=1; i<=this.props.total; i++){
                if(i == this.props.selected){
                    tags.push(
                        <li className="selected btn blue" onClick={this.handleClick} key={i}>{i}</li>
                    );
                }else{
                    tags.push(
                        <li className="btn blue" onClick={this.handleClick} key={i}>{i}</li>
                    );
                }
            }
            return(
                <ul className="common-pagetag">
                    {tags}
                </ul>
            );
        }
    });

    return PageTag;
});
