// Rick and Morty' characters API reference
let api = 'https://rickandmortyapi.com/api/character/?page=1'

// Brings back the list of character from the API
async function fetchData(url) { 
    const response = await fetch(url)
    return response.json()
}

// Creates 20 empty cards to be filled by characters' data
const setCards = () => {
    const card = `
        <div class="collection__card">
            <img id="charImage" src="" alt="Character image">
            <p id="charName"></p>
        </div>
    `

    const collection = document.getElementById('collection')

    let aux = ''
    for(let i = 0;i<20;i++) {
        aux += card
    } 

    collection.innerHTML = aux
}

// Fills the 20 cards with the characters' image and name returned from the api
const fillCards = (data) => {
    const collection = document.getElementById('collection')
    const cards = collection.children
    let count = 0

    for(card of cards) {
        let img = card.children[0]
        let p = card.children[1]

        img.src = data.results[count].image
        p.innerHTML = data.results[count].name
        count++
    }
}

// Set the 'Next' and 'Back' buttons active, so the user can move between character's pages
const setInputs = () => {
    const btnNext = document.getElementsByClassName('btnNext')
    const btnBack = document.getElementsByClassName('btnBack')

    for(btn of btnNext) {
        btn.addEventListener('click', () => {
            movePage(1)
        })
    }

    for(btn of btnBack) {
        btn.addEventListener('click', () => {
            movePage(-1)
        })
    }
}

// Goes to the next or previous page and loads the correct characters from the api
const movePage = dir => {
    let arr = api.split('=')
    arr[1] = parseInt(arr[1]) + dir
    api = arr[0] + '=' + arr[1]
    
    fetchData(api)
        .then(data => {
            fillCards(data)
        })
}

window.onload = setCards()
window.onload = setInputs()

// After the window loaded, the first fetch is made
window.onload = fetchData(api)
    .then(data => {
        fillCards(data)
    })
