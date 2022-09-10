var searchBar = $('#search-bar')
var inputEl = $('#search-input')
var apiKey = "AIzaSyD9C2bxQ7DkETOL3OhnUY9n9ckg6UlOI1I";
var apiEndpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${apiKey}&q=`;

function searchVideos(event) {
  event.preventDefault();
  window.location.assign('search.html');
  console.log(inputEl.val())
  var searchString = $(inputEl).val().trim();
  if (searchString) {
    fetch(apiEndpoint + searchString)
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
}

function renderVideos(data) {
    var items = data.items;
    for (var i = 0; i < items.length; i++) {
      var containerEl = $(
        '<div class="grid grid-cols-12 border-solid border-2">'
      );
      var imageEl = $(
        '<img class="col-span-12 w-full sm:col-span-6 md:col-span-3 justify-self-center p-1"/>'
      );
      $(imageEl).attr("src", items[i].snippet.thumbnails.medium.url);
      var detailsEl = $(
        '<div class="col-span-12 sm:col-span-6 md:col-span-9 p-1">'
      );
      var titleEl = $('<h2 class="font-bold">').text(items[i].snippet.title);
      var descriptionEl = $("<p>").text(items[i].snippet.description);
      $(detailsEl).append(titleEl);
      $(detailsEl).append(descriptionEl);
      $(containerEl).append(imageEl);
      $(containerEl).append(detailsEl);
      $(searchResultsEl).append(containerEl);
    }
  }
  
//   $(searchButtonEl).on("click", searchVideos);

searchBar.on('submit', searchVideos)