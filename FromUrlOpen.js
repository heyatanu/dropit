var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
let search = url.search
let slicestr = search.slice(1, 3)

if (search.includes(",") || slicestr != "id" && search != "") {
  document.getElementById("link-status-txt").innerHTML = "Wrong URL, URL should be " + url.origin + "/?id=your ID"
  document.getElementById("fromlinkbtn").click()
} else if (id != null) {
  document.body.style.overflow = "hidden";
  document.getElementById("overlayforurldownload").style.display = "block";
  firebase.database().ref('Picture/' + id).on('value', function(snapshot) {

    if (snapshot.val() != null) {
      let aclink = (snapshot.val().Link);
      document.getElementById("overlayforurldownload-img").src='./Images/Loading/download.gif';
      document.getElementById("overlayforurldownload-a").classList.remove("disabled");
      document.getElementById("overlayforurldownload-a").innerHTML="download now";
      document.getElementById("overlayforurldownload-a").href=aclink;
      document.getElementById("overlayforurldownload-p").innerHTML="ready for download";
      document.getElementById("overlayforurldownload-a").onclick = function() {
        document.getElementById("overlayforurldownload").style.display = "none";
        document.body.style.overflow = "auto";
        let af=url.origin+url.pathname
        console.log(af)
        window.location.replace(af)
      }
        




    } else {
      document.body.style.overflow = "auto";
      document.getElementById("link-status-txt").innerHTML = "ID not found Check the ID"
      document.getElementById("fromlinkbtn").click()
      document.getElementById("overlayforurldownload").style.display = "none";
    }

  });


}