
const pokemons = document.getElementById('pokemon')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecord = 151
const limit = 10
let offset = 0


function convertPokemonToLi(pokemon){
    return `
        <li class="listPokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(" ")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
        </li>`
}

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonList) => {
        pokemons.innerHTML += pokemonList.map(convertPokemonToLi).join("")
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItems(offset, limit)
    }
    
})
