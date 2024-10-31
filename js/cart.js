// Función para mostrar los productos en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    const subtotalEl = document.getElementById('subtotal');
    const itemCountEl = document.getElementById('item-count');

    // Verificar si hay un producto en el localStorage
    const product = JSON.parse(localStorage.getItem('productoComprado'));

    if (product) {
        // Mostrar la información del producto
        const productName = product.name || 'Nombre no disponible';
        const productPrice = product.price;
        const currency = product.currency;
        


        // Mostrar la información en el HTML del carrito
        cartContent.innerHTML = `
            <h9>${productName}</h9>
            <p> <strong class="product-price">${productPrice}</strong></p>
            <p>${currency}</p>
            <button id="btn-decrease" onclick="changeQuantity(-1)">-</button>
            <input type="number" id="quantity" value="1" min="1" onchange="updateSubtotal()">
            <button id="btn-increase" onclick="changeQuantity(1)">+</button>
            
        `;
        updateSubtotal(); // Actualizar el subtotal al cargar
    } else {
        cartContent.innerHTML = "<p>El carrito está vacío.</p>";
        document.querySelector('.comprar').style.display = 'none';
        itemCountEl.textContent = '0'; // Actualizar el conteo de items
    }
});

// Función para cambiar la cantidad
function changeQuantity(amount) {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value) + amount;

    // Asegurarse de que la cantidad no sea menor a 1
    if (quantity < 1) {
        quantity = 1;
    }
    quantityInput.value = quantity;

    updateSubtotal(); // Actualizar el subtotal
    updateDecreaseButtonState(); // Actualizar el estado del botón de decrecimiento
}

// Función para actualizar el subtotal
function updateSubtotal() {
    const quantityInput = document.getElementById('quantity');
    const productPrice = parseFloat(document.querySelector('.product-price').textContent);
    const quantity = parseInt(quantityInput.value);
    
    const subtotal = productPrice * quantity;
    document.getElementById('total-carrito')
}

// Función para actualizar el estado del botón de decrecimiento
function updateDecreaseButtonState() {
    const quantityInput = document.getElementById('quantity');
    const btnDecrease = document.getElementById('btn-decrease');
    const quantity = parseInt(quantityInput.value);
    
    btnDecrease.disabled = quantity <= 1; // Deshabilitar el botón si la cantidad es 1
}

// Función para manejar la compra
function comprar() {
    alert("Compra realizada!");
    localStorage.removeItem('productoComprado');
    window.location.reload();
}