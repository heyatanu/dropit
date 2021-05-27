let eyebtn=document.getElementById("eye-btn");
let eyespan=document.getElementById("eye-span");
let passfield=document.getElementById("user-password");
function showorhisepass(){
    if (passfield.type=="password"){
        eyespan.classList.remove("glyphicon-eye-close");
        eyespan.classList.add("glyphicon-eye-open");
        passfield.type="test";
        
    }
    else{
        eyespan.classList.remove("glyphicon-eye-open");
        eyespan.classList.add("glyphicon-eye-close");
        passfield.type="password";
    }
}

