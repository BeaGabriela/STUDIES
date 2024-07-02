var PrimeiroNome = document.querySelector('#primeiroNome');
var UltimoNome = document.querySelector('#ultimoNome');



function carregar() {

}




const enviar = () => {
    if (PrimeiroNome.value == 0 || PrimeiroNome.value == ' ') {
        console.log('erro 1')
       
    } else {
        console.log('ok 1')
    }

    if (UltimoNome.value == 0 || UltimoNome.value == ' ') {
        console.log('erro 2');
    } else {
        console.log('ok 2')
    }


}