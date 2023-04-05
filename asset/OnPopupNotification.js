

function popupNotificationfx(info) {
    document.getElementById("myModalPopupBtn").click()
    info=info.toUpperCase()

    document.getElementById("myModal").innerHTML = `
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
      <h5 class="modal-title">` + info  + ` </h5>
      </div>
      <div class="modal-footer">
        
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `;


  }