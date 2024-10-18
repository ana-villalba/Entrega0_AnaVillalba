
let productsArray = [];

function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="product-item container-fluid" data-productId=${product.id}>
            <div class="product-image col-lg-4 col-md-5">
                <img src=" `+ product.image + ` " alt="product image" class="img-thumbnail">
            </div>
            <div class="product-details col-lg-7 col-md-6">
                <p class="product-name">`+ product.name + `<p>
                <p> ` + product.description + `</p>
                <p> Precio $: ` + product.cost + `</p>
                <p> Cantidad vendida: `+ product.soldCount + `</p>
            </div>
        </div>
        `;
    }

    document.getElementById("products-container").innerHTML = htmlContentToAppend;
}


function filterProducts(minPrice, maxPrice) {
    return productsArray.filter(product =>
        product.cost >= minPrice && product.cost <= maxPrice
    );
}

function sortProducts(array, sortBy) {
    return array.slice().sort((a, b) => {
        if (sortBy === 'price-asc') {
            return a.cost - b.cost;
        } else if (sortBy === 'price-desc') {
            return b.cost - a.cost;
        } else if (sortBy === 'relevance') {
            return b.soldCount - a.soldCount;
        }
        return 0;
    });
}

function showCategory(name) {

    document.getElementById("namecategories").innerText = name;
}
// Cargar los datos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function (e) {
    let categoria = localStorage.getItem("catID")
    getJSONData(PRODUCTS_URL + '/' + categoria + '.json').then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
            productsName = resultObj.data.catName;
            showCategory(productsName)
        }

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
    });
});

document.getElementById("filter-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    let maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;
    let filteredProducts = filterProducts(minPrice, maxPrice);
    let sortBy = document.getElementById("sort-select").value;
    let sortedProducts = sortProducts(filteredProducts, sortBy);
    
    showProductsList(sortedProducts);
});

document.getElementById("sort-select").addEventListener("change", function() {
    let minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    let maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;
    let filteredProducts = filterProducts(minPrice, maxPrice);
    let sortBy = this.value;
    let sortedProducts = sortProducts(filteredProducts, sortBy);

    showProductsList(sortedProducts);
});

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
