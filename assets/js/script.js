var searchResultsEl = $("#search-results");
var searchButtonEl = $("#search-button");
var inputEl = $("#search-input");

// Never push api key to GitHub
var apiKey = "AIzaSyD9C2bxQ7DkETOL3OhnUY9n9ckg6UlOI1I";
var apiEndpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${apiKey}&q=`;


function searchVideos(event) {
    event.preventDefault();
    storeSearch();
    console.log('success')
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

  function storeSearch() {
    localStorage.setItem('recentSearch',inputEl.val().trim() )
    console.log(inputEl.val().trim())
  }

  $(searchButtonEl).on("click", searchVideos);