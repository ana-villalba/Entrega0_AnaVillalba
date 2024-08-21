let productsArray = [];

// Función para mostrar la lista de productos
function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="product-item">
            <div class="product-image">
                <img src="` + product.image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="product-details">
                <p class="product-name">`+ product.name + `<p>
                <p>` + product.description + `</p>
                <p> $` + product.cost + `</p>
                <p>` + product.soldCount + `</p>
            </div>
        </div>
        `;
    }

    document.getElementById("products-container").innerHTML = htmlContentToAppend;
}

// Cargar los datos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    });
});