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




// Traduzir habilidades para português
const traducaoHabilidades = {
    overgrow: "Super Crescimento",
    chlorophyll: "Clorofila",
    blaze: "Chama",
    solar_power: "Poder Solar",
    torrent: "Torvelinho",
    static: "Estatica"
    // adicione mais conforme precisar
};


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
        nomePokemon.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);;
        //Definindo o id do pokemon
        numeroPokemon.innerHTML = data.id;
        // Defininfo que avariavel declarada na parte superior. agora tem o valor do id
        NumeroIdpokemon = data.id


        // Definindo a imagem do pokemon
        imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        // definindo as habilidades dos pokemons
        if (data.abilities.length > 0) {
            //Criando uma variavel com o titulo fixo
            const titulo = document.createElement("h3")
            //Atribuidno a ela um nome
            titulo.textContent = 'Habilidades: '
            titulo.style.marginBottom = '-2vh'
            titulo.style.fontWeight = '800'
            //Agregando ela a variavel mae
            habilidades.appendChild(titulo)

            data.abilities.forEach((item) => {            
                const habilidadeItem = document.createElement('p');
                const nomeHabilidade = traducaoHabilidades[item.ability.name] || item.ability.name;
                habilidadeItem.textContent = '* ' + nomeHabilidade;
                habilidadeItem.style.marginBottom = '-2vh'
                habilidadeItem.style.fontWeight = '500'
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


//Modal de pesquisa
const modalPesquisa = document.querySelector('.telaPesquisa');
//Terminar
const btnAbrirModal = document.querySelector('#abrirModalPesquisar');

btnAbrirModal.addEventListener('click', () => {
    modalPesquisa.style.display = 'block';
});

modalPesquisa.querySelector('p').addEventListener('click', () => {
    modalPesquisa.style.display = 'none';
});

//Criando um vetor para armazenar a lista de pokemons ao buscar
let listaPokemons = [];

async function carregarPokemon(){
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const data = await resp.json()
    listaPokemons =data.results.map(p => p.name)
}

//Chamando a função
carregarPokemon()

//Puxando o input do html
const input = document.querySelector("#inputPesquisaPokemon")
//Puxando o ul do html para mostar os pokemons
const resultados = document.querySelector(".resultados")

//Adicionaod um evento ao input, input significa que quando o usuario clicar sobre o input e começar a digitar, ele ativa
input.addEventListener("input", () =>{
    //Setando o valor em letras minusculas.
    const valor = input.value.toLowerCase()
    //Limpando a lista caso tenha algo.
    resultados.innerHTML = ""

        //Se o valor for maior que 0
    if (valor.length > 0) {
        //Filtra a lista com os pokemons que possuem a letra digitada
        const filtrados = listaPokemons.filter(nome => nome.includes(valor));
        
        //Criando um laço para os pokemons que possuem a mesma letra digitada
        filtrados.forEach(nome => {
            //Criando linhas para adicionar no ul
            const li = document.createElement("li");
            //Definindo que a primeira letra vai ser maiscula
            li.textContent = nome.charAt(0).toUpperCase() + nome.slice(1);
            //Definindo um stilo
            li.style.padding= "10px"
            li.style.fontWeight = '800'
            li.style.boxShadow = '1px 1px  #000'
            li.style.cursor = 'pointer'
            //Criando um evento de clique
            li.onclick = () => {
                input.value = nome;
                resultados.innerHTML = "";
                modalPesquisa.style.display = "none"; // FECHA o modal
                 input.value = ''
                 direcionandoPokemon(nome.toLowerCase()); // chama a função que já exibe o pokémon na pokédex
            };
            resultados.appendChild(li);
           

        });
    }
})


direcionandoPokemon(NumeroIdpokemon)
