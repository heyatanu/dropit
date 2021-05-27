let mainform=document.getElementById("mainform");
let loader=document.getElementById("loader");
let password=document.getElementById("password");
let exten=document.getElementById("exten");
let passwordvalue=password.value;
let extenvalue=exten.value;
passwordvalue=passwordvalue.trim();
extenvalue=extenvalue.trim();
let question=document.getElementById("question");
let outsubmit=document.getElementById("outsubmit");
let forgotstatus=document.getElementById("forgot-status");
let b=false;
let co=0;
let ugetname="";
function checkdatabase(){
    if (extenvalue!=="" || passwordvalue==""){
        outsubmit.style.display="none";
        mainform.style.display="none";
        loader.style.display="block";
        // setTimeout(function(){
        //     loader.style.display="none";
        //     forgotstatus.style.display="block";
        // },3000)


        firebase.database().ref('Picture/').once('value', function(snapshot) {
            const propOwn = Object.getOwnPropertyNames(snapshot);
            let snaplength=(propOwn.length);
            snapshot.forEach(function(childSnapshot) {
                let fetchpass=childSnapshot.val().Password;
                let upass=document.getElementById("password").value;
                if (fetchpass==upass){
                    let fetchfilname=childSnapshot.val().Name;
                   let fetchfilnameex= fetchfilname.split('.').pop();
                    let uexten=document.getElementById("exten").value;
                    if (uexten==fetchfilnameex){
                         ugetname = fetchfilname.replace(/\.[^/.]+$/, "")
                        if (b==false){
                            b=true
                        }
                    }
                    else{
                        // console.log("EX")
                    }
                    
                }
                else{
                    // console.log("NOT FOUND")
                }

                co=co+1;
                if (co==snaplength){
                    loader.style.display="none";
                    forgotstatus.style.display="block";
                    if (b){
                        console.log("HH")
                        console.log(ugetname);
                        forgotstatus.innerHTML=ugetname;
                    }
                    else{
                        forgotstatus.innerHTML="naa..!! please check";
                    }
                }
            });
        
        });
    }
    else{
        question.innerHTML="fill the form"
    }
    return false;
}