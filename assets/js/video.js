var iframeEl = $('#iframe');


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
initialize();