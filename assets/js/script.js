var searchResultsEl = $("#search-results");
var searchButtonEl = $("#search-button");
var inputEl = $("#search-input");
var searchList = [];
var searchListContainer = $("#search-list-container");

function searchVideos(event) {
  event.preventDefault();

  var searchString = $(inputEl).val().trim();
  //to add the search list to the front of the array
  searchList.unshift(searchString);
  inputEl.val("");

  storeSearchList();

  if (searchString) {
    document.location.assign("./search.html?query=" + searchString);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored recent search list from localStorage
  var recentSearchList = JSON.parse(localStorage.getItem("recentSearch"));
  if (recentSearchList !== null) {
    searchList = recentSearchList;
  }
  renderSearchList();
}

function storeSearchList() {
  // Stringify and set key in localStorage to searchList array
  localStorage.setItem("recentSearch", JSON.stringify(searchList));
}

function renderSearchList() {
  searchListContainer.html("");
  //using DOM manipulation to dynamically create the search list
  var recentTitle = $('<h2 class="text-center font-bold">');
  recentTitle.text("Recent Searches").appendTo(searchListContainer);

  //Code will run as long as the list or when it reaches 5 items whichever is less
  for (var i = 0; i < searchList.length && i < 5; i++) {
    var search = searchList[i];
    var recentSearchButton = $(
      '<button class="recent-search bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">'
    );
    //adding an event listener to the button so that they bring to the search page
    $(recentSearchButton).on("click", function (event) {
      document.location.assign("./search.html?query=" + $(event.target).text());
    });

    recentSearchButton.text(search).appendTo(searchListContainer);
  }
}

searchButtonEl.on("click", searchVideos);

init();

// carousel for the slideshow
var cont = 0;
function loopSlider() {
  var xx = setInterval(function () {
    switch (cont) {
      case 0: {
        $("#slider-1").fadeOut(400);
        $("#slider-2").delay(400).fadeIn(400);
        $("#sButton1").removeClass("bg-purple-800");
        $("#sButton2").addClass("bg-purple-800");
        cont = 1;

        break;
      }
      case 1: {
        $("#slider-2").fadeOut(400);
        $("#slider-1").delay(400).fadeIn(400);
        $("#sButton2").removeClass("bg-purple-800");
        $("#sButton1").addClass("bg-purple-800");

        cont = 0;

        break;
      }
    }
  }, 8000);
}

function reinitLoop(time) {
  clearInterval(xx);
  setTimeout(loopSlider(), time);
}

function sliderButton1() {
  $("#slider-2").fadeOut(400);
  $("#slider-1").delay(400).fadeIn(400);
  $("#sButton2").removeClass("bg-purple-800");
  $("#sButton1").addClass("bg-purple-800");
  reinitLoop(4000);
  cont = 0;
}

function sliderButton2() {
  $("#slider-1").fadeOut(400);
  $("#slider-2").delay(400).fadeIn(400);
  $("#sButton1").removeClass("bg-purple-800");
  $("#sButton2").addClass("bg-purple-800");
  reinitLoop(4000);
  cont = 1;
}

$(window).ready(function () {
  $("#slider-2").hide();
  $("#sButton1").addClass("bg-purple-800");

  loopSlider();
});
