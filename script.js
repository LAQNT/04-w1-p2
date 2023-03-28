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
        let container = document.getElementById(sectionId);
        let repeatedAlbum = {};
        data.data.forEach ((song) => {
            // console.log('songId',song.album.id);
            // console.log(repeatedAlbum[song.album.id]);
            if (!repeatedAlbum[song.album.id]){
                let card = `
                <div class="col mb-4">
                <div class="card bg-dark text-light d-flex flex-column ">
                <img src="${song.album.cover_medium}" class="card-img-top img-fluid" alt="${song.album.title}">
                <div class="card-body">
                <h5 class="card-title text-truncate">${song.album.title}</h5>
                <p class="card-text text-truncate">${song.artist.name}</p>
                </div>
                </div>
                </div>`;
                container.innerHTML += card;
                repeatedAlbum[song.album.id] = true;     
            }
        });
        // console.log(repeatedAlbum);
    } catch (error){
        console.error('Error found', error);
    }
 
    function totalAlbum () {
        let uListModal = document.createElement('ul');
        let modalDiv = document.querySelector('.modal-body').appendChild(uListModal);
        // console.log(modalDiv);
    
    
        let albumListRepeat = [];
        let totalAlbums = document.querySelectorAll('.card-title');
        // console.log(totalAlbums);
    
        for (let album of totalAlbums){
            let li = document.createElement('li')

            li.innerText = album.innerText;
            li.classList.add('text-white');

            if (! albumListRepeat[li.innerText]){

                modalDiv.appendChild(li);
                albumListRepeat[li.innerText] = true
                console.log(modalDiv)
            }


            
        }
    
    
    }
    console.log(totalAlbum());





}

document.addEventListener('DOMContentLoaded' , () => {
    fetchData('https://striveschool-api.herokuapp.com/api/deezer/search?q=the%20chemical%20brothers', 'theChemicalBrothersSection')
    fetchData('https://striveschool-api.herokuapp.com/api/deezer/search?q=arctic%20monkeys', 'arcticMonkeysSection')
    fetchData('https://striveschool-api.herokuapp.com/api/deezer/search?q=the%20beatles', 'theBeatlesSection')
});



// -----Album list-----
