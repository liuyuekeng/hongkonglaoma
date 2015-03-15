define(function(require, exports, module){
    function ajax (url, setting) {
        var xmlhttp = new XMLHttpRequest();
        var _method = setting.method ? setting.method : 'GET';
        var _success = null;
        var _data = setting.data ? setting.data : null;
        if (setting.success && setting.success) {
            var _success = setting.success
        }
        xmlhttp.open(_method, url, true);
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                _success(xmlhttp.responseText);
            }
        }
        xmlhttp.send(_method === "POST" ? _data : null);
    }
    module.exports = ajax;
})
