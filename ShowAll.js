let passcheck = document.getElementById("passcheck");
passcheck.onclick = function() {
    passcheckValue = document.getElementById("passfield").value;
    passcheckValue = passcheckValue.trim();
    if (passcheckValue.includes(" ")) {
        document.getElementById("checkpass_sts").innerHTML = "white space is not allowed"
        document.getElementById("passfield").value = "";
    } else if (passcheckValue != "") {
        document.getElementById("retriveall-loader").style.display="block";
        document.getElementById("checkpass_sts").innerHTML = "wait we are checking"
        
        db.collection('admin').get().then((snapshot) => {
            let passg = (snapshot.docs[0].data().password)
            if (passg == passcheckValue) {
                document.getElementById("lockicon").src = './Images/Loading/unlock.png';
                document.getElementById("lockicon").style.width = "2.8%";
                document.getElementById("checkpass_sts").innerHTML = "wait we are fetching data"
                document.getElementById("passfield").value = "";
                document.getElementById("show").click()
            } else {
                document.getElementById("checkpass_sts").innerHTML = "Wrong password try again";
        document.getElementById("retriveall-loader").style.display="none";
            }
        }).catch(err => {
            document.getElementById("checkpass_sts").innerHTML = "look like we are down try later";
        document.getElementById("retriveall-loader").style.display="none";

        });
    } else if ((document.getElementById("passfield").value).includes(" ") == true) {
        document.getElementById("checkpass_sts").innerHTML = " white space is not allowed"
        document.getElementById("passfield").value = "";
    } else {
        document.getElementById("checkpass_sts").innerHTML = "password field is mandatory"
    }



}

document.getElementById("show").onclick = function() {
    firebase.database().ref('Picture/').once('value', function(snapshot) {
        let html = ``;
        snapshot.forEach(function(childSnapshot) {
            let filename = (childSnapshot.val().Name)
            let filelink = (childSnapshot.val().Link)
            let extention = filename.split('.').pop();
            let id = filename.replace(/\.[^/.]+$/, "")
            let iconname = fileiconchoose(extention);

            let g = `
        <div class="well well-sm" id="retall_div">
        <img src="./Images/FileIcons/` + iconname + `.png" alt="upload gif" id="ret_file_type_img">
        <p id="ret-file-id">` + id + `</p>
        <p id="ret-file-name">` + childSnapshot.val().LocalFileName + `</p>
        
        <p id="ret-file-status">` + childSnapshot.val().UploadTime + `</p>
        <div id="ret-download-btn">
            <img src="./Images/Loading/uplodeComplate.gif" id="ret-download-btn-img" alt="upload gif">
            <a  class="btn btn-success " href="` + filelink + `" >Download File</a>
        </div>
        </div>
        `;

            html = html + g;
        });
        if (html == "") {
            document.getElementById("checkpass_sts").innerHTML = "no data found"
        document.getElementById("retriveall-loader").style.display="none";
        document.getElementById("passfield").style.display="none";
         document.getElementById("passcheck").innerHTML="RELOAD THE PAGE"

        } else {
        document.getElementById("passfield").style.display="none";
         document.getElementById("passcheck").innerHTML="RELOAD THE PAGE"
            document.getElementById("allret").innerHTML = html;
            document.getElementById("checkpass_sts").innerHTML = "all data retrive"
        document.getElementById("retriveall-loader").style.display="none";

            document.getElementById("passcheck").disabled = true;
            document.getElementById("passfield").value = "";
            var y = window.scrollY;
            // window.scrollBy(y, y + 1);
        }

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
    } else if (ex == "c" || ex == "cpp" || ex == "java" || ex == "py" ||ex == "html"|| ex == "html" || ex == "css" || ex == "scss" || ex == "js" || ex == "cs" || ex == "rb" || ex == "php" || ex == "sql" || ex == "mysql" || ex == "pl") {
        return ("code")
    } else {
        return ("file")
    }
}

