// ---1. get data and parse--------2. card into HTML----3. asign data into card

// function ajax() {
    // const artistReq = new XMLHttpRequest();
    
    // artistReq.open ('GET', `https://striveschool-api.herokuapp.com/api/deezer/search?q=arctic%20monkeys`, true);

    // artistReq.onload = function() {

    //     if (artistReq.status == 200) {
    //         console.log('success');

    //         let artistData = JSON.parse(this.response);
    //         console.log(artistData);


    //         for (i = 0; i < artistData.length; i++){
    //             console.log(artistData.data[i].album.title);
    //         }
    //         console.log(artistData.data[0].album.title);       
    //         } 
    // }
    
    

    // artistReq.send();


// }


// -----white subtitle-----
let wtext= document.querySelectorAll('.d-block > h2');

for (let h2 of wtext) {
    h2.classList.add('text-white-50');
    h2.classList.add('h5');
}



// -----API Request-----
async function fetchData (apiUrl , sectionId) {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data)
        let container = document.getElementById(sectionId);
        let repeatedAlbum = {};
        data.data.forEach ((song) => {

            if (!repeatedAlbum[song.album.id]){
                let card = `
                <div class="col mb-4">
                <div class="card bg-dark text-light d-flex flex-column ">
                <img src="${song.album.cover_medium}" class="card-img-top img-fluid" alt="${song.album.title}">
                <div class="card-body">
                <h5 class="card-title text-truncate">${song.album.title}</h5>
                <p class="card-text text-truncate">${song.artist.name}</p>
                <p class="song-title card-text text-truncate">${song.title}</p>
                </div>
                </div>
                </div>`;
                container.innerHTML += card;
                repeatedAlbum[song.album.id] = true;     
            }
        });

    } catch (error){
        console.error('Error found', error);
    }
 
    function totalSongs () {
        let uListModal = document.createElement('ul');
        let modalDiv = document.querySelector('.modal-body').appendChild(uListModal);
             
        let totalSongs = document.querySelectorAll('.song-title');
        
        for (let song of totalSongs){
            let li = document.createElement('li')

            li.innerText = song.innerText;
            li.classList.add('text-white');
            li.classList.add('d-flex');

            modalDiv.appendChild(li);      
        }
    }
    console.log(totalSongs());

}

document.addEventListener('DOMContentLoaded' , () => {
    fetchData('https://striveschool-api.herokuapp.com/api/deezer/search?q=the%20chemical%20brothers', 'theChemicalBrothersSection')
    fetchData('https://striveschool-api.herokuapp.com/api/deezer/search?q=arctic%20monkeys', 'arcticMonkeysSection')
    fetchData('https://striveschool-api.herokuapp.com/api/deezer/search?q=the%20beatles', 'theBeatlesSection')
});



// -----uniqueAlbums-----
function totalUalbums() {
    let span = document.createElement('span');
    let div = document.querySelector('.btn-totalAlbums');
    let divSpan = div.appendChild(span);

    let totalAlbums = document.querySelectorAll('.card-title');

    let uniqueAlbums = [...new Set(totalAlbums)];
    span.innerText = uniqueAlbums.length;
    console.log('Total unique albums: '+ uniqueAlbums.length);

    span.classList.add('text-white');
    span.classList.add('text-center');
    span.classList.add('mx-3');   
}