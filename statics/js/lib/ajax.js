define(function(require, exports, module){
    /**
     * suport setting
     *  method
     *  success
     *  data
     */
    function ajax (url, setting) {

        var xmlhttp = new XMLHttpRequest();
        var _method = setting.method ? setting.method : 'get';
        var _success = (setting.success && typeof setting.success === "function") ? setting.success : function () {return};
        var _data = setting.data ? setting.data : null;

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
});
