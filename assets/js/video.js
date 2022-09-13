var iframeEl = $("#iframe");
var asideEl = $("#tinyurlAside")
var videoUrlEl = $("#videoUrl");
var buttonEl = $("#tinyUrlBtn");
var tinyUrlEl = $(
  '<p class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">'
);

$(buttonEl).on("click", handleClick);

function handleClick(event) {
  event.preventDefault();
  console.log("handleClick");
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

function displayTinyUrl(data){
    var tinyUrl = data.data.tiny_url
    $(tinyUrlEl).text(tinyUrl);
$(asideEl).append(tinyUrlEl);

}

function initialize() {
  var query = document.location.search.replace("?videoId=", "");
  //console.log(document.location.search);
  if (query) {
    renderVideos(query);
  }
}

function renderVideos(query) {
  //console.log(query);
  $(iframeEl).attr(
    "src",
    `https://www.youtube.com/embed/${query}?autoplay=1&mute=1`
  );
  $(videoUrlEl).val(`https://www.youtube.com/watch?v=${query}`);
}
initialize();
