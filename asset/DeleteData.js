function rnadidforlog(){
	return Math.floor(Math.random() * 1000)
}
document.getElementById("deletedata-btn").onclick = function() {
	
	let fileid = document.getElementById("deletedata-id").value;
	let fileex = document.getElementById("deletedata-ex").value;
	let deletedataststus = document.getElementById("deletedata-sts");
	deletedataststus.innerHTML = "let's check"
	fileid = fileid.trim()
	fileex = fileex.trim()
	// fileex = fileex.toLowerCase();
	let boolb = false;
	let filenameui = fileid + "." + fileex;
	if (fileex == "" || fileid == "") {
		//NOT VALID
		// console.log("NOT VALID")
		deletedataststus.innerHTML = "both filed is required"
		popupNotificationfx("both filed is required")
	} else {
		document.getElementById("deletedata-btn").disabled = true;
		// console.log("WAIT")
		deletedataststus.innerHTML = "wait let us check"
		firebase.database().ref('Picture/' + fileid).on('value', function(snapshot) {
			if (snapshot.val() != null) {
				let fetchfilepass = snapshot.val().Password;
				if (fileex == fetchfilepass) {
					firebase.database().ref('Picture/' + fileid).update({
						DeleteOnDownload: true,
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
					firebase.database().ref('log/' + fileid+'_d').set({
						id:fileid,
						Name: "DELETE",
						Link: snapshot.val().Link,
						LocalFileName: snapshot.val().LocalFileName,
						UploadTime: datetime_log,
						DeleteOnDownload: snapshot.val().DeleteOnDownload,
						IsAlreadyDownloaded: snapshot.val().IsAlreadyDownloaded,
						Password: snapshot.val().Password,
						status:"SUCCESS"
					});
					//LOG END
					deletedataststus.innerHTML = "wait"
					setTimeout(function() {
						document.getElementById("overlayforurldownload").style.display = "block";
						document.getElementById("overlayforurldownload").innerHTML = `
                            <img id="overlayforurldownload-img" src="./Images/Loading/delete-img-com.gif" alt="">
                            <p id="overlayforurldownload-p">take a break let us save the changes</p>
                            `;;
					}, 1000);

					setTimeout(function() {
						document.getElementById("overlayforurldownload").style.display = "block";
						document.getElementById("overlayforurldownload").innerHTML = `
                                <img id="overlayforurldownload-img" src="./Images/Loading/delete-img-com.gif" alt="">
                                <p id="overlayforurldownload-p">delete successful window will automatically reload</p>
                                `;;
					}, 2000);

					setTimeout(function() {
						location.reload();;
					}, 3000);
				} else {
					//WRONG EXTENTION
					// console.log("NOT EX")
						//NOT FOUND
				// console.log("NOT FOUND")
								//LOG start
								var currentdate_log = new Date(); 
								var datetime_log =  currentdate_log.getDate() + "/"
									+ (currentdate_log.getMonth()+1)  + "/" 
									+ currentdate_log.getFullYear() + " @ "  
									+ currentdate_log.getHours() + ":"  
									+ currentdate_log.getMinutes() + ":" 
									+ currentdate_log.getSeconds();
								firebase.database().ref('log/' + fileid+"_p"+rnadidforlog()).set({
									id:fileid,
									Name: "DELETE",
									Link: "N/A",
									LocalFileName: "N/A",
									UploadTime: datetime_log,
									DeleteOnDownload: "N/A",
									IsAlreadyDownloaded: "N/A",
									Password: fileex,
									status:"WRONG PASS"
								});
								//LOG END

					deletedataststus.innerHTML = "please check"
					document.getElementById("deletedata-btn").disabled = false;
					setTimeout(function() {
						deletedataststus.innerHTML = "try again";
					}, 1500);

				}
			} else {
				//NOT FOUND
				// console.log("NOT FOUND")
								//LOG start
								var currentdate_log = new Date(); 
								var datetime_log =  currentdate_log.getDate() + "/"
									+ (currentdate_log.getMonth()+1)  + "/" 
									+ currentdate_log.getFullYear() + " @ "  
									+ currentdate_log.getHours() + ":"  
									+ currentdate_log.getMinutes() + ":" 
									+ currentdate_log.getSeconds();
								firebase.database().ref('log/' + fileid+"_p"+rnadidforlog()).set({
									id:fileid,
									Name: "DELETE",
									Link: "N/A",
									LocalFileName: "N/A",
									UploadTime: datetime_log,
									DeleteOnDownload: "N/A",
									IsAlreadyDownloaded: "N/A",
									Password: fileex,
									status:"FAILED"
								});
								//LOG END
				deletedataststus.innerHTML = "file not found"
				popupNotificationfx("file not found")
				document.getElementById("deletedata-btn").disabled = false;
				setTimeout(function() {
					deletedataststus.innerHTML = "try again";
				}, 1500);
			}
		});

	}
}



// console.disableYellowBox = true;