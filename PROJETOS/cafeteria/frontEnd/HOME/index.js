var alinhandoQuadrado = document.querySelector('.alinhandoOsQuadrados')

const imagemMenu = document.querySelector('#abrirMenu');
imagemMenu.addEventListener('click', function () {
    const menuLateral = document.querySelector('.menuLateral');
    // Exiba o menu lateral definindo a propriedade de exibição como "block"
    menuLateral.classList.remove('model')
});


const sair = document.querySelector('#sair')
sair.addEventListener('click', () => {
    const menuLateral = document.querySelector('.menuLateral');
    menuLateral.classList.add('model')
})

function carregar(){
fetchComidas()
}

function fetchComidas(topico){
    topico = ''
    fetch('http://localhost:3000/procurarPorNome/' + topico)
    .then(res => res.json())
    .then(u => {
        console.log(u);
        u.forEach(comida => {
            if(comida.id_topico == 1){
            const DivQuadrado = document.querySelector('.quadradoEscolha').cloneNode(true);
            DivQuadrado.classList.remove('model');
            DivQuadrado.querySelector('#cappucino').src = '../imgs/' + comida.img;
            DivQuadrado.querySelector('#nomeComida').innerHTML = comida.nome;
            DivQuadrado.querySelector('#valorComida').innerHTML = comida.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            const imgBotao = document.createElement('img');
            imgBotao.src = '../imgs/+.png';
            imgBotao.height = '20vh';
            imgBotao.onclick = () => VisualizarItem(comida.id);
                        
            DivQuadrado.appendChild(imgBotao);

            document.querySelector('.alinhandoOsQuadrados').appendChild(DivQuadrado);
            }else if(comida.id_topico == 2){
                const QuadradoCha = document.querySelector('.quadradoCha').cloneNode(true)
                QuadradoCha.classList.remove('model')
                QuadradoCha.querySelector('#chaI').src =  '../imgs/' + comida.img;
                QuadradoCha.querySelector('#nomecha').innerHTML = comida.nome;
                QuadradoCha.querySelector('#valorCham').innerHTML = comida.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                const imgBotao = document.createElement('img');
                imgBotao.src = '../imgs/+.png';
                imgBotao.height = '20vh';
                imgBotao.onclick = () => VisualizarItem(comida.id);
                QuadradoCha.appendChild(imgBotao);

                document.querySelector('.Alinhandochas').appendChild(QuadradoCha);
                

            }else if(comida.id_topico == 3){
                const QuadradoChoc = document.querySelector('.quadradoChocolate').cloneNode(true)
                QuadradoChoc.classList.remove('model')
                QuadradoChoc.querySelector('#chocolate').src =  '../imgs/' + comida.img;
                QuadradoChoc.querySelector('#nomechocolate').innerHTML = comida.nome;
                QuadradoChoc.querySelector('#valorChoco').innerHTML = comida.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                const imgBotao = document.createElement('img');
                imgBotao.src = '../imgs/+.png';
                imgBotao.height = '20vh';
                imgBotao.onclick = () => VisualizarItem(comida.id);
                QuadradoChoc.appendChild(imgBotao);

                document.querySelector('.AlinhandoChoco').appendChild(QuadradoChoc)
            }else if(comida.id_topico == 4){
                const quadradoomidaGeral = document.querySelector('.quadradoomidaGeral').cloneNode(true)
                quadradoomidaGeral.classList.remove('model')
                quadradoomidaGeral.querySelector('#comidas').src =  '../imgs/' + comida.img;
                quadradoomidaGeral.querySelector('#comidasGeral').innerHTML = comida.nome;
                quadradoomidaGeral.querySelector('#valorC').innerHTML = comida.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                const imgBotao = document.createElement('img');
                imgBotao.src = '../imgs/+.png';
                imgBotao.height = '20vh';
                imgBotao.onclick = () => VisualizarItem(comida.id);
                quadradoomidaGeral.appendChild(imgBotao);

                document.querySelector('.alinhandoComida').appendChild(quadradoomidaGeral)
            }
              
            })
        })
}