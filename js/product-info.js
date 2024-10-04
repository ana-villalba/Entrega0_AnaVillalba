document.addEventListener("DOMContentLoaded", function() {
  let producto = localStorage.getItem("selectedProductId");

  if (producto) {
    const url = PRODUCT_INFO_COMMENTS_URL+ producto + '.json'
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        ShowComments(data); // Show the stored comments
      })
      .catch(error => console.error('Error al obtener los comentarios:', error));
  } else {
    alert("No se ha seleccionado ningún producto.");
  }
});

function ShowComments(comments) {
  const CommentsList = document.getElementById('ProductsComments');
  CommentsList.innerHTML = ''; 
  comments.forEach(comentario => { 
    const listaItem = document.createElement('li');
    listaItem.innerHTML = 
        `<i class="fa-solid fa-user"></i>
        <strong>${comentario.product}:</strong> 
        ${comentario.description} 
        ${comentario.user} 
        ${comentario.dateTime} 
        <span>${comentario.score} <i class="fa-solid fa-star"></i></span>
    `;

    CommentsList.appendChild(listaItem); 
  });
}



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
          // Cargar productos relacionados
          if (data.relatedProducts) {
            setRelatedProducts(data.relatedProducts);
          }
    })
    .catch((error) => console.error('Error:', error)); // Captura errores de la solicitud
}

// Ejecutar cuando la página esté cargada
document.addEventListener("DOMContentLoaded", function() {
  // Recuperar el identificador del producto desde localStorage
  let productId = localStorage.getItem("selectedProductId");

  if (productId) {
    // Construir la URL con el ID del producto
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    getProductData(url);
  } else {
    alert("No se ha seleccionado ningún producto.");
  }
});

function setRelatedProducts(relatedProducts) {
  relatedProducts.forEach((product, index) => {
    if (index < 2) {  
      const productName = product.name || 'Nombre no disponible';
      const productImage = product.image || 'default.jpg'; 

      document.querySelector(`#related-product-name-${index + 1}`).textContent = productName;
      document.querySelector(`#related-product-image-${index + 1}`).src = productImage;
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  let productId = localStorage.getItem("selectedProductId");

  if (productId) {
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    setRelatedProducts(url);
  } else {
    alert("No se ha seleccionado ningún producto.");
  }
});



