//--------------------------VARIABLES-------------------------------------------------//
var ImgName, ImgUrl;
var files = [];
var reader;
let selectfilename = "";
var dateobj = new Date();
let uplodedate = "";
let deleteon1stdownload = false;
let sharetext=``;
let shareurl="";
let titleurl="";
 
//----------------------SELECT THE IMAGE---------------//

document.getElementById("select").onclick = function(e) {
    document.getElementById("sharelink").disabled = true;
    document.getElementById("qrshare").disabled = true;
    document.getElementById('for-delete-checkbox').checked = false;
    document.getElementById("uplodeprogrssbar").innerHTML = "Waiting for upload";
    document.getElementById("fileaccessid").innerHTML = "Your File Access ID Will Appare Here";
    document.getElementById("copy_txt").innerHTML = "Your access link will appare here";
    document.getElementById("uploading-img").src = './Images/Loading/Waiting.gif';
    document.getElementById("for-delete-sts").innerHTML = "WAITING FOR FILE";
    document.getElementById("copylink").disabled = true;
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        document.getElementById('uplode_btn_img').src = './Images/Loading/ready.gif';
        document.getElementById('uplode_btn_img').style.width = "9%";
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
        document.getElementById('for-delete-checkbox').disabled = false;
        document.getElementById('for-delete-sts').innerHTML = "click the checkbox if you want to delete the file after first download"
        document.getElementById("for-delete-checkbox").onchange = function() {
            if (document.getElementById('for-delete-checkbox').checked == true) {
                deleteon1stdownload = true;
                document.getElementById('for-delete-sts').innerHTML = "yes i want to delete the file after first download"
            } else {
                deleteon1stdownload = false;
                document.getElementById('for-delete-sts').innerHTML = "no i don't want to delete after first download"
            }
        }

    }

    input.click();
}



//----------------------UPLOAD THE IMAGE---------------//
document.getElementById("upload").onclick = function() {

    document.getElementById("select").disabled = true;
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
            document.getElementById("select").disabled = false;


        },

        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                ImgUrl = url;
                uplodedate = dateobj.getDate() + "/" + dateobj.getMonth() + "/" + dateobj.getFullYear() + " T " + dateobj.getHours() + ":" + dateobj.getMinutes();

                firebase.database().ref('Picture/' + randomid).set({
                    Name: randomid + "." + extention,
                    Link: ImgUrl,
                    LocalFileName: selectfilename,
                    UploadTime: uplodedate,
                    DeleteOnDownload: deleteon1stdownload,
                    IsAlreadyDownloaded: false
                });
                //   alert("SUCCESSFULL")
                // let ud=dateobj.getDate
                // console.log(uplodedate) 
                var url = new URL(url_string);
                var forsharelinkurl=url.href;
                titleurl=forsharelinkurl;
                url = url.href + "?id=" + randomid;
                document.getElementById("uplodeprogrssbar").innerHTML = "Upload Complete";
                document.getElementById("fileaccessid").innerHTML = "your file access id for " + selectfilename + " is " + randomid + " or copy the below link";
                filenameforqr=selectfilename+"-"+randomid;
                // document.getElementById("copy_txt").innerHTML = ImgUrl;
                // document.getElementById("gogo").value = ImgUrl;
                document.getElementById("qr-text").value=url;
                document.getElementById("copy_txt").innerHTML = url;
                document.getElementById("gogo").value = url;
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
                document.getElementById("select").disabled = false;
                document.getElementById("sharelink").disabled = false;
                document.getElementById("qrshare").disabled = false;
                document.getElementById('for-delete-checkbox').disabled = true;
                if (deleteon1stdownload){
                    sharetext=`#------------DropIT Share------------#`+
                    `<----------------File Name:-   `+selectfilename+`---------------->`+
                    `<----------------File access 🚩🚩 ID is `+randomid+`---------------->`+
                    `<---------------- 🚧 ⚠ MAKE SURE THAT YOU CAN DOWNLOAD THE FILE ONLY ONCE ⚠ 🚧  ---------------->`+
                        `<---------------- ⚠ ♻ LATER THIS FILE IS AUTOMATICLY DELETED ♻ ⚠ ---------------->`+
                    `<---------------- Checkout the lattest file shareing site `+forsharelinkurl+` ---------------->`+
                    `<---------------- Click on the below link to download ✔ >>>>>>`;
                    shareurl=url;
                }
                else{
                                            sharetext=`#------------DropIT Share------------#`+
                        `<---------------- File Name:-   `+selectfilename+`---------------->`+
                        `<---------------- File access 🚩🚩 ID is `+randomid+`  ---------------->`+
                        `<---------------- Checkout the lattest file shareing site DropIT    `+forsharelinkurl+` ---------------->`+
                        `<----------------  Click on the below link to download ✔  >>>>>>>>>`;

                    shareurl=url;
                }
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
    } else if (ex == "c" || ex == "cpp" || ex == "java" || ex == "py" || ex == "html"||ex == "html" || ex == "css" || ex == "scss" || ex == "js" || ex == "cs" || ex == "rb" || ex == "php" || ex == "sql" || ex == "mysql" || ex == "pl") {
        return ("code")
    } else {
        return ("file")
    }
}

//BUTTON CLICK LINK COPY

function copylinkfun() {
    document.getElementById("myModal").innerHTML=`
    <div class="modal-dialog">
    <div class="alert alert-success alert-dismissible"> <a class="close" data-dismiss="modal" aria-label="close">&times;</a> <strong>Success!</strong> Link copied to clipboard</div>
</div>
    `;
    var copyText = document.getElementById("gogo");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
}

function sharelinkfun(){
    if (navigator.share) {
        navigator.share({
            title: 'DropIT Share',
                text:sharetext,
                url: shareurl
            }).then(() => {
                // console.log('Thanks for sharing!');
            })
            .catch(err => {
                alert(`Couldn't share because of some error`);
            });
    } else {
        $('#share_modal').modal('toggle');
        alert('Web share not supported');
    }

}