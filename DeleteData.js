
document.getElementById("deletedata-btn").onclick = function() {
document.getElementById("deletedata-btn").disabled = true;
let fileid = document.getElementById("deletedata-id").value;
let fileex = document.getElementById("deletedata-ex").value;
let deletedataststus = document.getElementById("deletedata-sts");
deletedataststus.innerHTML = "let's check"
fileid = fileid.trim()
fileex = fileex.trim()
fileex = fileex.toLowerCase();
let boolb=false;
let filenameui = fileid + "." + fileex;
    if (fileex == "" || fileid == "") {
        //NOT VALID
        // console.log("NOT VALID")
        deletedataststus.innerHTML = "both field must be field"
    } else {
        // console.log("WAIT")
        deletedataststus.innerHTML = "wait let us check"
        firebase.database().ref('Picture/' + fileid).on('value', function(snapshot) {
            if (snapshot.val() != null) {
                let fetchfilepass = snapshot.val().Password;
                if (fileex == fetchfilepass) {
                        firebase.database().ref('Picture/' + fileid).update({
                            DeleteOnDownload:true,
                            IsAlreadyDownloaded: true
                        });        
                        deletedataststus.innerHTML = "wait"
                        setTimeout(function(){ 
                            document.getElementById("overlayforurldownload").style.display="block";
                            document.getElementById("overlayforurldownload").innerHTML=`
                            <img id="overlayforurldownload-img" src="./Images/Loading/delete-img-com.gif" alt="">
                            <p id="overlayforurldownload-p">take a break let us save the changes</p>
                            `;
                            ; },1000);

                            setTimeout(function(){ 
                                document.getElementById("overlayforurldownload").style.display="block";
                                document.getElementById("overlayforurldownload").innerHTML=`
                                <img id="overlayforurldownload-img" src="./Images/Loading/delete-img-com.gif" alt="">
                                <p id="overlayforurldownload-p">delete successful window will automatically reload</p>
                                `;
                                ; },2000);
                            
                            setTimeout(function(){ 
                                location.reload();
                                ; }, 3000);
                } else {
                    //WRONG EXTENTION
                    // console.log("NOT EX")
                        deletedataststus.innerHTML = "please check"
                        document.getElementById("deletedata-btn").disabled = false;
                        setTimeout(function(){ 
                            deletedataststus.innerHTML = "try again"
                            ; }, 1500);
                    
                }
            } else {
                //NOT FOUND
                // console.log("NOT FOUND")
                    deletedataststus.innerHTML = "file not found"
                    document.getElementById("deletedata-btn").disabled = false;
                    setTimeout(function(){ 
                        deletedataststus.innerHTML = "try again"
                        ; }, 1500);
            }
        });

    }
}



console.disableYellowBox = true;