document.addEventListener("DOMContentLoaded", function() {
  let producto = localStorage.getItem("selectedProductId");
  const token = localStorage.getItem("token");

  if (producto) {
    // Cambia esta URL por la de hoost300 o la que estés utilizando
    const url = `http://localhost:3000/products_comments/${producto}`; // Asegúrate de que esta URL sea correcta

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Asegúrate de que data tenga la estructura correcta para ShowComments
      ShowComments(data); // Llama a la función para mostrar los comentarios
      commentsData = data; // Guardar los comentarios en la variable global
    })
    .catch(error => {
      console.error('Error al obtener los comentarios:', error);
      alert('Hubo un problema al cargar los comentarios. Intenta de nuevo más tarde.'); // Mensaje de error al usuario
    });
  } else {
    alert("No se ha seleccionado ningún producto.");
  }
});


let comments =[];  
// Función para mostrar comentarios
function ShowComments(comments) {
  const CommentsList = document.getElementById('ProductsComments');
  CommentsList.innerHTML = ''; 
  comments.forEach(comentario => { 
    const listaItem = document.createElement('p');
    listaItem.innerHTML = 
        `
        ${comentario.user}
        <br>
        <span>${comentario.score} <i class="fa-solid fa-star"></i></span>
        ${comentario.dateTime}
        <br>
        ${comentario.description}
        <br>
        <strong><i class="fa-regular fa-thumbs-up"></i> Me gusta</strong> 
    `

    ;

    CommentsList.appendChild(listaItem); 
  });
}

// Función para cargar las imágenes en el carrusel
function loadCarouselImages(images) {
  const carouselInner = document.getElementById('carousel-inner');

  // Limpiar el contenido actual del carrusel
  carouselInner.innerHTML = '';

  // Iterar sobre las imágenes y agregar los elementos al carrusel
  images.forEach((image, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active'); // Marcar la primera imagen como activa

    }

    const imgElement = document.createElement('img');
    imgElement.src = image; 
    imgElement.classList.add('d-block', 'w-100');
    imgElement.alt = `Imagen ${index + 1}`;
    carouselItem.appendChild(imgElement);

    // Agregar el item al carrusel
    carouselInner.appendChild(carouselItem);
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

      // Mostrar la información en el HTML
      document.querySelector('#product-name').textContent = productName;
      document.querySelector('#product-cost').textContent = `Precio: $${productCost}`;
      document.querySelector('#soldCount').textContent = `Cantidad vendidos: ${soldCount}`;
      document.querySelector('#currency').textContent = `Moneda: ${currency}`;
      document.querySelector('#product-description').textContent = productDescription;

       // Cargar imágenes en el carrusel
       if (data.images && data.images.length > 0) {
        loadCarouselImages(data.images); // Llamar a la función para cargar las imágenes
      } else {
        console.log('No hay imágenes disponibles');
      }

      // Cargar productos relacionados
      if (data.relatedProducts) {
        setRelatedProducts(data.relatedProducts);
      }

// Funcionalidad boton comprar
// Seleccionamos el botón "Comprar" por su id
const comprarButton = document.getElementById('comprar');

comprarButton.addEventListener('click', () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verificar si el producto ya está en el carrito
  const existingProductIndex = cart.findIndex(product => product.id === data.id);

  if (existingProductIndex !== -1) {
      // Si el producto ya existe, incrementa la cantidad
      cart[existingProductIndex].quantity += 1;
  } else {
      // Si el producto no existe, añádelo como nuevo con cantidad 1
      const newProduct = { ...data, quantity: 1 };
      cart.push(newProduct);
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Redirigir al carrito
  window.location.href = 'cart.html';
});

    })
    .catch((error) => console.error('Error:', error));
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  let productId = localStorage.getItem("selectedProductId");
  if (productId) {
        // 1. Cambiar por localhost:3000 o usar getJSONData
    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    getProductData(url); 
  } else {
    alert("No se ha seleccionado ningún producto.");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById('submit-comment');
  let scoreValue= 0; 

  // Maneja el evento de clic para las estrellas
  const stars = document.querySelectorAll('.star'); 
  stars.forEach(star => {
      star.addEventListener('click', () => {
          scoreValue = parseInt(star.getAttribute('data-value')); // Obtiene el valor de la estrella clicada
          updateStars(); 
          console.log('Calificación seleccionada:', scoreValue); // Muestra la calificación seleccionada
      });
  });

  // Función para actualizar las estrellas seleccionadas
  function updateStars() {
      stars.forEach(star => {
          star.classList.remove('selected'); // Limpia todas las selecciones
          if (parseInt(star.getAttribute('data-value')) <= scoreValue) {
              star.classList.add('selected'); // Marca las estrellas hasta la seleccionada
          }
      });
  }

  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      const comentarioInput = document.getElementById('ComentarioInput').value;

      // Comprobar si no se ha seleccionado ninguna calificación
      if (scoreValue === 0) {
        alert("Por favor, selecciona una calificación antes de enviar tu comentario.");
        return; // Salir de la función si no se seleccionó ninguna calificación
    }
      // Recuperar el nombre del usuario desde el local storage
      const username = localStorage.getItem('username')
      // crear nuevo comentario 
      const newComment = { 
        description: comentarioInput,
        user:  username,
        dateTime: new Date().toISOString().split('T')[0],
        score : scoreValue,  // Obtener la calificación seleccionada por el usuario (de 1 a 5)  
        
      };

       
       commentsData.push(newComment);
       ShowComments(commentsData)
       console.log (newComment)

      // Limpiar los campos del formulario
      document.getElementById('ComentarioInput').value = '';
    });
  } else {
    console.error("Error en el envío del comentario");
  }
});

// Función para mostrar los productos relacionados y agregar el evento de clic
function setRelatedProducts(relatedProducts) {
  const relatedProductsContainer = document.getElementById('related-products-container');
  relatedProductsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

  relatedProducts.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('related-product');

    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="related-product-image">
      <p class="related-product-name">${product.name}</p>
    `;

    // Añadir evento de clic para redirigir al producto relacionado
    productItem.addEventListener('click', () => {
      // Guardar el ID del producto relacionado en el localStorage
      localStorage.setItem('selectedProductId', product.id);

      // Redirigir a la página del producto (product-info.html)
      window.location.href = 'product-info.html';
    });

    relatedProductsContainer.appendChild(productItem);
  });
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