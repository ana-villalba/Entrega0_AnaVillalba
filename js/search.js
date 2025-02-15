document.addEventListener("DOMContentLoaded", function() {
    // Obtener los productos desde el localStorage
    const catID = localStorage.getItem("catID");
    const productsContainer = document.getElementById("products-container");
 
    // Función para mostrar los productos en la página
    function displayProducts(products) {
        productsContainer.innerHTML = ""; // Limpiar el contenedor
        products.forEach(product => {
            const productItem = `
                <div class="product-item card mb-3" data-productId=${product.id}>
                    <div class="row g-0">
                        <div class="product-image col-lg-4 col-md-5">
                            <img src="${product.image}" class="img-thumbnail" alt="${product.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Precio:</strong> $${product.cost}</p>
                                <p class="card-text"><strong>Cantidad vendida:</strong> ${product.soldCount}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            productsContainer.innerHTML += productItem;
        });
    }

    // Obtener productos de la API
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/cats_products/${catID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
            let products = data.products;



            
            // Mostrar todos los productos inicialmente
            displayProducts(products);

            // Función para aplicar los filtros
            function applyFilters() {
                const searchText = document.getElementById("searchInput").value.toLowerCase();

                // Filtrar por texto de búsqueda (en nombre o descripción)
                let filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchText) || 
                    product.description.toLowerCase().includes(searchText)
                );

                // Mostrar los productos filtrados
                displayProducts(filteredProducts);
            }

            // Agregar eventos para filtrar en tiempo real 
            document.getElementById("searchInput").addEventListener("input", applyFilters);

             // Selecciona todos los productos
               const productos = document.querySelectorAll(".product-item");
        
                // let categoria = localStorage.getItem("productId")
                // Agrega un evento 'click' a cada producto
                productos.forEach(producto => {
                    producto.addEventListener("click", () => {
                        const productId = producto.getAttribute("data-productId");
                        
                        // Guarda el ID del producto en el localStorage
                        localStorage.setItem("selectedProductId", productId);
                        
                        // Redirige a la página de información del producto
                        window.location.href = "product-info.html";
                    });
                });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
});

// categories.js
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCountEl = document.getElementById('item-count');
    const totalCount = cart.reduce((sum, product) => sum + product.quantity, 0); // Sumar cantidades
    itemCountEl.textContent = totalCount; // Actualizar el contador en el DOM
});