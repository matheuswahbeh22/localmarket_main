let cart = [];

const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartIconBtn = document.getElementById('cart-icon-btn');
const closeModal = document.getElementById('close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalValue = document.getElementById('cart-total-value');

const stepCart = document.getElementById('step-cart');
const stepPayment = document.getElementById('step-payment');
const nextToPaymentBtn = document.getElementById('next-to-payment-btn');
const backToCartBtn = document.getElementById('back-to-cart-btn');
const paymentForm = document.getElementById('payment-form');

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        addItemToCart(id, name, price);
    });
});

function addItemToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItemsList.innerHTML = '';
    let totalMoney = 0;

    cart.forEach(item => {
        totalMoney += item.price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
        `;
        cartItemsList.appendChild(itemRow);
    });

    cartTotalValue.textContent = `R$ ${totalMoney.toFixed(2).replace('.', ',')}`;
}

cartIconBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    stepCart.classList.remove('hidden');
    stepPayment.classList.add('hidden');
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

nextToPaymentBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    stepCart.classList.add('hidden');
    stepPayment.classList.remove('hidden');
});

backToCartBtn.addEventListener('click', () => {
    stepPayment.classList.add('hidden');
    stepCart.classList.remove('hidden');
});

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    alert(`Compra realizada com sucesso usando: ${selectedMethod.toUpperCase()}!`);
    
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
});