
function getUser(url){
    url = decodeURIComponent(url).split("&");
    var user = {};
    for(var i = 0; i < url.length; i++){
        var arr = url[i].split("=");
        user[arr[0]] = arr[1];
    }
    return user;
}
var url = location.search.slice(1);
var user = getUser(url);
document.write("欢迎"+user.username);