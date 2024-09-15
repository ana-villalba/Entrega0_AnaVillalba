// Función para obtener los datos del producto de la API
function getProductData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Asignación de los valores recibidos de la API
      const productName = data.name || 'Nombre no disponible';
      const productCost = data.cost || 'Precio no disponible';
      const soldCount = data.soldCount || '0';
      const currency = data.currency || 'Moneda no disponible';
      const productDescription = data.description || 'Descripción no disponible';
      const productImage = data.images[0] || 'default.jpg'; // Si no hay imagen, usa una por defecto

      // Mostrar la información en el HTML
      document.querySelector('#product-name').textContent = productName;
      document.querySelector('#product-cost').textContent = `Precio: $${productCost}`;
      document.querySelector('#soldCount').textContent = `Cantidad vendidos: ${soldCount}`;
      document.querySelector('#currency').textContent = `Moneda: ${currency}`;
      document.querySelector('#product-image').src = productImage;
      document.querySelector('#product-description').textContent = productDescription;
    })
    .catch((error) => console.error('Error:', error)); // Captura errores de la solicitud
}

// Ejecutar cuando la página esté cargada
document.addEventListener("DOMContentLoaded", function() {
  // Recuperar el identificador del producto desde localStorage
  let productId = localStorage.getItem("productId");

  if (productId) {
    // Construir la URL con el ID del producto
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    getProductData(url);
  } else {
    alert("No se ha seleccionado ningún producto.");
  }
});
