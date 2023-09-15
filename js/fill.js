const mensagemCep = document.querySelector('#invalid-cep');
//const search = document.querySelector('#search');

const cep = document.getElementById('cep');
const rua = document.getElementById('rua'); 
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');

function validaCep(cep) {
    const cepValid = /^[0-9]{8}$/;
    return cep.match(cepValid) !== null;
}

function updateAdress(data) {
    if (!('erro' in data)) {
        mensagemCep.innerHTML = '';
        rua.value = (data.logradouro)
        bairro.value = (data.bairro)
        cidade.value = (data.localidade)
        uf.value = (data.uf)
    } else {
        mensagemCep.innerHTML = `CEP não encontrado`;
    }
}

cep.addEventListener('blur', function (event) {
    event.preventDefault()
    const isCEP = validaCep(cep.value); 
    if (!isCEP) { 
        mensagemCep.innerHTML = `CEP inválido`;
    } else {
        mensagemCep.innerHTML = '';
        const viacep = 'https://viacep.com.br/ws/';
        const script = document.createElement('script');
        script.src = viacep + cep.value + '/json?callback=updateAdress';
        document.body.appendChild(script);
    }
});



