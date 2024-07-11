var PrimeiroNome = document.querySelector('#primeiroNome');
var UltimoNome = document.querySelector('#ultimoNome');
var Email = document.querySelector('#email');





const enviar = () => {
    // Validando o primeiro nome
    if (PrimeiroNome.value == 0 || PrimeiroNome.value == ' ') {
        document.querySelector('.requiredNome').classList.remove('model')
        PrimeiroNome.style.borderColor = 'red';
    } else {
        console.log('ok 1')
    }

    // Validando o ultimo nome
    if (UltimoNome.value == 0 || UltimoNome.value == ' ') {
        document.querySelector('.requiredNomeUltimo').classList.remove('model')
        UltimoNome.style.borderColor = 'red';
    } else {
        console.log('ok 2')
    }

    // Validando o Email
    if (Email.value == 0 || Email.value == " " || validarEmail(false)) {
        document.querySelector('.requiredEmail').classList.remove('model')
        Email.style.borderColor = 'red';
    } else {
        console.log('ok')
    }

    validandoInput()
}


// Função criada para validar email
function validarEmail() {
    const email = document.getElementById('email').value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
        return true; // Continua com o envio do formulário
    } else {
        alert('Email inválido! Por favor, insira um email válido.');
        return false; // Impede o envio do formulário
    }

}


//Funçãp criada pra averiguar se os inputs do tipo checkbox foram clicados.
function validandoInput() {
    var erro = document.querySelector('.requiredInput')
    var inputGeneral = document.querySelector('#inputG');
    var inputSupport = document.querySelector('#inputS');


    // Seleciona todos os checkboxes do formulário
    var checkboxes = document.querySelectorAll('input[type="radio"]');

    // Variáveis para armazenar o status de cada tipo de checkbox
    var isGeneralChecked = false;
    var isSupportChecked = false;

    // Verifica cada checkbox
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            if (checkbox.value === 'general') {
                isGeneralChecked = true;
            } else if (checkbox.value === 'support') {
                isSupportChecked = true;
            }
        }
    });

    // Verifica qual tipo de checkbox está marcado e exibe a mensagem correspondente
    if (isGeneralChecked && isSupportChecked) {
        alert('Erro!')
    } else if (isGeneralChecked) {
        console.log('Apenas o checkbox General está marcado');
        erro.classList.add('model');
        inputGeneral.style.borderColor = '#000';
        inputSupport.style.borderColor = '#000';
    } else if (isSupportChecked) {
        console.log('Apenas o checkbox Support está marcado');
        erro.classList.add('model');
        inputGeneral.style.borderColor = '#000';
        inputSupport.style.borderColor = '#000';
    } else {
        erro.classList.remove('model');
        inputGeneral.style.borderColor = 'red';
        inputSupport.style.borderColor = 'red';
    }

}
