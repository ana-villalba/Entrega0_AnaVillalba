// Inicializar el carrito al cargar la página
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para mostrar los productos en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
displayCart();
});
function removeFromCart(productId) {
    // Filtrar el carrito para eliminar el producto
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar localStorage

    // Actualizar la visualización del carrito
    displayCart();
}
function displayCart() {
    const cartContent = document.getElementById('cart-content');
    const itemCountEl = document.getElementById('item-count');
    cartContent.innerHTML = ''; // Limpiar contenido
    updateCartCount()
    if (cart.length > 0) {
        cart.forEach(product => {
            // Mostrar la información en el HTML del carrito
            cartContent.innerHTML += `
                <div class="cart-item">
                    <img src="${product.images [0]}" alt="${product.name}" class="cart-product-image">
                    <h9>${product.name}</h9>
                    <p><strong class="product-price" id="productprice">${product.cost}</strong> ${product.currency}</p>
                    <button id="btn-decrease" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <input type="number" id="quantity-${product.id}" value="${product.quantity}" min="1" onchange="updateSubtotal()">
                    <button id="btn-increase" onclick="changeQuantity(${product.id}, 1)">+</button>
                    <button class="btn-remove" onclick="removeFromCart(${product.id})"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
        updateSubtotal(); // Actualizar el subtotal
    } else {
        cartContent.innerHTML = "<p>El carrito está vacío.</p>";
        document.querySelector('.comprar').style.display = 'none';
        itemCountEl.textContent = '0'; // Actualizar el conteo de items
    }
}
  
    function changeQuantity(productId, amount) {
        const quantityInput = document.getElementById(`quantity-${productId}`);
        let quantity = parseInt(quantityInput.value) + amount;
    
        // Asegurarse de que la cantidad no sea menor a 1
        if (quantity < 1) {
            quantity = 1;
        }
        quantityInput.value = quantity;
    
        // Actualizar el carrito y localStorage
        const productIndex = cart.findIndex(product => product.id === productId);
        cart[productIndex].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
    
        updateSubtotal(); // Actualizar el subtotal
        updateCartCount(); // Actualizar el contador del carrito
    }

// Función para actualizar el subtotal
function updateSubtotal() {
    const subtotalElement = document.getElementById('total-carrito');
    let total = 0;

    cart.forEach(product => {
        total += product.cost * product.quantity; // Calcular el total
    });

    subtotalElement.innerHTML = total.toFixed(2); // Mostrar el subtotal
}

// Función para actualizar el contador
function updateCartCount() {
    const itemCountEl = document.getElementById('item-count');
    const totalCount = cart.reduce((sum, product) => sum + product.quantity, 0); // Sumar cantidades
    itemCountEl.textContent = totalCount; // Actualizar el contador en el DOM
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
    localStorage.removeItem('cart');
    window.location.reload();
}

//Botón modo día/modo noche

const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme=localStorage.getItem('theme');

if (currentTheme ==='dark'){
  document.body.classList.add('dark-mode');
  themeToggleBtn.classList.add('dark');
}

themeToggleBtn.addEventListener('click', function(){
  document.body.classList.toggle('dark-mode');
    themeToggleBtn.classList.toggle('dark');
    let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme)
    
});
// categories.js
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCountEl = document.getElementById('item-count');
    const totalCount = cart.reduce((sum, product) => sum + product.quantity, 0); // Sumar cantidades
    itemCountEl.textContent = totalCount; // Actualizar el contador en el DOM
});
