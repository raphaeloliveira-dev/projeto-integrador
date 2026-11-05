const formulario = document.getElementById('formCadastro');

if (formulario) {
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const endereco = document.getElementById('endereco').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem');

        if (!nome || !email || !senha || !confirmarSenha || !endereco || !telefone) {
            mensagem.textContent = 'Preencha todos os campos.';
            mensagem.style.color = 'red';
            return;
        }

        if (senha.length < 8) {
            mensagem.textContent = 'A senha deve ter pelo menos 8 caracteres.';
            mensagem.style.color = 'red';
            return;
        }

        if (senha !== confirmarSenha) {
            mensagem.textContent = 'As senhas não conferem.';
            mensagem.style.color = 'red';
            return;
        }

        try {
            const resposta = await fetch('http://localhost:3000/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha, endereco, telefone })
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.mensagem || 'Erro ao cadastrar cliente.');
            }

            mensagem.textContent = resultado.mensagem || 'Cadastro realizado com sucesso!';
            mensagem.style.color = 'green';
            localStorage.setItem('clienteLogado', JSON.stringify(resultado.cliente));

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 700);
        } catch (erro) {
            mensagem.textContent = erro.message;
            mensagem.style.color = 'red';
        }
    });
}
