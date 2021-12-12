document.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        if ($('#passfield').is(':focus')) {
            document.getElementById("passcheck").click();
          }
          else if ($('#namebox').is(':focus')) {
            document.getElementById("retrieve").click();
          }
          else if ($('#user-password').is(':focus')) {
            document.getElementById("upload").click();
          }
    }
});