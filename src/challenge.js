const fetchData = require('../utils/fetchData')
const api = 'https://rickandmortyapi.com/api/character/'

const doSomethingAsync = () => {
    /*return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => {resolve('Do Something Async') }, 2000)
            : reject(new Error('Test error'))
    })*/

    fetchData(api)
        .then(data => {
            console.log(data.info.count)
            return fetchData(`${api}${data.results[0].id}`)
        })
        .then(data => {
            console.log(data.name)
            return fetchData(data.origin.url)
        })
        .then(data => {
            console.log(data.dimension)
        })
        .catch(err => console.error(err))
}

const doSomething = async (api) => {
    //const something = await doSomethingAsync()
    try {
        const data = await fetchData(api)
        const character = await fetchData(`${api}${data.results[0].id}`)
        const dim = await fetchData(character.origin.url)

        console.log(data.info.count)
        console.log(character.name)
        console.log(dim.dimension)
    } catch(error) {
        console.error(error)
    }
}

console.log('Before')
doSomething(api)
console.log('After')