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
    var main = document.querySelector('main')
    var filtro = document.querySelector('#procure')
    fetchComidas('')
    filtro.addEventListener('change', () => {
        if(filtro.value ==1 ){
            main.innerHTML= `<p id="rotulo">Café</p>
            <div class="alinhandoOsQuadrados ">
                <div class="quadradoEscolha model">
                    <img id='cappucino' height="80vh" />
                    <p id='nomeComida'>Cappucino</p>
                    <div id='valor'>
                        <label id="valorComida">10.99</label>
                        <!-- <img src="../imgs/+.png" height="20vh" /> -->
                    </div>
                </div>
            </div>`
            valorFiltro = 1
            fetchComidas(1)
        }else if(filtro.value == 2){
            main.innerHTML = ` <p id="rotulo">Chá</p>
            <div class='Alinhandochas'>
                <div class="quadradoCha model">
                    <img id='chaI' height="70vh" />
                    <p id='nomecha'>cha</p>
                    <div id='valor'>
                        <label id="valorCham">10.99</label>
                        <img src="../imgs/+.png" height="20vh" />
                    </div>
                </div>
            </div>`
            valorFiltro = 2
            fetchComidas(2)
        }else if(filtro.value == 3){
            main.innerHTML = `<p id="rotulo">Chocolate</p>
            <div class='alinhandoChoco'>
                <div class="quadradoChocolate model">
                    <img id='chocolate' height="70vh" />
                    <p id='nomechocolate'>cho</p>
                    <div id='valor'>
                        <label id="valorChoco">10.99</label>
                        <img src="../imgs/+.png" height="20vh" />
                    </div>
                </div>
            </div>`
            valorFiltro= 3
            fetchComidas(3)
        }else if(filtro.value == 4){
            main.innerHTML = `
            <p id="rotulo">Comida</p>
            <div class="alinhandoComida">
                <div class="quadradoomidaGeral model">
                    <img id='comidas' height="70vh" />
                    <p id='comidasGeral'>cho</p>
                    <div id='valor'>
                        <label id="valorC">10.99</label>
                        <img src="../imgs/+.png" height="20vh" />
                    </div>
                </div>
            </div>`
            valorFiltro = 4
            fetchComidas(4)
        }else if(filtro.value == 0){
            main.innerHTML = `    <p id="rotulo">Café</p>
            <div class="alinhandoOsQuadrados ">
                <div class="quadradoEscolha model">
                    <img id='cappucino' height="80vh" />
                    <p id='nomeComida'>Cappucino</p>
                    <div id='valor'>
                        <label id="valorComida">10.99</label>
                        <!-- <img src="../imgs/+.png" height="20vh" /> -->
                    </div>
                </div>
            </div>
    
            <p id="rotulo">Chá</p>
            <div class='Alinhandochas'>
                <div class="quadradoCha model">
                    <img id='chaI' height="70vh" />
                    <p id='nomecha'>cha</p>
                    <div id='valor'>
                        <label id="valorCham">10.99</label>
                        <img src="../imgs/+.png" height="20vh" />
                    </div>
                </div>
            </div>
    
            <p id="rotulo">Chocolate</p>
            <div class='alinhandoChoco'>
                <div class="quadradoChocolate model">
                    <img id='chocolate' height="70vh" />
                    <p id='nomechocolate'>cho</p>
                    <div id='valor'>
                        <label id="valorChoco">10.99</label>
                        <img src="../imgs/+.png" height="20vh" />
                    </div>
                </div>
            </div>
    
            <p id="rotulo">Comida</p>
            <div class="alinhandoComida">
                <div class="quadradoomidaGeral model">
                    <img id='comidas' height="70vh" />
                    <p id='comidasGeral'>cho</p>
                    <div id='valor'>
                        <label id="valorC">10.99</label>
                        <img src="../imgs/+.png" height="20vh" />
                    </div>
                </div>
            </div>
    
            <h2>Popular</h2>
            <div class="alinharP">
                <div class="alinhandoDivPopular model">
                    <img id="imgPopular" src='../imgs/logo.jpg' alt="a">
                    <div class="AmostraPopular">
                        <h3 id='nomePopular'>Americano</h3>
                        <p id="descricaoPopular">Ele é um café simples...</p>
                        <label id="valorPopular">09.55</label>
                    </div>
                    <img id="mais" src="../imgs/+.png" />
                </div>
            </div>
    `
    valorFiltr = 0
    fetchComidas(0)
        }
    })

}

function fetchComidas(topico){
    var converter = 0
    topico = ''

    if(topico != 0 || topico != ''){
        converter = Number(topico)
    }else{
        converter = ''
    }

    console.log(converter)
    fetch('http://localhost:3000/procurarPorNome/'+ converter)
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