var iframeEl = $('#iframe');


function initialize() {
    var query = document.location.search.replace("?videoId=")
    if (query) {
        renderVideos(query);

    }
}

function renderVideos(query) {
    $(iframeEl).attr('src', `https://www.youtube.com/embed/${query}`)

}
initialize();