// #WE WILL DELETE OLDER FILE 
// DAYS WE WILL FATCH FROM FIREBASE ADMIN (howManyDaysOld)
// AND ALSO TRUE OF FALSE (deleteOldFile)

try {
    db.collection('admin').get().then((snapshot) => {
        let sureToDelete= (snapshot.docs[0].data().deleteOldFile.sureToDelete)
        let daysOld= (snapshot.docs[0].data().deleteOldFile.daysOld)
        
    
        if(sureToDelete){
            deleteAllFile(daysOld)
        }
    
    }).catch(err => {
        //console.log("error")
    });
    
} catch (error) {
    //
}



function deleteAllFile(daysOld){
    try {
        firebase.database().ref('Picture/').once('value', function(snapshot) {
            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val() != null) {
                        UploadTime=((childSnapshot.val().UploadTime).split('T')[0].trim()).split("/")
                        newUploadTime=UploadTime[1]+"/"+UploadTime[0]+"/"+UploadTime[2]
                        daysOlder=Math.abs(getCurrdate(newUploadTime))
                        console.log(daysOlder>daysOld,childSnapshot.val())
                        if(daysOlder>=daysOld ){
                            
                            filename = childSnapshot.val().Name;
                            fileextention = filename.split('.');
                            fileid = fileextention[0];
                        //  console.log(firebase.database().ref('Picture/' + fileid));

                            let localname = childSnapshot.val().LocalFileName;
                            var desertRef = firebase.storage().ref('Images/' + localname);
                            desertRef.delete().then(() => {
                                console.log("DLETE FILE ")
                            }).catch((error) => {
                                // console.log("SOME EROR OCC")
                            });
                            firebase.database().ref('Picture/' + fileid).remove();


                        }

                    }
                });
            }
        });
        
    } catch (error) {
        //
    }
}



function getCurrdate(dr){
    // let timestamp = Date.now();
    // let dateobj = new Date(); 
    // uplodedate = dateobj.getDate() + "/" + ((dateobj.getMonth())+1) + "/" + dateobj.getFullYear() + " T " + dateobj.getHours() + ":" + dateobj.getMinutes();
    // console.log(uplodedate)

    let date_1 = new Date(dr);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays
}





