const chaveUltimoPedido = 'recycleWearUltimoPedido';
const notaFiscal = document.getElementById('notaFiscal');
const pedidoIndisponivel = document.getElementById('pedidoIndisponivel');

function formatarMoeda(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function adicionarDiasUteis(dataInicial, quantidadeDias) {
    const data = new Date(dataInicial);
    let diasAdicionados = 0;

    while (diasAdicionados < quantidadeDias) {
        data.setDate(data.getDate() + 1);
        if (data.getDay() !== 0 && data.getDay() !== 6) diasAdicionados += 1;
    }

    return data;
}

function formatarData(data) {
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

function carregarPedido() {
    let pedido;
    try {
        pedido = JSON.parse(sessionStorage.getItem(chaveUltimoPedido) || 'null');
    } catch (erro) {
        console.error('Não foi possível carregar os dados do pedido.', erro);
    }

    if (!pedido || !Array.isArray(pedido.itens) || pedido.itens.length === 0) {
        pedidoIndisponivel.hidden = false;
        return;
    }

    document.getElementById('numeroNotaFiscal').textContent = pedido.notaFiscalId;
    document.getElementById('clienteNotaFiscal').textContent =
        pedido.cliente.nome || pedido.cliente.email;
    document.getElementById('dataNotaFiscal').textContent =
        new Date(pedido.dataCompra).toLocaleString('pt-BR');
    document.getElementById('cepNotaFiscal').textContent =
        `${pedido.cep.slice(0, 5)}-${pedido.cep.slice(5)}`;
    document.getElementById('enderecoNotaFiscal').textContent = pedido.enderecoEntrega;
    document.getElementById('previsaoEntregaNota').textContent =
        `${formatarData(adicionarDiasUteis(pedido.dataCompra, 5))} a ${formatarData(adicionarDiasUteis(pedido.dataCompra, 10))}`;
    document.getElementById('subtotalNotaFiscal').textContent = formatarMoeda(pedido.subtotal);
    document.getElementById('freteNotaFiscal').textContent = formatarMoeda(pedido.frete);
    document.getElementById('totalNotaFiscal').textContent = formatarMoeda(pedido.total);

    const itensNotaFiscal = document.getElementById('itensNotaFiscal');
    pedido.itens.forEach((item) => {
        const linha = document.createElement('tr');
        const valores = [
            item.nome,
            item.quantidade,
            formatarMoeda(item.preco),
            formatarMoeda(item.subtotal)
        ];

        valores.forEach((valor) => {
            const celula = document.createElement('td');
            celula.textContent = valor;
            linha.append(celula);
        });
        itensNotaFiscal.append(linha);
    });

    notaFiscal.hidden = false;
}

const botaoImprimirNota = document.getElementById('imprimirNotaFiscal');
botaoImprimirNota.addEventListener('click', () => window.print());

carregarPedido();
