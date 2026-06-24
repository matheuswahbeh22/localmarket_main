const containerCarrinho = document.getElementById('itens-carrinho');
const totalElemento = document.getElementById('valor-total');
const btnFinalizar = document.getElementById('btn-finalizar');

function renderizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    containerCarrinho.innerHTML = '';
    let totalGeral = 0;

    if (carrinho.length === 0) {
        containerCarrinho.innerHTML = '<p>O seu carrinho está vazio.</p>';
        totalElemento.textContent = '0.00';
        return;
    }

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const div = document.createElement('div');
        div.className = 'item-no-carrinho';
        div.innerHTML = `
            <p><strong>${item.nome}</strong> - Qtd: ${item.quantidade}</p>
            <p>Preço Un: R$ ${item.preco.toFixed(2)} | Subtotal: R$ ${subtotal.toFixed(2)}</p>
            <hr>
        `;
        containerCarrinho.appendChild(div);
    });

    totalElemento.textContent = totalGeral.toFixed(2);
}

btnFinalizar.addEventListener('click', () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        alert('Adicione itens antes de finalizar a venda.');
        return;
    }

    let comprovante = `=== COMPROVANTE DE VENDA ===\n`;
    let total = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        comprovante += `${item.nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)}\n`;
    });
    
    comprovante += `============================\n`;
    comprovante += `TOTAL DA COMPRA: R$ ${total.toFixed(2)}\n`;
    comprovante += `Data: ${new Date().toLocaleDateString('pt-BR')}`;

    alert(comprovante);
    console.log(comprovante);

    localStorage.removeItem('carrinho');
    renderizarCarrinho();
});

renderizarCarrinho();
