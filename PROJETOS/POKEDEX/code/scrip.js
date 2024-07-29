//  Criando uma variavel para chamar a imagem dopokemon do html
const imagemPokemon = document.querySelector('#pokemonImagem');

// Criando uma variavel para chamar o nome do pokemon do html
const nomePokemon = document.querySelector('#nome');

// Criando uma variavel para chamar o numero do pokemon do html
const numeroPokemon = document.querySelector('#numeroPokemon');

// Criando um botão para chamar a função para buscar o proximo pokemon
const btnSetaAvanco = document.querySelector('.setaAvanco');

// Criando um botão para chamar a função para buscar o pokemon anterior
const btnSetaRecuo = document.querySelector('.setaRecuo');

// Criando o campo de habilidades dos pokemons
const habilidades = document.querySelector('#habilidades');

//Chamndo o botão que dará gatilho para iniciar a busca na lista
const btnBusca = document.querySelector('#buscarPokemon');

// Criando uma variavel com o valor definindo como 1
let NumeroIdpokemon = 1;


// Criar uma funcão assicrona para chamar a API do pokemon
const fetchPokemon = async (pokemon) => {
    // Criar uma constante com o valor definido como a api
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    console.log(pokemon)
    // status 200 = 'tudo ok'
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

// Criar uma função ára direcionar as caracteristicas do pokemon
const direcionandoPokemon = async (PokemonId) => {
    // Criando um nome para quando não houver  o pokemon
    nomePokemon.innerHTML = 'Carregando...';
    numeroPokemon.innerHTML = '';
    habilidades.innerHTML = '';

    // Chamando a APIResponse
    const data = await fetchPokemon(PokemonId)

    if (data) {
        // Direcionando a imagem do pokemon para usar display block
        imagemPokemon.style.display = 'block';
        //Definindo o nome do pokemon baseado no json
        nomePokemon.innerHTML = data.name;
        //Definindo o id do pokemon
        numeroPokemon.innerHTML = data.id;
        // Defininfo que avariavel declarada na parte superior. agora tem o valor do id
        NumeroIdpokemon = data.id


        // Definindo a imagem do pokemon
        imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        // definindo as habilidades dos pokemons
        if (data.abilities.length > 0) {
            data.abilities.forEach((item) => {
                const habilidadeItem = document.createElement('p');
                habilidadeItem.textContent = `Habilidade: ${item.ability.name}`;
                habilidades.appendChild(habilidadeItem);
            });
        } else {
            habilidades.innerHTML = 'Nenhuma habilidade encontrada';
        }
    } else {
        nomePokemon.innerHTML = 'Não encontrado';
        numeroPokemon.innerHTML = '';
        imagemPokemon.style.display = 'none';
    }


}


//Criando a função de acrescentar um numero no id do pokemon e ir para o proximo
btnSetaAvanco.addEventListener('click', () => {
    NumeroIdpokemon += 1;
    direcionandoPokemon(NumeroIdpokemon)
});

//Criando a função de diminuir um numero no id do pokemon e ir para o anterior
btnSetaRecuo.addEventListener('click', () => {
    if (NumeroIdpokemon > 1) {
        NumeroIdpokemon -= 1;
    }
    direcionandoPokemon(NumeroIdpokemon)
});



direcionandoPokemon(NumeroIdpokemon)
