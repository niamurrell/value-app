// Flash messages
$(".message .close")
  .on("click", function() {
    $(this)
      .closest(".message")
      .transition("fade");
  });

// Date picker
$(".date-picker").datepicker();

$(document).ready(function(){
  // Profile update modal
  $("#updateProfileButton").on("click", function() {
    $(".ui.tiny.modal")
    .modal({
      closable  : false,
      onDeny    : function(){
        window.alert("Wait not yet!");
        return false;
      },
      onApprove : function() {
        window.alert("Approved!");
      }
    })
    .modal("show");
  });
});
