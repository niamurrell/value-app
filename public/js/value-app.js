$( document ).ready(function() {
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
    $(".ui.tiny.modal")
      .modal("show");
  });

  // Update per-use cost display based on user input
  $("#newPurchasePrice").on("keyup", function() {
    var input = $("#newPurchasePrice").val();
    var divisor = $("#useCount").val();
    $("#resultCostPerUse").val(parseFloat(updateCostPerUse(input, divisor)).toFixed(2));
  })
});

// Calculate per-use Cost
function updateCostPerUse(purchasePrice, useCount) {
  var costPerUse = purchasePrice / useCount;
  return costPerUse;
}
