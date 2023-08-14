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

// function carregar() {
//     const procurar = document.querySelector('#procure');
//     var alinhandoQuadrado = document.querySelector('.alinhandoOsQuadrados')

//     procurar.addEventListener('input', () => {
//         alinhandoQuadrado.innerHTML = ''; // Limpa o conteúdo existente

//         if (procurar.value.trim() !== '') {
//             fetch('http://localhost:3000/procurarPorNome/' + procurar.value)
//                 .then(res => res.json())
//                 .then(u => {
//                     u.forEach(comida => {
//                         const DivQuadrado = document.querySelector('.quadradoEscolha').cloneNode(true);
//                         DivQuadrado.querySelector('#cappucino').src = '../imgs/' + comida.img;
//                         DivQuadrado.querySelector('#nomeComida').innerHTML = comida.nome;
//                         DivQuadrado.querySelector('#valorComida').innerHTML = comida.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

//                         DivQuadrado.innerHTML += `<img src="../imgs/+.png" height="20vh" onclick='VisualizarItem(${comida.id})' />`;
//                         alinhandoQuadrado.appendChild(DivQuadrado);
//                     })
//                 });
//         }
//     });
// }


function carregar() {
    const procurar = document.getElementById('procure'); // Supondo que você tenha um elemento de entrada com o id 'procurar'
    
    function limparDivs() {
        const divsParaLimpar = [
            document.querySelector('.quadradoEscolha'),
            document.querySelector('.alinhandoDivPopular'),
            document.querySelector('.quadradoCha'),
            document.querySelector('.quadradoChocolate'),
            document.querySelector('.quadradoomidaGeral')
        ];
        
        divsParaLimpar.forEach(div => {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        });
    }
    
    function buscarEExibirDados(url, funcaoFiltro, funcaoRenderizacao) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                limparDivs();
                data.forEach(item => {
                    if (funcaoFiltro(item)) {
                        funcaoRenderizacao(item);
                    }
                });
            });
    }
    
    function renderizarComida(seletorDiv, item) {
        const DivQuadrado = document.querySelector(seletorDiv).cloneNode(true);
        DivQuadrado.classList.remove('model');

        // Renderize seu conteúdo aqui

        document.querySelector('.alinhandoQuadrado').appendChild(DivQuadrado);
    }

    // Supondo que você tenha um elemento de entrada com o id 'procurar'
    procurar.addEventListener('input', () => {
        const termoBusca = procurar.value;
        
        if (termoBusca.trim() !== '') {
            buscarEExibirDados('http://localhost:3000/procurarPorNome/' + termoBusca, () => true, item => renderizarComida('.quadradoEscolha', item));
        } else {
            // Busque e exiba os dados padrão
            buscarEExibirDados('http://localhost:3000/procurarPorNome/', comida => comida.id_topico === 1, item => renderizarComida('.quadradoEscolha', item));
        }
    });

    // Busque e exiba os dados padrão
    buscarEExibirDados('http://localhost:3000/popular', () => true, item => {
        const DivQuadradoPopular = document.querySelector('.alinhandoDivPopular').cloneNode(true);
        // Renderize o conteúdo popular
        document.querySelector('.alinharP').appendChild(DivQuadradoPopular);
    });
    
    // Busque e exiba dados para cada tópico
    buscarEExibirDados('http://localhost:3000/procurarPorNome', comida => comida.id_topico === 2, item => {
        const cha = document.querySelector('.quadradoCha').cloneNode(true);
        // Renderize o conteúdo do tópico 2
        document.querySelector('.Alinhandochas').appendChild(cha);
    });

    buscarEExibirDados('http://localhost:3000/procurarPorNome', comida => comida.id_topico === 3, item => {
        const choco = document.querySelector('.quadradoChocolate').cloneNode(true);
        // Renderize o conteúdo do tópico 3
        document.querySelector('.alinhandoChoco').appendChild(choco);
    });

    buscarEExibirDados('http://localhost:3000/procurarPorNome', comida => comida.id_topico === 4, item => {
        const comidas = document.querySelector('.quadradoomidaGeral').cloneNode(true);
        // Renderize o conteúdo do tópico 4
        document.querySelector('.alinhandoComida').appendChild(comidas);
    });
}

function VisualizarItem(id) {
    console.log(id)

    localStorage.setItem('informacoes', id)
    window.location.href = '../PEDIDO/index.html'
}

function VisualizarItemComidas(id) {
    console.log(id)

    localStorage.setItem('informacoes', id)
    window.location.href = '../PEDIDO/comidas/comidas.html'
}








// function mostrarImg(img) {
//     if (img != null) {
//         return `data:image/png;base64, ${img}`;
//     } else {
//         return `../assets/cha.png`
//     }
// }
