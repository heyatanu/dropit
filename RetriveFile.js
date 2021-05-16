//-----------------------RETRIVE ------------//
var myVar;
document.getElementById("retrieve").onclick = function() {
  myVar = setInterval(onofffun, 1000);
  ImgName = document.getElementById("namebox").value;
  ImgName = ImgName.trim();
  if (ImgName != "") {
    document.getElementById("search-file-status").innerText = "Wait we are checking"
    document.getElementById("search-file-type").src = "./Images/Loading/uploadinggif.gif";
    document.getElementById("download-btn-img").src = "./Images/Loading/uploadinggif.gif";
    firebase.database().ref('Picture/' + ImgName).on('value', function(snapshot) {
      if (snapshot.val() != null) {
        document.getElementById("download-btn").classList.remove("disabled");
        let getname = snapshot.val().Name;
        let extention = getname.split('.').pop();
        getname = getname.replace(/\.[^/.]+$/, "")

        // console.log(ImgName,getname)LocalFileName
        let finalname = getname + "." + extention;
        // console.log("YS")
        document.getElementById("search-file-id").innerHTML = getname;
        // document.getElementById("search-file-name").innerHTML = finalname;
        document.getElementById("search-file-name").innerHTML = snapshot.val().LocalFileName;
        let iconname = fileiconchoose(extention);
        document.getElementById("search-file-type").src = "./Images/FileIcons/" + iconname + ".png";
        document.getElementById("search-file-status").innerText = snapshot.val().UploadTime;
        document.getElementById("download-btn-img").src = './Images/Loading/uplodeComplate.gif'
        document.getElementById("download-btn").href = snapshot.val().Link;
        clearInterval(myVar);
      } else {
        document.getElementById("download-btn").classList.add("disabled");
        document.getElementById("search-file-id").innerHTML = ImgName;
        document.getElementById("search-file-name").innerHTML = "NOT FOUND";
        document.getElementById("search-file-status").innerText = "Check the ID"
        document.getElementById("search-file-type").src = "./Images/Loading/wrong.png";
        document.getElementById("download-btn-img").src = "./Images/Loading/wrong.png";
        clearInterval(myVar);
      }
    });
  } else {
    document.getElementById("search-file-status").innerText = "ID field is mandatory"
    clearInterval(myVar);
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
  } else if (ex == "c" || ex == "cpp" || ex == "java" || ex == "py" || ex == "html" || ex == "css" || ex == "scss" || ex == "js" || ex == "cs" || ex == "rb" || ex == "php" || ex == "sql" || ex == "mysql" || ex == "pl") {
    return ("code")
  } else {
    return ("file")
  }
}


function onofffun() {
  var status = navigator.onLine;
  if (status) {
    // console.log("ON")
    document.getElementById("search-file-status").innerText = "Wait we are checking"
  } else {
    // console.log("off");
    document.getElementById("search-file-status").innerText = "network lost"
  }
}