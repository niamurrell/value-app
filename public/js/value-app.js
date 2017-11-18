// Flash messages
$(".message .close").on("click", function() {
  $(this)
    .closest(".message")
    .transition("fade");
});


// Date picker
$(".date-picker").datepicker();


// Edit Profile Modal
$("#updateProfileButton").on("click", function() {
  $(".ui.tiny.modal")
    .modal("show");
});

// Delete Thing Modal
$("#deleteThingButton").on("click", function() {
  console.log("clicked");
  $(".ui.tiny.modal")
    .modal("show");
});
