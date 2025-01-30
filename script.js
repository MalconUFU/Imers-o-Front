const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm){
    const url = `http://localhost:2500/artists`; //Sem filtro na requisição
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const filteredArtists = result.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            displayResults(filteredArtists);
        })
        .catch(error => console.error("Erro na requisição:", error));
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function(){
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return
    }
    
    requestApi(searchTerm);
})