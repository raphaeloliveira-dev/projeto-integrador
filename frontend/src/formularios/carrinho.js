const chaveCarrinho = 'recycleWearCarrinho';
const carrinho = carregarCarrinho();
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');


function carregarCarrinho() {
    try {
        const itensSalvos = JSON.parse(localStorage.getItem(chaveCarrinho) || '[]');
        if (Array.isArray(itensSalvos) && itensSalvos.every((item) =>
            typeof item.nome === 'string' &&
            item.nome.length > 0 &&
            Number.isFinite(item.preco) &&
            item.preco > 0 &&
            Number.isInteger(item.quantidade) &&
            item.quantidade > 0
        )) {
            return itensSalvos;
        }
    } catch (erro) {
        console.error('Não foi possível carregar o carrinho salvo.', erro);
    }


    return [];
}


function salvarCarrinho() {
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
    atualizarCarrinho();
}


function adicionarAoCarrinho(nome, preco) {
    if (typeof nome !== 'string' || !Number.isFinite(preco) || preco <= 0) {
        console.error('Produto inválido para adicionar ao carrinho.');
        return;
    }


    const item = carrinho.find((produto) => produto.nome === nome);
    if (item) {
        item.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }


    salvarCarrinho();
}


function alterarQuantidade(nome, variacao) {
    const item = carrinho.find((produto) => produto.nome === nome);
    if (!item) return;


    item.quantidade += variacao;
    if (item.quantidade <= 0) {
        carrinho.splice(carrinho.indexOf(item), 1);
    }


    salvarCarrinho();
}


function atualizarCarrinho() {
    if (itensCarrinho) {
        itensCarrinho.replaceChildren();

        if (carrinho.length === 0) {
            const mensagem = document.createElement('p');
            mensagem.className = 'carrinho-vazio';
            mensagem.textContent = 'Seu carrinho está vazio.';
            itensCarrinho.append(mensagem);
        }

        carrinho.forEach((item) => {
            const linha = document.createElement('div');
            linha.className = 'item-carrinho';

            const descricao = document.createElement('div');
            descricao.className = 'descricao-item-carrinho';

            const nome = document.createElement('strong');
            nome.textContent = item.nome;
            const subtotal = document.createElement('span');
            subtotal.textContent = formatarMoeda(item.preco * item.quantidade);
            descricao.append(nome, subtotal);

            const controles = document.createElement('div');
            controles.className = 'controles-quantidade';

            const remover = document.createElement('button');
            remover.type = 'button';
            remover.setAttribute('aria-label', `Remover uma unidade de ${item.nome}`);
            remover.textContent = '−';
            remover.addEventListener('click', () => alterarQuantidade(item.nome, -1));

            const quantidade = document.createElement('span');
            quantidade.textContent = item.quantidade;

            const adicionar = document.createElement('button');
            adicionar.type = 'button';
            adicionar.setAttribute('aria-label', `Adicionar uma unidade de ${item.nome}`);
            adicionar.textContent = '+';
            adicionar.addEventListener('click', () => alterarQuantidade(item.nome, 1));

            controles.append(remover, quantidade, adicionar);
            linha.append(descricao, controles);
            itensCarrinho.append(linha);
        });
    }

    const quantidadeTotal = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    const valorTotal = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    const quantidadeCarrinho = document.getElementById('quantidadeCarrinho');
    if (quantidadeCarrinho) {
        quantidadeCarrinho.textContent = quantidadeTotal;
        quantidadeCarrinho.setAttribute(
            'aria-label',
            `${quantidadeTotal} ${quantidadeTotal === 1 ? 'item' : 'itens'} no carrinho`
        );
    }
    if (totalCarrinho) totalCarrinho.textContent = formatarMoeda(valorTotal);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


const botaoLimparCarrinho = document.getElementById('limparCarrinho');
if (botaoLimparCarrinho) {
    botaoLimparCarrinho.addEventListener('click', () => {
        carrinho.splice(0, carrinho.length);
        salvarCarrinho();
    });
}


atualizarCarrinho();
