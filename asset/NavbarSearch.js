


function navBarSearchSearch(){
    var e=document.getElementById("navBarSearchSearchInput").value
    
    var url = new URL(url_string);
    var forsharelinkurl = url.href;
    titleurl = forsharelinkurl;
    url = url.href + "?id=" + e;
    if(e!=""){
        window.location.href=(url)
        return false
    }
}