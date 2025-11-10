//  Criando uma variavel para chamar a imagem do pokemon do html
const imagemPokemon = document.querySelector('#pokemonImagem');

// Criando uma variavel para chamar o nome do pokemon do html
const nomePokemon = document.querySelector('#nome');

// Criando uma variavel para chamar o numero do pokemon do html
const numeroPokemon = document.querySelector('#numeroPokemon');

// Criando o campo de habilidades dos pokemons
const habilidades = document.querySelector('#habilidades');

// Traduzir habilidades para português
const traducaoHabilidades = {
    overgrow: "Super Crescimento",
    chlorophyll: "Clorofila",
    blaze: "Chama",
    solar_power: "Poder Solar",
    torrent: "Torvelinho",
    static: "Estatica"
};


// Criando uma variavel com o valor definindo como 1
let NumeroIdpokemon = 1;

// Criando um botão para chamar a função para buscar o proximo pokemon
const btnSetaAvanco = document.querySelector('.setaAvanco');

// Criando um botão para chamar a função para buscar o pokemon anterior
const btnSetaRecuo = document.querySelector('.setaRecuo');

//Colcoando um id para qunado mudar o id do pokemon principal, ele tambem mudar o do modal do card
let mudarIdModalCard = 0;


// Criar uma funcão assicrona para chamar a API do pokemon
const fetchPokemon = async (pokemon) => {
    // Criar uma constante com o valor definido como a api
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
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
        nomePokemon.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        //Definindo o id do pokemon
        numeroPokemon.innerHTML = "Nº:" +  data.id;
        // Definindo que avariavel declarada na parte superior. agora tem o valor do id
        NumeroIdpokemon = data.id


        // Definindo a imagem do pokemon
        imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        // definindo as habilidades dos pokemons
        if (data.abilities.length > 0) {
            //Criando uma variavel com o titulo fixo
            const titulo = document.createElement("h3")
            //Atribuidno a ela um nome
            titulo.textContent = 'Habilidades: '
            //Setando a ela estilos
            titulo.style.marginBottom = '-2vh'
            titulo.style.fontWeight = '800'
            //Agregando ela a variavel mae
            habilidades.appendChild(titulo)

            //Percorrer meu json, que é a varieavel data
            data.abilities.forEach((item) => {
                //Cria uma tag p para hospedar a habilidade         
                const habilidadeItem = document.createElement('p');
                //Definindo uma constante para agregar a tradução da habilidade.
                const nomeHabilidade = traducaoHabilidades[item.ability.name] || item.ability.name;
                //Setar alguns estiloso para ela
                habilidadeItem.textContent = '* ' + nomeHabilidade;
                habilidadeItem.style.marginBottom = '-6vh'
                habilidadeItem.style.fontWeight = '500'
                //Atribuindo essa variavel criada a variavel mãe do HTML
                habilidades.appendChild(habilidadeItem);
            });

            //Se nenhuma habilidade for encontrada:
        } else {
            habilidades.innerHTML = 'Nenhuma habilidade encontrada';
        }

        //Se nenhum pokemon for encontrado.
    } else {
        nomePokemon.innerHTML = 'Não encontrado';
        //Seto o numero e a imagem do pokemon
        numeroPokemon.innerHTML = '';
        imagemPokemon.style.display = 'none';
    }
}

//Chamando ao função de direcionar o pokemon e atribuindo ela ao primeiro numero em ordem crescente.
direcionandoPokemon(NumeroIdpokemon)



//CRIANDO OS BOTOÕES DE AVANÇAR E RECUAR

//Criando a função de acrescentar um numero no id do pokemon e ir para o proximo
btnSetaAvanco.addEventListener('click', () => {
    NumeroIdpokemon += 1;
    mudarIdModalCard += 1
    direcionandoPokemon(NumeroIdpokemon)
});

//Criando a função de diminuir um numero no id do pokemon e ir para o anterior
btnSetaRecuo.addEventListener('click', () => {
    if (NumeroIdpokemon > 1 || mudarIdModalCard > 1) {
        NumeroIdpokemon -= 1;
        mudarIdModalCard -= 1
    }
    direcionandoPokemon(NumeroIdpokemon)
});



//CRIANDO O MODAL DE PESQUISA


