
document.getElementById("deletedata-btn").onclick = function() {
    document.getElementById("deletedata-btn").disabled = true;
let fileid = document.getElementById("deletedata-id").value;
let fileex = document.getElementById("deletedata-ex").value;
let deletedataststus = document.getElementById("deletedata-sts");
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
                let fetchfilename = snapshot.val().Name;
                let fetchextention = fetchfilename.split('.').pop();
                let fetchid = fetchfilename.replace(/\.[^/.]+$/, "")
                if (fileex == fetchextention) {
                    var desertRef = firebase.storage().ref('Images/' + snapshot.val().LocalFileName);
                    desertRef.delete().then(() => {
                        deletedataststus.innerHTML = "deleted successfull";
                        // console.log("DLETE FILE ")
                        boolb=funcall(true,fileid)
                        fileid = "";
                        fileex = "";
                        document.getElementById("deletedata-btn").disabled = false;
                    }).catch((error) => {
                        // console.log("SOME EROR OCC")
                        if (boolb==false){
                            deletedataststus.innerHTML = "deleted successfull";
                            document.getElementById("deletedata-btn").disabled = false;
                        }
                    });

                } else {
                    //WRONG EXTENTION
                    // console.log("NOT EX")
                    if (boolb==false){
                        deletedataststus.innerHTML = "check the file extention"
                        document.getElementById("deletedata-btn").disabled = false;
                    }
                }
            } else {
                //NOT FOUND
                // console.log("NOT FOUND")
                if (boolb==false){
                    deletedataststus.innerHTML = "file not found"
                    document.getElementById("deletedata-btn").disabled = false;
                }
            }
        });

    }
}

function funcall(b,c){
    if (b){
        firebase.database().ref('Picture/' + c).remove();
        // console.log(")))")
    retuen (true);
    }
} 

console.disableYellowBox = true;