//--------------------------VARIABLES-------------------------------------------------//
var ImgName, ImgUrl;
var files = [];
var reader;
var myVar;
let selectfilename = "";
var dateobj = new Date();
let uplodedate = "";
//----------------------SELECT THE IMAGE---------------//

document.getElementById("select").onclick = function(e) {
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
    document.getElementById('uplode_btn_img').style.width = "9%";
    document.getElementById('uplode_btn_img').src = './Images/Loading/ready.gif';
    document.getElementById("show-info-status").innerHTML = "ready for upload";
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      //   document.getElementById("myimg").src=reader.result;
    }
    reader.readAsDataURL(files[0]);
    //   console.log(files[0])
    selectfilename = files[0].name;
    document.getElementById("show-info-file-name").innerHTML = selectfilename;
    document.getElementById("show-info-file-type").innerHTML = files[0].type;
    let extentions = selectfilename.split('.').pop();
    let iconnames = fileiconchoose(extentions)
    document.getElementById("show_info_file_type_img").src = "./Images/FileIcons/" + iconnames + ".png";
    document.getElementById('upload').disabled = false;

  }

  input.click();


}
//----------------------UPLOAD THE IMAGE---------------//
document.getElementById("upload").onclick = function() {
  myVar = setInterval(onofffun, 1000);
  document.getElementById("uploading-img").src = './Images/Loading/uploadinggif.gif'
  document.getElementById("uplodeprogrssbar").classList.remove("progress-bar-primary");
  document.getElementById("uplodeprogrssbar").classList.add("progress-bar-success");
  let randomid = Math.floor(Math.random() * 9999999);
  let localfilename = (files[0].name)
  let extention = localfilename.split('.').pop();
  let uplodefilename = randomid + "." + extention
  //   console.log(uplodefilename)
  let iconname = fileiconchoose(extention)
  var uploadTask = firebase.storage().ref('Images/' + uplodefilename).put(files[0]);
  uploadTask.on('state_changed', function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress = parseInt(progress)
      document.getElementById("uplodeprogrssbar").style.width = progress + "%";
      document.getElementById("uplodeprogrssbar").innerHTML = progress + "%";
      document.getElementById("fileaccessid").innerHTML = "Wait we are uploading the file"
      document.getElementById("show-info-status").innerHTML = "uploading";
      document.getElementById('upload').disabled = true;

    },

    function(error) {
      //   alert("ERROR IN SAVING IMAGE");
      document.getElementById("fileaccessid").innerHTML = "we are faceing some error while uploading try later";
      document.getElementById("uploading-img").src = './Images/Loading/wrong.png'

    },

    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        uplodedate = dateobj.getDate() + "/" + dateobj.getMonth() + "/" + dateobj.getFullYear() + " T " + dateobj.getHours() + ":" + dateobj.getMinutes();

        firebase.database().ref('Picture/' + randomid).set({
          Name: randomid + "." + extention,
          Link: ImgUrl,
          LocalFileName: selectfilename,
          UploadTime: uplodedate
        });
        //   alert("SUCCESSFULL")
        // let ud=dateobj.getDate
        // console.log(uplodedate) 
        var url = new URL(url_string);
        url = url.href + "?id=" + randomid;

        document.getElementById("uplodeprogrssbar").innerHTML = "Upload Complete";
        document.getElementById("fileaccessid").innerHTML = "your file access id for " + selectfilename + " is " + randomid + " or copy the below link";
        // document.getElementById("copy_txt").innerHTML = ImgUrl;
        // document.getElementById("gogo").value = ImgUrl;
        document.getElementById("copy_txt").innerHTML = url;
        document.getElementById("gogo").value = url;
        document.getElementById("alertopenlink").href = ImgUrl;
        document.getElementById("uploading-img").src = './Images/Loading/uplodeComplate.gif'
        document.getElementById('upload').disabled = true;
        document.getElementById('copylink').disabled = false;
        document.getElementById("uplode_btn_img").src = './Images/Loading/uplodeComplate.gif'
        document.getElementById("show-info-status").innerHTML = "upload complete"
        document.getElementById("show-info-file-name").innerHTML = "FileName";
        document.getElementById("show-info-file-type").innerHTML = "FileType";
        document.getElementById("show-info-status").innerHTML = "WAITING FOR FILE";
        document.getElementById("show_info_file_type_img").src = "./Images/FileIcons/file.png"
        document.getElementById('uplode_btn_img').src = './Images/Loading/Waiting.gif';
        document.getElementById('uplode_btn_img').style.width = "5%";
        document.getElementById('upload').disabled = true;
        document.getElementById("uplodeprogrssbar").classList.remove("progress-bar-success");
        document.getElementById("uplodeprogrssbar").classList.add("progress-bar-primary");
        files = []
        // console.log(files.length)
        clearInterval(myVar);
      });
    });

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

//BUTTON CLICK LINK COPY

function copylinkfun() {
  var copyText = document.getElementById("gogo");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  // alert("Copied the text: " + copyText.value);
}



function onofffun() {
  var status = navigator.onLine;
  if (status) {
    // console.log("ON")
    document.getElementById("fileaccessid").innerHTML = "Wait we are uploading the file"
    document.getElementById("uploading-img").src = './Images/Loading/uploadinggif.gif'
    document.getElementById("uplodeprogrssbar").classList.remove("progress-bar-danger");
    document.getElementById("uplodeprogrssbar").classList.add("progress-bar-success");
    document.getElementById("show-info-status").innerHTML = "uploading";
  } else {
    // console.log("off");
    document.getElementById("fileaccessid").innerHTML = "network lost looking for network"
    document.getElementById("uploading-img").src = './Images/Loading/wifi.png'
    document.getElementById("uplodeprogrssbar").classList.remove("progress-bar-success");
    document.getElementById("uplodeprogrssbar").classList.add("progress-bar-danger");
    document.getElementById("show-info-status").innerHTML = "uploading pause";
  }
}