//Definindo o botãõ de abrir modal de pesquisa
const btnAbrirModal = document.querySelector('#abrirModalPesquisar');

//Atribuindo  um listner que ao clicar  o modal desaparece, asism e tela é mostrada.
btnAbrirModal.addEventListener('click', () => {
    modalPesquisa.style.display = 'block';
});

//Chamando a tela que vai abrir quando o modal desaparecer, ao clicar no btn de pesquisar. 
const modalPesquisa = document.querySelector('.telaPesquisa');

//Atribuindo que ao clicar no x co modal, o modal volta e a tela desaparece, voltando o conteudo de antes.
modalPesquisa.querySelector('p').addEventListener('click', () => {
    modalPesquisa.style.display = 'none';
});



//Criando um vetor para armazenar a lista de pokemons ao buscar
let listaPokemons = [];

//Criando uma função para carregar pokemons, ao buscar pelo nome
async function carregarPokemon() {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const data = await resp.json()
    listaPokemons = data.results.map(p => p.name)
}

//Chamando a função
carregarPokemon()

//Puxando o input do html
const input = document.querySelector("#inputPesquisaPokemon")
//Puxando o ul do html para mostar os pokemons
const resultados = document.querySelector(".resultados")

//Adicionaod um evento ao input, input significa que quando o usuario clicar sobre o input e começar a digitar, ele ativa
input.addEventListener("input", () => {
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
            li.style.padding = "10px"
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



//CRIANDO O CARD DE MONSTRAR OS POKEMONS


//Pegando o varivael do HTML
var ModalCobrirTelaCard = document.querySelector(".ModalCobrirTelaCard")

//Quando o botão de card for acionado no HTML, ele retirará o modal e abrirá a tela de card.
async function AbrirModalCard(mudarIdModalCard) {
    //Pegando  a div do Html da qual eu vou turar o mdodal
    var abrirCartaPokemon = document.querySelector(".ModalCobrirTelaCard")
    //Tirando o modal da div
    abrirCartaPokemon.classList.remove("modal")    

    //Criando uma variavel que será atribuido a api
    const data = await fetchPokemon(NumeroIdpokemon)

    //Chamando a imagem do card, para colcoar o pokemon
    var imagemPokemonCard = document.querySelector('#pokemonImagemCarta')
    //Atribuindo a variavel do Html a nomePokemonCard
    var nomePokemonCard = document.querySelector("#nomePokemonCard")
    //Atribuindo a variavel do Html a vida do pokemon
    var vidaPokemon = document.querySelector("#vidaPokemon")
    //Atribuindo a variavel do Html a altura do pokemon
    var alturaPokemon = document.querySelector("#alturaPokemon")
    //Atribuindo a variavel do Html ao peso do pokemon
    var pesoPokemon = document.querySelector("#pesoPokemon")

    //Definindo os movimentos do pokemon
    var movimentos = document.querySelector("#movimentos")

    //Criando um if para verificar se minha API tem conteudo
    if (data) {
        // Direcionando a imagem do pokemon para usar display block
        imagemPokemonCard.style.display = 'block';
        // Definindo o nome do pokemon baseado no json
        nomePokemonCard.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        //Definindo a vida do pokemon
        vidaPokemon.innerHTML = "ps " + data.base_experience
        //Definindo a altura do pokemon em metros
        alturaPokemon.innerHTML = "Altura: " + (data.height / 10).toFixed(2) + " m";
        //Definindo o peso do pokemon em kg
        pesoPokemon.innerHTML = "Peso: " + (data.weight / 10).toFixed(1) + " kg";

        //Definindo os movimentos do pokemon
        data.moves.slice(0, 2).forEach((item) => {
            movimentos.innerHTML = ''
            var linhaMovimentos = document.createElement("li")
            // console.log(traducaoMovimento)
            linhaMovimentos.innerHTML = item.move.name
            movimentos.appendChild(linhaMovimentos)
        })

        // Defininfo que avariavel declarada na parte superior. agora tem o valor do id
        NumeroIdpokemon = data.id


        // Definindo a imagem do pokemon
        imagemPokemonCard.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    }

}
// function AbrirModalCard (){


// }
// console.log(NumeroIdpokemon)


//Fechando modal da card quando licaco no x
function FecharModalTelaCard() {
    ModalCobrirTelaCard.classList.add('modal')
}

