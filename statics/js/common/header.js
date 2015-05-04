define(function(){
    var Header = React.createClass({displayName: "Header",
        render: function(){
            return (
                React.createElement("div", null, 
                    React.createElement("span", {className: "hongkonglaoma title"}, "Hongkonglaoma"), 
                    React.createElement("div", {className: "common-header-user"}
                    )
                )
            );
        }
    });

    return Header;
});
