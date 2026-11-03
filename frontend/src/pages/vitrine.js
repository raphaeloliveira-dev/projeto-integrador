// Dados fixos só para validar o layout. Na Sprint 4/5 isto passa a vir da API.
const produtos = [
  { nome: 'Samambaia', desc: 'Gosta de luz indireta e solo úmido.', preco: 39.9 },
  { nome: 'Jiboia', desc: 'Resistente, ótima para iniciantes.', preco: 29.9 },
  { nome: 'Costela-de-adão', desc: 'Folhas grandes, pede meia-sombra.', preco: 89.9 },
  { nome: 'Espada-de-são-jorge', desc: 'Aguenta pouca água e pouca luz.', preco: 49.9 },
];

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const vitrine = document.getElementById('vitrine');
vitrine.innerHTML = produtos.map((p) => `
  <article class="card">
    <h2 class="card__nome">${p.nome}</h2>
    <p class="card__desc">${p.desc}</p>
    <div class="card__rodape">
      <span class="card__preco">${moeda(p.preco)}</span>
      <button class="botao botao--destaque" type="button">Adicionar ao carrinho</button>
    </div>
  </article>
`).join('');
