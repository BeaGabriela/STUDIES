async function fetchPokemon() {
    const randomNumber = Math.floor(Math.random() * 800)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    const data = await response.json()

    return data
}


const getPokemons = async () => {
    const pokemon = []

    while (pokemon.length < 9) {
        const data = await fetchPokemon()

        if (data.sprites.other.dream_world.front_default !== null) {
            pokemon.push({
                nome: data.name,
                img: data.sprites.other.dream_world.front_default
            })
        }
    }
    const pokemonDuplicado = [...pokemon, ...pokemon] //Serve para duplicar mantendo ovalor do arrays
    pokemonDuplicado.sort(() => Math.random() - 0.5)
    return pokemonDuplicado
}


async function buildCards() {
    const pokemons = await getPokemons()
    const area = document.getElementById('render-area')

    for (let i = 0; i < pokemons.length; i++) {
        const div = document.createElement('div')
        div.className = 'flipped'

        const img = document.createElement('img')

        area.appendChild(div)

        div.addEventListener("click", () => {
            div.classList.remove('flipped')
            div.classList.add('card', 'no-click')
            img.src = pokemons[i].img
            div.appendChild(img)
            // div.innerHTML = `<img src="${pokemons[i].img}">`
            cartaVirada.push({
                pokemon: pokemons[i].nome,
                elementohtml: div,
                imagem: img
            })
            verifyCard(area)

        })

    }
}

buildCards()


var parEncontrados = []

function verifyCard(area) {
    if (cartaVirada.length === 2) {
        area.classList.add("no-click")
        if (cartaVirada[0].pokemon !== cartaVirada[1].pokemon) {

            setTimeout(() => {
                cartaVirada[0].elementohtml.classList.remove('card')
                cartaVirada[0].elementohtml.classList.add('flipped')
                cartaVirada[0].elementohtml.removeChild(cartaVirada[0].imagem)
                cartaVirada[0].elementohtml.classList.remove('no-click')


                cartaVirada[1].elementohtml.classList.remove('card')
                cartaVirada[1].elementohtml.classList.add('flipped')
                cartaVirada[1].elementohtml.removeChild(cartaVirada[1].imagem)
                cartaVirada[1].elementohtml.classList.remove('no-click')

                area.classList.remove('no-click')
                cartaVirada.length = 0;
            }, 1000)

        } else {
            cartaVirada.length = 0; 
            parEncontrados.push(1)
            console.log('foram econtrados ' + parEncontrados)
            area.classList.remove("no-click")
        }
    }


}


const cartaVirada = []