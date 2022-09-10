var searchResultsEl = $("#search-results");
var searchButtonEl = $("#search-button");
var inputEl = $("#search-input");
var searchList = [];
var searchListContainer = $('#search-list-container')


// Never push api key to GitHub
var apiKey = "AIzaSyD9C2bxQ7DkETOL3OhnUY9n9ckg6UlOI1I";
var apiEndpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${apiKey}&q=`;


function searchVideos(event) {
    event.preventDefault();
    console.log(searchString)
    console.log('success')

    var searchString = $(inputEl).val().trim();
    searchList.push(searchString);
    inputEl.val('');
    
    storeSearchList();
    renderSearchList();
    
    // if (searchString) {
    //   fetch(apiEndpoint + searchString)
    //     .then(
    //       function (response) {
    //         return response.json();
    //       },
    //       function (error) {
    //         console.log(error.message);
    //       }
    //     )
    //     .then(function (data) {
    //       renderVideos(data);
    //     });
    // }
  }

// This function is being called below and will run when the page loads.
function init() {
    // Get stored todos from localStorage
    var recentSearchList = JSON.parse(localStorage.getItem("recentSearch"));
    if (recentSearchList !== null) {
      searchList = recentSearchList;
    }
    renderSearchList();
  }
  
  function storeSearchList() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("recentSearch", JSON.stringify(searchList));
  }
  
function renderSearchList() {
    searchListContainer.html('');

    for (var i = 0; i < searchList.length && i < 5; i++) {
        searchList.reverse();

        var search = searchList[i];

        var recentSearchButton = $('<button class="recent-search bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">')

        recentSearchButton
            .text(search)
            .appendTo(searchListContainer);

    }
}
 
  

searchButtonEl.on("click", searchVideos);

init();