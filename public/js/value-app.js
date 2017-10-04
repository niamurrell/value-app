// Flash messages
$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;

// Date picker
$(".date-picker").datepicker();
