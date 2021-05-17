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
      document.getElementById("overlayforurldownload").style.display = "none";
      document.body.style.overflow = "auto";
      let aclink = (snapshot.val().Link);
    //   console.log(url)
      //window.open(aclink)
      window.open(
        aclink, "window name",
        "height=200,width=200,modal=yes,alwaysRaised=yes");
        
      let af=url.origin+url.pathname
      // console.log(af)
      window.location.replace(af)



    } else {
      document.body.style.overflow = "auto";
      document.getElementById("link-status-txt").innerHTML = "ID not found Check the ID"
      document.getElementById("fromlinkbtn").click()
      document.getElementById("overlayforurldownload").style.display = "none";
    }

  });


}