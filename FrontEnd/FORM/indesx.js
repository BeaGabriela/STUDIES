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
    if(Email.value == 0 || Email.value == " " || validarEmail(false) ){
        document.querySelector('.requiredEmail').classList.remove('model')
        Email.style.borderColor ='red';
    }else{
        console.log('ok')
    }
}

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
