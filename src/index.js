// Rick and Morty' characters API reference
const API = 'https://rickandmortyapi.com/api/character/'

// Brings back the list of character from the API
async function fetchData(url) { 
    const response = await fetch(url)
    return response.json()
}

// After the window loaded, the first fetch is made
window.onload = fetchData(API)
    .then(data => {
        console.log(data)
        document.getElementById('charImage').src = data.results[0].image
        document.getElementById('charName').innerHTML = data.results[0].name
    })
