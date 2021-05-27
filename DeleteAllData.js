let filename = "";
let fileextention = "";
let fileid = "";
let trueorfalse = false;

function DeleteAllDate() {
    firebase.database().ref('Picture/').once('value', function(snapshot) {
    	// console.log(snapshot.val()==null)
        snapshot.forEach(function(childSnapshot) {
        	if (childSnapshot.val()!=null){
        		            filename = (childSnapshot.val().Name)
            fileextention = filename.split('.').pop();
            fileid = filename.replace(/\.[^/.]+$/, "")
            trueorfalse = childSnapshot.val().DeleteOnDownload;
            let alreadydown = childSnapshot.val().IsAlreadyDownloaded;
            // console.log(filename,fileextention,fileid,trueorfalse,alreadydown)
            if (trueorfalse == true && alreadydown == true) {
                var desertRef = firebase.storage().ref('Images/' + filename);
                desertRef.delete().then(() => {
                    console.log("DLETE FILE ")
                }).catch((error) => {
                    console.log("SOME EROR OCC")
                });
                firebase.database().ref('Picture/' + fileid).remove();

            }
        	}
        });

    });


}

DeleteAllDate()
document.addEventListener('contextmenu', event => event.preventDefault());
document.ondragstart = function() { return false; };
document.getElementById("download-btn").addEventListener('contextmenu', event => event.preventDefault());
document.getElementById("download-btn").onclick = function() {
    firebase.database().ref('Picture/' + getname).update({
        IsAlreadyDownloaded: true
    });
}


setTimeout(function(){console.clear();}, 5000);


setInterval(function(){ console.clear();}, 8000);


