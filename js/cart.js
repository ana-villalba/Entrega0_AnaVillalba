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
    updateSubtotal();

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
                    <img src="${product.images[0]}" alt="${product.name}" class="cart-product-image">
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
        document.querySelector('.button-cart').style.display = 'none';
        itemCountEl.textContent = '0'; // Actualizar el conteo de items
    }
}
function displayTipoDeEnvio() {
    const cartContent = document.getElementById('cart-content');
    const itemCountEl = document.getElementById('item-count');
    const continuarBtn = document.getElementById('cart-btn-next'); 
    cartContent.innerHTML = ''; // Limpiar contenido
    updateCartCount()
    if (cart.length > 0) {
        cart.forEach(product => {
            // Mostrar la información en el HTML del carrito
            if (!document.getElementById('shippingForm')) {
                cartContent.innerHTML = ''; // Limpiar contenido antes de insertar el formulario
        
            cartContent.innerHTML += `
                <div>
                <strong>Datos de envio</strong>
                <br>
                <br>

                <div style="display:flex;">
         <div class="form-container" >
        <form id="shippingForm">
            <div class="form-group">
               <div class="form-container">
            <div class="form-group" style="display: flex;">
                <label for="select" style="min-width:200px;">Tipo de Envío</label>
                <select id="selectTipoDeEnvio" name="select">
                    <!-- Opción predeterminada no seleccionable -->
                    <option value="" disabled selected>Selecciona el tipo de envío</option>
                    <option value="premium">Premium 2 a 5 días (15%)</option>
                    <option value="express">Express 5 a 8 días (7%)</option>
                    <option value="standard">Standard 12 a 15 días (5%)</option>
                </select>
            </div>
            <br>
        <div style="display:flex;">
            <span style="min-width:200px;">Dirección de envío:</span>
            <div class="input-cars mb-3">
                <input type="text" id="user" name="direccion"  placeholder="Departamento" autocomplete="on" required>
            </div>
        </div>
            <div class="input-cars mb-3" style="padding-left: 200px;">
                <input type="text" id="user" name="localidad"  placeholder="Localidad" autocomplete="on" required>
            </div>
            <div class="input-cars mb-3" style="padding-left: 200px;">
                <input type="text" id="user" name="Calle"  placeholder="Calle" autocomplete="on" required>
            </div>
            <div class="input-cars mb-3" style="padding-left: 200px;">
                <input type="text" id="user" name="Número"  placeholder="Número" autocomplete="on" required>
            </div>
            <div class="input-cars mb-3" style="padding-left: 200px;">
                <input type="text" id="user" name="Esquina"  placeholder="Esquina" autocomplete="on" required>
            </div>
        </div>
        
        <strong>Medios de pago</strong>
              <br><br>
              <div class="form-group">
               <div class="form-container">
          <div class="form-group" style="display: flex; flex-direction: column;">
              <label for="selectMetodoPago" style="margin-bottom: 10px;">Elige la forma de pago:</label>
              <select id="selectMetodoPago" name="select" onchange="mostrarCamposPago()" style="padding: 8px; border-radius: 5px;">
                <option value="" disabled selected>Selecciona el método de pago</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="transferencia">Transferencia bancaria</option>
            </select>
        </div>

              <!-- Contenedor para los datos de pago -->
              <div id="camposPago" style="margin-top: 20px;"></div>
              </div>
                </div>



   
                </div>

            `;
            
        }});
        
        if (document.getElementById('shippingForm')) {
            continuarBtn.style.display = 'none';
        }


// Función para calcular costos
function calcularCostos() {
    // Obtener el subtotal y el porcentaje de envío seleccionado
    const subtotal = parseFloat(document.getElementById('subtotal').innerText);
    const porcentajeEnvio = parseFloat(document.getElementById('shippingType').value);

    // Verificar que se haya seleccionado un tipo de envío
    if (isNaN(porcentajeEnvio)) {
        document.getElementById('costoEnvio').innerText = '0';
        document.getElementById('total').innerText = subtotal.toFixed(2);
        return;
    }

    // Calcular el costo de envío y el total
    const costoEnvio = subtotal * porcentajeEnvio;
    const total = subtotal + costoEnvio;

    // Actualizar los valores en la página
    document.getElementById('costoEnvio').innerText = costoEnvio.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}
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
    var toastElement = document.getElementById('toast');
        var toast = new bootstrap.Toast(toastElement);
        toast.show(); // Mostrar el toast


    localStorage.removeItem('cart');
       // Esperar antes de recargar
       setTimeout(() => {
        window.location.reload();
    }, 3500); 

}
    

function elegirEnvio() {
    displayTipoDeEnvio()

}

function finalizarCompra() {
    // Validar dirección
    const direccion = document.querySelector('input[name="direccion"]').value;
    const localidad = document.querySelector('input[name="localidad"]').value;
    const calle = document.querySelector('input[name="Calle"]').value;
    const numero = document.querySelector('input[name="Número"]').value;
    const esquina = document.querySelector('input[name="Esquina"]').value;

    if (!direccion || !localidad || !calle || !numero || !esquina) {
        alert("Por favor, complete todos los campos de la dirección.");
        return;
    }

    // Validar forma de envío
    const envioSeleccionado = document.getElementById('selectTipoDeEnvio').value;
    if (!envioSeleccionado) {
        alert("Por favor, seleccione una forma de envío.");
        return;
    }

    // Validar forma de pago
    const formaPagoSeleccionada = document.getElementById('selectMetodoPago').value;
    if (!formaPagoSeleccionada) {
        alert("Por favor, seleccione una forma de pago.");
        return;
    }

    
    // Si todas las validaciones se cumplen, llamamos a la función comprar()
    comprar();
}

//Botón modo día/modo noche

const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.classList.add('dark');
}

themeToggleBtn.addEventListener('click', function () {
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


function mostrarCamposPago() {
    const metodoPago = document.getElementById('selectMetodoPago').value;
    const camposPago = document.getElementById('camposPago');
    camposPago.innerHTML = ''; // Limpiar campos previos

    if (metodoPago === 'debito' || metodoPago === 'credito') {
        camposPago.innerHTML = `
            <label for="nombreTitular">Nombre del titular:</label>
            <input type="text" id="nombreTitular" placeholder="Nombre completo" style="padding: 8px; margin-bottom: 10px; width: 100%;" required>

            <label for="numeroTarjeta">Número de tarjeta:</label>
            <input type="text" id="numeroTarjeta" placeholder="1234 5678 9012 3456" maxlength="19" style="padding: 8px; margin-bottom: 10px; width: 100%;" required>

            <div style="display: flex; gap: 10px;">
                <div>
                    <label for="fechaExpiracion">Fecha de expiración:</label>
                    <input type="text" id="fechaExpiracion" placeholder="MM/AA" maxlength="5" style="padding: 8px; width: 100%;" required>
                </div>
                <div>
                    <label for="codigoSeguridad">CVV:</label>
                    <input type="text" id="codigoSeguridad" placeholder="123" maxlength="3" style="padding: 8px; width: 100%;" required>
                </div>
            </div>
        `;
    } else if (metodoPago === 'transferencia') {
        camposPago.innerHTML = `
            <label for="banco">Banco:</label>
            <input type="text" id="banco" placeholder="Nombre del banco" style="padding: 8px; margin-bottom: 10px; width: 100%;" required>

            <label for="numeroCuenta">Número de cuenta:</label>
            <input type="text" id="numeroCuenta" placeholder="123456789" style="padding: 8px; margin-bottom: 10px; width: 100%;" required>
        `;
    }
}
