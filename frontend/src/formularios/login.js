
const formulario = document.getElementById('formCadastro');

formulario.addEventListener('submit', (event) => {

    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;

    const mensagem = document.getElementById('mensagem');

    if (senha !== confirmarSenha) {
        mensagem.textContent = 'As senhas não são iguais!';
        mensagem.style.color = 'red';
        return;
    }

    mensagem.textContent = 'Formulário validado com sucesso!';
    mensagem.style.color = 'green';

    console.log({
        nome,
        email,
        senha,
        endereco,
        telefone
    });

});
