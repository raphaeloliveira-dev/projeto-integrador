const chaveCarrinho = 'recycleWearCarrinho';
const valorFreteFixo = 15.90;
const carrinho = carregarCarrinho();
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');
const subtotalCarrinho = document.getElementById('subtotalCarrinho');
const freteCarrinho = document.getElementById('freteCarrinho');
const formularioFrete = document.getElementById('formularioFrete');
const campoCepFrete = document.getElementById('cepFrete');
const mensagemFrete = document.getElementById('mensagemFrete');
let freteCalculado = false;
let cepCalculado = '';


function carregarCarrinho() {
    try {
        const itensSalvos = JSON.parse(localStorage.getItem(chaveCarrinho) || '[]');
        if (Array.isArray(itensSalvos) && itensSalvos.every((item) =>
            typeof item.nome === 'string' &&
            Number.isSafeInteger(item.id) &&
            item.id > 0 &&
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


function adicionarAoCarrinho(id, nome, preco) {
    if (!Number.isSafeInteger(Number(id)) || typeof nome !== 'string' ||
        !Number.isFinite(preco) || preco <= 0) {
        console.error('Produto inválido para adicionar ao carrinho.');
        return;
    }


    const item = carrinho.find((produto) => produto.id === Number(id));
    if (item) {
        item.quantidade += 1;
    } else {
        carrinho.push({ id: Number(id), nome, preco, quantidade: 1 });
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

function removerDoCarrinho(id) {
    const indice = carrinho.findIndex((item) => item.id === id);
    if (indice < 0) return;

    carrinho.splice(indice, 1);
    salvarCarrinho();
}


function atualizarCarrinho() {
    if (itensCarrinho) {
        itensCarrinho.replaceChildren();

        if (carrinho.length === 0) {
            const mensagem = document.createElement('p');
            mensagem.className = 'carrinho-vazio';
            mensagem.textContent = 'Sua sacola está vazia.';
            itensCarrinho.append(mensagem);
        }

        carrinho.forEach((item) => {
            const linha = document.createElement('div');
            linha.className = 'item-carrinho';

            const imagemPainel = document.createElement('div');
            imagemPainel.className = 'imagem-item-carrinho';
            const imagem = document.createElement('img');
            imagem.alt = item.nome;
            const caminhoImagem = imagensProdutos[item.nome];
            if (caminhoImagem) {
                imagem.src = caminhoImagem;
                imagemPainel.append(imagem);
            } else {
                imagemPainel.hidden = true;
            }

            const descricao = document.createElement('div');
            descricao.className = 'descricao-item-carrinho';

            const nome = document.createElement('h2');
            nome.className = 'nome-item-carrinho';
            nome.textContent = item.nome;

            const detalhe = document.createElement('p');
            detalhe.className = 'detalhe-item-carrinho';
            const cor = ['Preta', 'Branca', 'Azul', 'Verde'].find((valor) =>
                item.nome.endsWith(valor)
            );
            detalhe.textContent = cor ? `Cor: ${cor}` : 'RecycleWear · Moda consciente';

            const preco = document.createElement('span');
            preco.className = 'preco-item-carrinho';
            preco.textContent = formatarMoeda(item.preco);
            descricao.append(nome, detalhe, preco);

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

            const excluir = document.createElement('button');
            excluir.type = 'button';
            excluir.className = 'botao-remover';
            excluir.textContent = 'Remover';
            excluir.addEventListener('click', () => removerDoCarrinho(item.id));

            controles.append(remover, quantidade, adicionar, excluir);
            descricao.append(controles);

            const subtotal = document.createElement('span');
            subtotal.className = 'subtotal-item';
            subtotal.textContent = formatarMoeda(item.preco * item.quantidade);
            linha.append(imagemPainel, descricao, subtotal);
            itensCarrinho.append(linha);
        });
    }

    const quantidadeTotal = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    const valorSubtotal = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
    const valorTotal = valorSubtotal + (freteCalculado && carrinho.length > 0 ? valorFreteFixo : 0);
    const quantidadeCarrinho = document.getElementById('quantidadeCarrinho');
    if (quantidadeCarrinho) {
        quantidadeCarrinho.textContent = quantidadeTotal;
        quantidadeCarrinho.setAttribute(
            'aria-label',
            `${quantidadeTotal} ${quantidadeTotal === 1 ? 'item' : 'itens'} no carrinho`
        );
    }
    if (subtotalCarrinho) subtotalCarrinho.textContent = formatarMoeda(valorSubtotal);
    if (freteCarrinho) {
        freteCarrinho.textContent = freteCalculado && carrinho.length > 0
            ? formatarMoeda(valorFreteFixo)
            : 'Calcule seu frete';
    }
    if (totalCarrinho) totalCarrinho.textContent = formatarMoeda(valorTotal);
    const quantidadeItens = document.getElementById('quantidadeItens');
    if (quantidadeItens) {
        quantidadeItens.textContent = `${quantidadeTotal} ${quantidadeTotal === 1 ? 'item' : 'itens'}`;
    }
    const botaoFinalizar = document.getElementById('finalizarCompra');
    if (botaoFinalizar) botaoFinalizar.disabled = carrinho.length === 0 || !freteCalculado;
    const botaoLimpar = document.getElementById('limparCarrinho');
    if (botaoLimpar) botaoLimpar.disabled = carrinho.length === 0;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

if (campoCepFrete) {
    campoCepFrete.addEventListener('input', () => {
        const digitos = campoCepFrete.value.replace(/\D/g, '').slice(0, 8);
        campoCepFrete.value = digitos.length > 5
            ? `${digitos.slice(0, 5)}-${digitos.slice(5)}`
            : digitos;
        freteCalculado = false;
        cepCalculado = '';
        if (mensagemFrete) mensagemFrete.textContent = '';
        atualizarCarrinho();
    });
}

if (formularioFrete) {
    formularioFrete.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const cep = campoCepFrete.value.replace(/\D/g, '');

        if (carrinho.length === 0) {
            mensagemFrete.textContent = 'Adicione produtos antes de calcular o frete.';
            return;
        }
        if (!/^\d{8}$/.test(cep) || /^0{8}$/.test(cep)) {
            freteCalculado = false;
            cepCalculado = '';
            mensagemFrete.textContent = 'Informe um CEP válido com 8 números.';
            atualizarCarrinho();
            return;
        }

        freteCalculado = true;
        cepCalculado = cep;
        mensagemFrete.textContent = `Frete demonstrativo de ${formatarMoeda(valorFreteFixo)} para o CEP ${campoCepFrete.value}.`;
        atualizarCarrinho();
    });
}


const botaoLimparCarrinho = document.getElementById('limparCarrinho');
if (botaoLimparCarrinho) {
    botaoLimparCarrinho.addEventListener('click', () => {
        carrinho.splice(0, carrinho.length);
        freteCalculado = false;
        cepCalculado = '';
        if (mensagemFrete) mensagemFrete.textContent = '';
        salvarCarrinho();
    });
}

const imagensProdutos = {
    'Camiseta Básica Preta': '../images/camiseta-basica-preta.png',
    'Camiseta Básica Branca': '../images/camiseta-basica-branca.png',
    'Camiseta Básica Azul': '../images/camiseta-basica-azul.png',
    'Bermuda Linho Verde': '../images/bermuda-linho-verde.webp',
    'Bermuda Linho Azul': '../images/bermuda-linho-azul.png',
    'Bermuda Linho Branca': '../images/bermuda-linho-branca.webp',
    'Camiseta Sustentável': '../images/camiseta-basica-preta.png',
    'Moletom Ecológico': '../images/camiseta-basica-branca.png',
    'Short Reciclado': '../images/bermuda-linho-verde.webp',
    'Bermuda Linho Preta': '../images/bermuda-linho-azul.png'
};

let indiceProdutoAtual = 0;
let produtosCarrossel = [];

async function carregarProdutos() {
    const lista = document.getElementById('listaProdutos');
    if (!lista) return;

    try {
        const resposta = await fetch('http://localhost:3000/api/produtos');
        const produtos = await resposta.json();
        if (!resposta.ok) throw new Error(produtos.mensagem);

        produtosCarrossel = produtos;
        indiceProdutoAtual = 0;
        renderizarCarrossel();
    } catch (erro) {
        lista.textContent = 'Não foi possível carregar os produtos.';
        console.error(erro);
    }
}

function renderizarCarrossel() {
    const trilho = document.getElementById('listaProdutos');
    const indicadores = document.getElementById('indicadoresCarrossel');
    if (!trilho || !indicadores) return;

    trilho.replaceChildren();
    indicadores.replaceChildren();

    produtosCarrossel.forEach((produto, indice) => {
        const slide = document.createElement('article');
        slide.className = 'slide-produto';
        slide.setAttribute('aria-label', `${indice + 1} de ${produtosCarrossel.length}`);

        const conteudo = document.createElement('div');
        conteudo.className = 'slide-conteudo';
        const etiqueta = document.createElement('p');
        etiqueta.className = 'slide-etiqueta';
        etiqueta.textContent = `RECYCLEWEAR · PEÇA ${String(indice + 1).padStart(2, '0')}`;
        const titulo = document.createElement('h2');
        titulo.textContent = produto.nome;
        const descricao = document.createElement('p');
        descricao.className = 'slide-descricao';
        descricao.textContent = produto.descricao || 'Uma escolha consciente para o seu dia a dia.';
        const preco = document.createElement('p');
        preco.className = 'slide-preco';
        preco.textContent = Number(produto.preco).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        const botao = document.createElement('button');
        botao.className = 'botao-comprar';
        botao.type = 'button';
        botao.textContent = Number(produto.quantidade) > 0 ? 'Adicionar à sacola' : 'Indisponível';
        botao.disabled = Number(produto.quantidade) <= 0;
        botao.addEventListener('click', () => {
            adicionarAoCarrinho(Number(produto.id), produto.nome, Number(produto.preco));
        });
        conteudo.append(etiqueta, titulo, descricao, preco, botao);

        const imagemPainel = document.createElement('div');
        imagemPainel.className = 'slide-imagem';
        const imagem = document.createElement('img');
        imagem.alt = produto.nome;
        imagem.loading = indice === 0 ? 'eager' : 'lazy';
        const caminhoImagem = imagensProdutos[produto.nome];
        if (caminhoImagem) {
            imagem.src = caminhoImagem;
            imagemPainel.append(imagem);
        } else {
            imagemPainel.hidden = true;
        }
        slide.append(conteudo, imagemPainel);
        trilho.append(slide);

        const indicador = document.createElement('button');
        indicador.className = 'indicador';
        indicador.type = 'button';
        indicador.setAttribute('aria-label', `Mostrar ${produto.nome}`);
        indicador.addEventListener('click', () => mostrarProduto(indice));
        indicadores.append(indicador);
    });

    const total = document.getElementById('totalProdutos');
    if (total) total.textContent = String(produtosCarrossel.length).padStart(2, '0');
    mostrarProduto(0);
}

function mostrarProduto(indice) {
    if (produtosCarrossel.length === 0) return;
    const novoIndice = (indice + produtosCarrossel.length) % produtosCarrossel.length;
    const produtoMudou = novoIndice !== indiceProdutoAtual;
    indiceProdutoAtual = novoIndice;

    const trilho = document.getElementById('listaProdutos');
    if (trilho) trilho.style.transform = `translateX(-${indiceProdutoAtual * 100}%)`;

    const slides = document.querySelectorAll('.slide-produto');
    slides.forEach((slide, posicao) => {
        if (posicao !== indiceProdutoAtual || produtoMudou) {
            slide.classList.remove('slide-produto--entrando');
        }
    });
    const slideAtual = slides[indiceProdutoAtual];
    if (slideAtual && !slideAtual.classList.contains('slide-produto--entrando')) {
        slideAtual.classList.add('slide-produto--entrando');
    }

    document.querySelectorAll('.indicador').forEach((indicador, posicao) => {
        indicador.setAttribute('aria-current', String(posicao === indiceProdutoAtual));
    });
}

const produtoAnterior = document.getElementById('produtoAnterior');
const proximoProduto = document.getElementById('proximoProduto');
if (produtoAnterior) {
    produtoAnterior.addEventListener('click', () => mostrarProduto(indiceProdutoAtual - 1));
}
if (proximoProduto) {
    proximoProduto.addEventListener('click', () => mostrarProduto(indiceProdutoAtual + 1));
}

async function finalizarCompra() {
    const usuario = JSON.parse(localStorage.getItem('clienteLogado') || 'null');
    if (!usuario) {
        alert('Faça login antes de finalizar a compra.');
        window.location.href = '../formularios/login.html';
        return;
    }
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }
    if (!freteCalculado || !cepCalculado) {
        alert('Calcule o frete antes de finalizar a compra.');
        return;
    }
    const enderecoEntrega = document.getElementById('enderecoEntrega').value.trim();
    if (!enderecoEntrega) {
        alert('Informe o endereço completo para a entrega.');
        document.getElementById('enderecoEntrega').focus();
        return;
    }

    const resposta = await fetch('http://localhost:3000/api/compras/finalizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente_id: usuario.id,
            cep: cepCalculado,
            itens: carrinho.map((item) => ({
                id: item.id,
                quantidade: item.quantidade
            }))
        })
    });
    const resultado = await resposta.json();

    if (!resposta.ok) {
        alert(resultado.mensagem || 'Não foi possível finalizar a compra.');
        return;
    }

    sessionStorage.setItem('recycleWearUltimoPedido', JSON.stringify({
        ...resultado,
        cliente: {
            nome: usuario.nome || '',
            email: usuario.email || ''
        },
        cep: cepCalculado,
        enderecoEntrega,
        dataCompra: new Date().toISOString()
    }));
    carrinho.splice(0, carrinho.length);
    freteCalculado = false;
    cepCalculado = '';
    salvarCarrinho();
    window.location.href = 'pedido.html';
}

const botaoFinalizarCompra = document.getElementById('finalizarCompra');
if (botaoFinalizarCompra) {
    botaoFinalizarCompra.addEventListener('click', finalizarCompra);
}

atualizarCarrinho();
carregarProdutos();
