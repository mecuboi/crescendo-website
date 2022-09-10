var searchBar = $('#search-bar')
var inputEl = $('#search-input')

function searchFunction(event){
    event.preventDefault();
    console.log(inputEl.val().trim());
}


searchBar.on('submit', searchFunction)