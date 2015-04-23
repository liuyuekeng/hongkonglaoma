define(function(){
    var Header = React.createClass({displayName: "Header",
        render: function(){
            return (
                React.createElement("div", {className: "common-header"}, 
                    React.createElement("span", null, "Hongkonglaoma"), 
                    React.createElement("div", {className: "common-header-user"}
                    )
                )
            );
        }
    });

    return Header;
});
