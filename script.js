
const campoSenha = document.getElementById('campo-senha');
const campoTamanho = document.getElementById('campo-tamanho');
const checkMaiusculas = document.getElementById('check-maiusculas');
const checkMinusculas = document.getElementById('check-minusculas');
const checkNumeros = document.getElementById('check-numeros');
const checkEspeciais = document.getElementById('check-especiais');
const btnGerar = document.getElementById('btn-gerar');
const btnLimpar = document.getElementById('btn-limpar');
const btnCopiar = document.getElementById('btn-copiar');
const btnMostrar = document.getElementById('btn-mostrar');
const mensagem = document.getElementById('mensagem');


const listaCategorias = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
    'abcdefghijklmnopqrstuvwxyz', 
    '0123456789',                 
    '!@#$%^&*()_+-=[]{}|;:,.<>?'  
];

// Função para exibir mensagens de erro ou sucesso
function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = 'mensagem ' + tipo;
}


function gerarSenha() {
    // Limpa mensagens anteriores
    exibirMensagem('', '');

    const tamanho = Number(campoTamanho.value);

    if (!Number.isInteger(tamanho) || tamanho < 1 || tamanho > 50) {
        exibirMensagem('Erro: Digite um número inteiro entre 1 e 50.', 'erro');
        campoSenha.value = '';
        return;
    }

    let caracteres = '';

    if (checkMaiusculas.checked) {
        caracteres += listaCategorias[0];
    }
    if (checkMinusculas.checked) {
        caracteres += listaCategorias[1];
    }
    if (checkNumeros.checked) {
        caracteres += listaCategorias[2];
    }
    if (checkEspeciais.checked) {
        caracteres += listaCategorias[3];
    }

    if (caracteres === '') {
        exibirMensagem('Erro: Selecione pelo menos uma categoria de caracteres!', 'erro');
        campoSenha.value = '';
        return;
    }


    let senha = '';

    for (let e = 0; e < tamanho; e++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        

        senha += caracteres[indice];
    }


    campoSenha.value = senha;
    exibirMensagem('Senha gerada com sucesso!', 'sucesso');
}


function limparCampos() {
    campoSenha.value = '';
    campoSenha.type = 'text';
    campoTamanho.value = 12;
    checkMaiusculas.checked = true;
    checkMinusculas.checked = true;
    checkNumeros.checked = true;
    checkEspeciais.checked = false;
    exibirMensagem('', '');
}


function copiarSenha() {
    if (campoSenha.value === '') {
        exibirMensagem('Gere uma senha antes de copiar.', 'erro');
        return;
    }
    navigator.clipboard.writeText(campoSenha.value);
    exibirMensagem('Senha copiada para a área de transferência!', 'sucesso');
}

function alternarVisibilidade() {
    if (campoSenha.type === 'text') {
        campoSenha.type = 'password';
    } else {
        campoSenha.type = 'text';
    }
}

btnGerar.addEventListener('click', gerarSenha);
btnLimpar.addEventListener('click', limparCampos);
btnCopiar.addEventListener('click', copiarSenha);
btnMostrar.addEventListener('click', alternarVisibilidade);