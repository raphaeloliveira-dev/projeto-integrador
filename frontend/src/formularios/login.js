const formulario = document.getElementById('formLogin');

if (formulario) {
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const mensagem = document.getElementById('mensagem');

        if (!mensagem) {
            return;
        }

        if (!email || !senha) {
            mensagem.textContent = 'Informe o e-mail e a senha.';
            mensagem.style.color = 'red';
            return;
        }

        try {
            const resposta = await fetch('http://localhost:3000/api/clientes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.mensagem || 'Credenciais inválidas.');
            }

            mensagem.textContent = resultado.mensagem || 'Login efetuado com sucesso!';
            mensagem.style.color = 'green';
            localStorage.setItem('clienteLogado', JSON.stringify(resultado.cliente));

            setTimeout(() => {
                window.location.href = '../pages/index.html';
            }, 700);
        } catch (erro) {
            mensagem.textContent = erro.message;
            mensagem.style.color = 'red';
        }
    });
}