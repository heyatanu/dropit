let qrtextid = document.getElementById("qr-text");
let filenameforqr="";
function linkqrgen(n) {
    // alert("n")
    document.getElementById("myModal").innerHTML = `
            <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <canvas id="qr-code"style="margin-left: auto;margin-right: auto;display:block;"></canvas>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="linkqrgen(1)"  >Download QR Code</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
            `;
            
    var qr;
    (function() {
        qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 200,
            value: qrtextid.value
        });
    })();
    var canvas = document.getElementById("qr-code");
    if (n == 1) {

      var image = canvas.toDataURL();  
      var tmpLink = document.createElement( 'a' );  
      tmpLink.download = 'DropIT-ShareQR-'+filenameforqr+'.png';
      tmpLink.href = image;  
      document.body.appendChild( tmpLink );  
      tmpLink.click();  
      document.body.removeChild( tmpLink ); 
    }




}