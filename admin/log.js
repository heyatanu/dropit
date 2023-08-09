let html = ``;
let g = ``;

firebase.database().ref('log/').once('value', function(snapshot) {
    let gg=`
    <tr class="header">
    <th >ID</th>
    <th >Action</th>
    <th >Local file name</th>
    <th >Status</th>
    <th >Pass</th>
    <th >Date</th>
    <th >Link</th>
  </tr>
    `
    snapshot.forEach(function(childSnapshot) {
  var sts=childSnapshot.val().status 

        // console.log(childSnapshot.val())
        if(sts==="SUCCESS"){
           g = `
          <tr style="background-color: #cbf6d0;">
          <td>` + childSnapshot.val().id + `</td>
          <td>` + childSnapshot.val().Name + `</td>
          <td>` + childSnapshot.val().LocalFileName + `</td>
          <td>` + childSnapshot.val().status + `</td>
          <td>` + childSnapshot.val().Password + `</td>
          <td>` + childSnapshot.val().UploadTime + `</td>
          <td><a href='` + childSnapshot.val().Link + `'>LINK</a></td>
  
        
        </tr>
      `;
  
        }
        else if(sts==="FAILED" || sts==="WRONG PASS"  ){
           g = `
          <tr style="background-color: #fa8787;">
          <td>` + childSnapshot.val().id + `</td>
          <td>` + childSnapshot.val().Name + `</td>
          <td>` + childSnapshot.val().LocalFileName + `</td>
          <td>` + childSnapshot.val().status + `</td>
          <td>` + childSnapshot.val().Password + `</td>
          <td>` + childSnapshot.val().UploadTime + `</td>
          <td>` + childSnapshot.val().status + `</td>

  
        
        </tr>
      `;
  
        }
  //       else if(sts==="DOWNLOAD" || sts==="PREVIEW" || sts==="FOUND"){
  //         g = `
  //        <tr style="background-color: #D6EEEE;">
  //        <td>` + childSnapshot.val().id + `</td>
  //        <td>` + childSnapshot.val().Name + `</td>
  //        <td>` + childSnapshot.val().LocalFileName + `</td>
  //        <td>` + childSnapshot.val().status + `</td>
  //        <td>` + childSnapshot.val().Password + `</td>
  //        <td>` + childSnapshot.val().UploadTime + `</td>
  //        <td><a href='` + childSnapshot.val().Link + `'>LINK</a></td>

 
       
  //      </tr>
  //    `;
 
  //      }
  //      else if(sts==="NOT FOUND"){
  //       g = `
  //      <tr style="background-color: #d8d0f5;">
  //      <td>` + childSnapshot.val().id + `</td>
  //      <td>` + childSnapshot.val().Name + `</td>
  //      <td>` + childSnapshot.val().LocalFileName + `</td>
  //      <td>` + childSnapshot.val().status + `</td>
  //      <td>` + childSnapshot.val().Password + `</td>
  //      <td>` + childSnapshot.val().UploadTime + `</td>
  //      <td>` + childSnapshot.val().status + `</td>


     
  //    </tr>
  //  `;

    // }
     else{
      g = `
      <tr style="background-color: #d8d0f5;">
      <td>` + childSnapshot.val().id + `</td>
      <td>` + childSnapshot.val().Name + `</td>
      <td>` + childSnapshot.val().LocalFileName + `</td>
      <td>` + childSnapshot.val().status + `</td>
      <td>` + childSnapshot.val().Password + `</td>
      <td>` + childSnapshot.val().UploadTime + `</td>
      <td><a href='` + childSnapshot.val().Link + `'>LINK</a></td>
    
    </tr>
  `;
     }
   
        html = html + g;
    });
// console.log(html)
html=gg+html
document.getElementById("myTable").innerHTML=html;


});

