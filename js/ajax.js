
function sendAjax(url,options){
    var _default = {
        method:"GET",
        data:null,
        success:null,
        error:null
    };
    for(var i in options){
        _default[i] = options[i];
    }
    if(_default.method.toUpperCase() === "GET"){
        var f = url.indexOf("?") > -1 ? "&" : "?";
        url += f + "_=" +Date.now();
        for(var j in _default.data){
            url += "&" + j + "=" +_default.data[j];
        }
        _default.data = null;
    }else{
        _default.data = JSON.stringify(_default.data);
    }
    var xhr = new XMLHttpRequest();
    xhr.open(_default.method,url,true);
    xhr.send(_default.data);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                if(typeof _default.success === "function"){
                    var data = JSON.parse(xhr.response);
                    _default.success(xhr.response);
                }
            }else{
                if(typeof _default.error === "function"){
                    _default.error();
                }
            }
        }
    }
}