var query = document.location.search.replace("?query=", "");
var searchForm = $("#search-form");
var inputEl = $("#search-input");
var iframeEl = $("#iframe");
var asideEl = $("#tinyurlAside");
var videoUrlEl = $("#videoUrl");
var buttonEl = $("#tinyUrlBtn");

// tinyurl elements
var containerEl = $('<div class="relative w-full">');
var tinyUrlEl = $(
  '<p class="block p-4 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">'
);
var copyBtnEl = $(
  '<button id="copyBtn" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">'
);

//enable the tinyURL button to be clicked
$(buttonEl).on("click", handleClick);

//calling the tinyURL API to generate a link
function handleClick(event) {
  event.preventDefault();
  var token = "yj3Juk60zzXWwFP2p1nrSwNMzh780fUMLZZOSKijLoeseni9pqaEISjgL6KK";
  var link = $(videoUrlEl).val();

  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(
    `https://api.tinyurl.com/create?url=${link}&api_token=${token}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => displayTinyUrl(result))
    .catch((error) => console.log("error", error));
}

//rendering the TinyURL link
function displayTinyUrl(data) {
  var tinyUrl = data.data.tiny_url;
  $(tinyUrlEl).text(tinyUrl);
  $(copyBtnEl).text("Copy");
  $(copyBtnEl).on("click", copyText(tinyUrl));
  $(containerEl).append(tinyUrlEl);
  $(containerEl).append(copyBtnEl);
  $(asideEl).append(containerEl);
}

//this is to get the video id from the URL and inserting to the iframe src attribute
function initialize() {
  var query = document.location.search.replace("?videoId=", "");
  if (query) {
    renderVideos(query);
  }
}

function renderVideos(query) {
  $(iframeEl).attr(
    "src",
    `https://www.youtube.com/embed/${query}?autoplay=1&mute=1`
  );
  $(videoUrlEl).val(`https://www.youtube.com/watch?v=${query}`);
}

//search bar function
function searchVideos(event) {
  event.preventDefault();

  var searchString = $(inputEl).val().trim();
  inputEl.val("");
  if (searchString) {
    document.location.assign("./search.html?query=" + searchString);
  }
}

// function for copying text into clipboard
function copyText(url) {
  navigator.clipboard.writeText(url);
}

initialize();
searchForm.on("submit", searchVideos);
