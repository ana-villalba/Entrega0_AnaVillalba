const sendprofileBtn = document.getElementById('sendprofile');
const nombre = document.getElementById('user');
const apellido = document.getElementById('surname');
const email = document.getElementById('email');
const mensajeError = document.getElementById('mensajeError');

// Agregar evento de click al botón
sendprofile.addEventListener('click', function() {
  // Validar campos obligatorios
  if (user.value.trim() === '' || surname.value.trim() === '' || email.value.trim() === '') {
    mensajeError.textContent = 'Por favor, completa todos los campos obligatorios.';
    return;
  }
  
  // Si pasa la validación, guardar en localStorage
  localStorage.setItem('user', user.value);
  localStorage.setItem('surname', surname.value);
  localStorage.setItem('email', email.value);

  localStorage.setItem('session', 'true');
   // Limpiar mensaje de error si existía
    mensajeError.textContent = '';
    alert('Datos guardados exitosamente');
    
    window.location.href = 'index.html';
  });

// Recupera el email del localStorage
document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    // Muestra el email solo si existe
    if (username) {
      email.value = username;
    } else {
      email.value = 'No se ha ingresado ningún email.';
    
    }
  })




  


