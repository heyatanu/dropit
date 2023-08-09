function rnadidforlog(){
	return Math.floor(Math.random() * 1000)
}
var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
let search = url.search
let slicestr = search.slice(1, 3)
let localfilename = "";
if (search.includes(",") || slicestr != "id" && search != "") {
	document.getElementById("link-status-txt").innerHTML = "Wrong URL, URL should be " + url.origin + "/?id=your ID"
	document.getElementById("fromlinkbtn").click()
} else if (id != null) {
	document.body.style.overflow = "hidden";
	let homelink = url.origin + url.pathname;
	document.getElementById("overlayforurldownload-dropit").href = homelink;
	document.getElementById("overlayforurldownload").style.display = "block";
	firebase.database().ref('Picture/' + id).on('value', function(snapshot) {

		if (snapshot.val() != null) {
			
			//LOG start
			var currentdate_log = new Date(); 
			var datetime_log =  currentdate_log.getDate() + "/"
                + (currentdate_log.getMonth()+1)  + "/" 
                + currentdate_log.getFullYear() + " @ "  
                + currentdate_log.getHours() + ":"  
                + currentdate_log.getMinutes() + ":" 
                + currentdate_log.getSeconds();
			firebase.database().ref('log/' + id+"_p"+rnadidforlog()).set({
				id:id,
				Name:  "PREVIEW" ,
				Link: snapshot.val().Link,
				LocalFileName: snapshot.val().LocalFileName,
				UploadTime: datetime_log,
				DeleteOnDownload: snapshot.val().DeleteOnDownload,
				IsAlreadyDownloaded: snapshot.val().IsAlreadyDownloaded,
				Password: snapshot.val().Password,
				status:"SUCCESS"
			});
			//LOG END
			localfilename = snapshot.val().LocalFileName;
			let aclink = (snapshot.val().Link);
			document.getElementById("overlayforurldownload-img").src = './Images/Loading/download.gif';
			document.getElementById("overlayforurldownload-a").classList.remove("disabled");
			document.getElementById("overlayforurldownload-a").classList.remove("btn-dark");
			document.getElementById("overlayforurldownload-a").classList.add("btn-primary");
			document.getElementById("overlayforurldownload-a").innerHTML = "download now";
			document.getElementById("overlayforurldownload-a").href = aclink;
			document.getElementById("overlayforurldownload-p").innerHTML = localfilename + " ready for download";
			document.getElementById('overlayforurldownload-a').ondragstart = function() {
				return false;
			};



			document.getElementById("overlayforurldownload-a").onclick = function() {

				firebase.database().ref('Picture/' + id).update({
					IsAlreadyDownloaded: true
				});
							//LOG start
			var currentdate_log = new Date(); 
			var datetime_log =  currentdate_log.getDate() + "/"
                + (currentdate_log.getMonth()+1)  + "/" 
                + currentdate_log.getFullYear() + " @ "  
                + currentdate_log.getHours() + ":"  
                + currentdate_log.getMinutes() + ":" 
                + currentdate_log.getSeconds();
			firebase.database().ref('log/' + id+"_d"+rnadidforlog()).set({
				id:id,
				Name:  "DOWNLOAD" ,
				Link: snapshot.val().Link,
				LocalFileName: snapshot.val().LocalFileName,
				UploadTime: datetime_log,
				DeleteOnDownload: snapshot.val().DeleteOnDownload,
				IsAlreadyDownloaded: snapshot.val().IsAlreadyDownloaded,
				Password: snapshot.val().Password,
				status:"SUCCESS"
			});
			//LOG END
			}

		} else {
			document.getElementById("overlayforurldownload-img").style.width = "8%";
			document.getElementById("overlayforurldownload-img").style.marginBottom = "15px";
			document.getElementById("overlayforurldownload-img").src = './Images/Loading/wrong.png';
			document.getElementById("overlayforurldownload-a").innerHTML = "not found";
			document.getElementById("overlayforurldownload-a").classList.add("disabled");
			document.getElementById("overlayforurldownload-p").innerHTML = "file not found check the ID";
				//LOG start
				var currentdate_log = new Date(); 
				var datetime_log =  currentdate_log.getDate() + "/"
					+ (currentdate_log.getMonth()+1)  + "/" 
					+ currentdate_log.getFullYear() + " @ "  
					+ currentdate_log.getHours() + ":"  
					+ currentdate_log.getMinutes() + ":" 
					+ currentdate_log.getSeconds();
				firebase.database().ref('log/' + id+"_p"+rnadidforlog()).set({
					id:id,
					Name: "SEARCHE",
					Link: "N/A",
					LocalFileName: "N/A",
					UploadTime: datetime_log,
					DeleteOnDownload: "N/A",
					IsAlreadyDownloaded: "N/A",
					Password: "N/A",
					status:"FAILED"
				});
				//LOG END
		}

	});


}