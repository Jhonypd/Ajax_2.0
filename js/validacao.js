const form = document.querySelector('#cadastro');
const campos = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    cpf: document.getElementById('cpf'),
    cep: document.getElementById('cep'),
    rua: document.getElementById('rua'),
    cidade: document.getElementById('cidade'),
    bairro: document.getElementById('bairro'),
    uf: document.getElementById('uf'),
    numero: document.getElementById('numero'),
};

const validation = {
    nome: document.getElementById('invalid-nome'),
    email: document.getElementById('invalid-email'),
    cpf: document.getElementById('invalid-cpf'),
    //cep: document.getElementById('invalid-cep'),
    uf: document.getElementById('invalid-uf'),
    numero: document.getElementById('invalid-numero'),
};

const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    mensagem.innerHTML = '';

    const camposVazios = validarCamposVazios(campos);

    if (camposVazios.length > 0) {
        mensagem.innerHTML = `Os campos ${camposVazios.join(', ')} estão vazios.`;
    } else {
        validarCampos(campos);
    }
});

function validarCamposVazios(campos) {
    const camposVazios = [];

    for (const campo in campos) {
        const valor = campos[campo].value.trim();
        if (!valor) {
            camposVazios.push(campo.charAt(0).toUpperCase() + campo.slice(1));
            campos[campo].classList.add('vazio');
            if (validation[campo]) { 
                validation[campo].innerHTML = '';
            }
        } else {
            campos[campo].classList.remove('vazio');
        }
    }

    return camposVazios;
}


function validarCampos(campos) {
    const erros = {
        email: 'E-mail inválido.',
        cpf: 'CPF inválido.',
        numero: 'Número inválido.',
        uf: 'UF inválida.',
    };

    for (const campo in campos) {
        const valor = campos[campo].value.trim();
        if (!valor) {
            campos[campo].classList.add('vazio');
            validation[campo].innerHTML = '';
        } else {
            campos[campo].classList.remove('vazio');
            if (validation[campo]) { 
                validation[campo].innerHTML = '';
            }
        }
    }

    const emailValido = validarEmail(campos.email.value);
    const cpfValido = validarCPF(campos.cpf.value);
    const numeroValido = validarNumero(campos.numero.value);
    const ufValido = validarUf(campos.uf.value);

    if (!emailValido && validation.email) {
        validation.email.innerHTML = erros.email;
    }

    if (!cpfValido && validation.cpf) {
        validation.cpf.innerHTML = erros.cpf;
    }
    
    if(!numeroValido && validation.numero) {
        validation.numero.innerHTML = erros.numero
    }

    if(!ufValido && validation.uf) {
        validation.uf.innerHTML = erros.uf
    }

    if (emailValido && cpfValido && numeroValido && ufValido) {
        mensagem.innerHTML = '';
        form.submit()
    }
    
}

function validarNumero(numero) {
    const numeroValid = /^[0-9]+$/;
    return numero.match(numeroValid) !== null;
}
function validarUf(uf) {
    const ufValid = /^(?:\s*(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)?)$/i;
    return uf.match(ufValid) !== null;
}

function validarEmail(email) {
    const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(emailValid) !== null;
}

function validarCPF(cpf) {
    const cpfValid = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    return cpf.match(cpfValid) !== null;
}
