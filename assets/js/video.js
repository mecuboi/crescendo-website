var iframeEl = $('#iframe');
var query = document.location.search.replace('?query=', '')
var searchForm = $('#search-form')
var inputEl = $("#search-input");


function initialize() {
    var query = document.location.search.replace("?videoId=", "")
    //console.log(document.location.search);
    if (query) {
        renderVideos(query);

    }
}

function renderVideos(query) {
    //console.log(query);
    $(iframeEl).attr('src', `https://www.youtube.com/embed/${query}?autoplay=1&mute=1`)

}

function searchVideos(event) {
    event.preventDefault();
    
    var searchString = $(inputEl).val().trim();
    inputEl.val("");
    if (searchString) {
        document.location.assign('./search.html?query=' + searchString)
    }
}



initialize();
searchForm.on('click', searchVideos)
