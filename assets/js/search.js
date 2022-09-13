var searchResultsEl = $("#search-results");
var searchButtonEl = $("#search-button");
var inputEl = $("#search-input");
var searchForm = $("#search-form");


var apiKey = "AIzaSyDZFCwcOmQb4jQ2MvZZ7vfa5AD9K9y3yUs";
var apiEndpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${apiKey}&q=`;


//this init function is to run an API youtube search based on the query in the URL
function initialize() {
  var query = document.location.search.replace("?query=", "");
  if (query) {
    inputEl.val(query);
    searchVideos(query);
  }
}

//the fetch function for the youtube API to search videos
function searchVideos(query) {
  fetch(apiEndpoint + query)
    .then(
      function (response) {
        return response.json();
      },
      function (error) {
        console.log(error.message);
      }
    )
    .then(function (data) {
      renderVideos(data);
    });
  inputEl.val("");
}

//to render the videos
function renderVideos(data) {
  $(searchResultsEl).html("");
  var items = data.items;

  //to loop the command on the search results length
  for (var i = 0; i < items.length; i++) {
    var videoId = items[i].id.videoId;
    var masterContainer = $(`<div class='grid grid-cols-12 border-solid border-2'>`)
    var containerEl = $(
      `<a href="video.html?videoId=${videoId}" class=" grid grid-cols-12 col-span-12">`
    );
    var imageEl = $(
      `<img class="col-span-12 w-full sm:col-span-6 md:col-span-3 justify-self-center p-1"/>`
    );
    $(imageEl).attr("src", items[i].snippet.thumbnails.medium.url);
    var detailsEl = $(
      '<div class="col-span-12 sm:col-span-5 md:col-span-7 p-1">'
    );
    var tinyUrlButton = $(
      `<button 
        class="tiny-url-button col-span-12 md:col-span-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 
        to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg 
        shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2"
        type='button' data-modal-toggle='defaultModal'>`
    );

    var titleEl = $(`<h2 class="font-bold"><a href=${videoId}>`).text(
      items[i].snippet.title
    );
    var descriptionEl = $("<p>").text(items[i].snippet.description);

    //DOM manipulation to insert the videos into our HTML page
    tinyUrlButton.text('Generate Tiny URL');
    $(detailsEl).append(titleEl);
    $(detailsEl).append(descriptionEl);
    $(containerEl).append(imageEl);
    $(containerEl).append(detailsEl);
    $(masterContainer).append(containerEl);
    $(masterContainer).append(tinyUrlButton);
    searchResultsEl.append(masterContainer);
    
    
  }
}

//to enable the search bar
$(searchForm).on("submit", function (event) {
  event.preventDefault();
  var searchString = $(inputEl).val().trim();
  if (searchString) {
    document.location.assign("./search.html?query=" + searchString);
  }
});


// tinyUrlButton.on('click', function (event) {
//   event.preventDefault();
//   var token = "yj3Juk60zzXWwFP2p1nrSwNMzh780fUMLZZOSKijLoeseni9pqaEISjgL6KK";
//   var link = $(videoUrlEl).val();

//   var requestOptions = {
//     method: "POST",
//     redirect: "follow",
//   };

//   fetch(
//     `https://api.tinyurl.com/create?url=${link}&api_token=${token}`,
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((result) => displayTinyUrl(result))
//     .catch((error) => console.log("error", error));
// })

// function displayTinyUrl(data) {
//   var tinyUrl = data.data.tiny_url;
//   $(tinyUrlEl).text(tinyUrl);
//   $(asideEl).append(tinyUrlEl);
// }

initialize();
