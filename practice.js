var buttonEl = $("#modalBtn");
var closeBtnEl = $("#closeBtn");
var modalEl = $("#modal");
var inputEl = $("#search-input");
var copyBtnEl = $("#copy-button");

$(copyBtnEl).on("click", copyText);

$(buttonEl).on("click", toggleModal);

$(closeBtnEl).on("click", toggleModal);

function toggleModal() {
  var modalClasses = $(modalEl).attr("class").split(" ");
  if (modalClasses.includes("hidden")) {
    $(modalEl).removeClass("hidden");
  } else {
    $(modalEl).addClass("hidden");
  }
}

function copyText() {
  navigator.clipboard.writeText($(inputEl).val());
}
