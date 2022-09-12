var searchResultsEl = $("#search-results");
var searchButtonEl = $("#search-button");
var inputEl = $("#search-input");
var searchForm = $('#search-form')

// Never push api key to GitHub
var apiKey = "AIzaSyD9C2bxQ7DkETOL3OhnUY9n9ckg6UlOI1I";
var apiEndpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${apiKey}&q=`;

function initialize() {
  var query = document.location.search.replace('?query=', '')
  if (query) {
    inputEl.val(query)
    searchVideos(query);
  }

}

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
}

function renderVideos(data) {
  $(searchResultsEl).html('');
  var items = data.items;
  var videoId = items[i].id.videoId
  for (var i = 0; i < items.length; i++) {
    var containerEl = $(
      `<a href="video.html?videoId=${videoId}><div class="grid grid-cols-12 border-solid border-2">`
    );
    var imageEl = $(
      '<img class="col-span-12 w-full sm:col-span-6 md:col-span-3 justify-self-center p-1"/>'
    );
    $(imageEl).attr("src", items[i].snippet.thumbnails.medium.url);
    var detailsEl = $(
      '<div class="col-span-12 sm:col-span-6 md:col-span-9 p-1">'
    );

    var titleEl = $(`<h2 class="font-bold"><a href=${videoId}>`).text(items[i].snippet.title);
    var descriptionEl = $("<p>").text(items[i].snippet.description);
    $(detailsEl).append(titleEl);
    $(detailsEl).append(descriptionEl);
    $(containerEl).append(imageEl);
    $(containerEl).append(detailsEl);
    $(searchResultsEl).append(containerEl);
  }
}

$(searchForm).on("submit", function (event) {
  event.preventDefault();
  var searchString = $(inputEl).val().trim();
  if (searchString) {
    document.location.assign('./search.html?query=' + searchString)
  }

});
initialize();


