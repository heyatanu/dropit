//-----------------------RETRIVE ------------//
let getname = "";
var x, i;
document.getElementById("retrieve").onclick = function() {
	ImgName = document.getElementById("namebox").value;
	ImgName = ImgName.trim();
	if (ImgName != "") {
		document.getElementById("search-file-status").innerText = "Wait we are checking"
		document.getElementById("search-file-type").src = "./Images/Loading/uploadinggif.gif";
		document.getElementById("download-btn-img").src = "./Images/Loading/uploadinggif.gif";

		firebase.database().ref('Picture/' + ImgName).on('value', function(snapshot) {
			if (snapshot.val() != null) {
				if (snapshot.val().IsAlreadyDownloaded == true && snapshot.val().DeleteOnDownload == true) {
					document.getElementById("download-btn").classList.add("disabled");
					document.getElementById("search-file-id").innerHTML = ImgName;
					document.getElementById("search-file-name").innerHTML = "NOT FOUND";
					document.getElementById("search-file-status").innerText = "Check the ID"
					document.getElementById("search-file-type").src = "./Images/Loading/wrong.png";
					document.getElementById("download-btn-img").src = "./Images/Loading/wrong.png";

					x = document.querySelectorAll(".retriveallsharebtn");
					for (i = 0; i < x.length; i++) {
						x[i].classList.add("disabled");
					}
				} else {
					var url = new URL(url_string);
					var forsharelinkurl = url.href;
					titleurl = forsharelinkurl;
					url = url.href + "?id=" + ImgName;
					document.getElementById("gogo").value = url;
					document.getElementById("qr-text").value = url;
					filenameforqr = snapshot.val().LocalFileName + "-" + ImgName;
					// document.getElementsByClassName("datat").classList.add("disabled");
					x = document.querySelectorAll(".retriveallsharebtn");
					for (i = 0; i < x.length; i++) {
						x[i].classList.remove("disabled");
					}

					document.getElementById("download-btn").classList.remove("disabled");
					getname = snapshot.val().Name;
					let extention = getname.split('.').pop();
					getname = getname.replace(/\.[^/.]+$/, "")
					let finalname = getname + "." + extention;
					document.getElementById("search-file-id").innerHTML = getname;
					let localfilenameinretf = snapshot.val().LocalFileName;
					var localres = localfilenameinretf.split("-");
					document.getElementById("search-file-name").innerHTML = localres[1];
					let iconname = fileiconchoose(extention);
					document.getElementById("search-file-type").src = "./Images/FileIcons/" + iconname + ".png";
					document.getElementById("search-file-status").innerText = snapshot.val().UploadTime;
					document.getElementById("download-btn-img").src = './Images/Loading/uplodeComplate.gif';
					document.getElementById("download-btn").href = url;

					if (snapshot.val().DeleteOnDownload == true) {

						sharetext = `#DropIT#` +
							`To download the file ` + snapshot.val().LocalFileName + `, ` +
							`with access ID 🚩 ` + ImgName + ` ` +
							`⚠ MAKE SURE THAT YOU CAN DOWNLOAD THE FILE ONLY ONCE ⚠` +
							`Click on the below link to download 🔗 >>>>> `;

					} else {
						sharetext = `#DropIT#` +
							`To download the file ` + snapshot.val().LocalFileName + `, ` +
							`with access ID 🚩 ` + ImgName + ` ` +
							`Click on the below link to download 🔗 >>>>> `;
						shareurl = url;
					}
				}
			} else {
				// console.log("FROM ELSE")
				document.getElementById("download-btn").classList.add("disabled");
				document.getElementById("search-file-id").innerHTML = ImgName;
				document.getElementById("search-file-name").innerHTML = "NOT FOUND";
				document.getElementById("search-file-status").innerText = "Check the ID"
				document.getElementById("search-file-type").src = "./Images/Loading/wrong.png";
				document.getElementById("download-btn-img").src = "./Images/Loading/wrong.png";

				x = document.querySelectorAll(".retriveallsharebtn");
				for (i = 0; i < x.length; i++) {
					x[i].classList.add("disabled");
				}
			}

		});

	} else {
		popupNotificationfx( "Enter the ID")
		document.getElementById("search-file-status").innerText = "ID field is mandatory"
	}
}

function fileiconchoose(ex) {
	if (ex == "pdf") {
		return ("pdf")
	} else if (ex == "jpg" || ex == "jpeg" || ex == "png" || ex == "gif" || ex == "ico") {
		return ("image")
	} else if (ex == "mp3" || ex == "wav") {
		return ("music")
	} else if (ex == "mp4" || ex == "mov" || ex == "wmv" || ex == "mkv" || ex == "webm") {
		return ("video")
	} else if (ex == "docx" || ex == "doc") {
		return ("doc")
	} else if (ex == "ppt") {
		return ("powerpoint")
	} else if (ex == "xlsx") {
		return ("xlxs")
	} else if (ex == "exe") {
		return ("exe")
	} else if (ex == "apk") {
		return ("apk")
	} else if (ex == "rar" || ex == "zip" || ex == "jar") {
		return ("zip")
	} else if (ex == "c" || ex == "cpp" || ex == "java" || ex == "py" || ex == "html" || ex == "txt" || ex == "css" || ex == "scss" || ex == "js" || ex == "cs" || ex == "rb" || ex == "php" || ex == "sql" || ex == "mysql" || ex == "pl") {
		return ("code")
	} else {
		return ("file")
	}
}