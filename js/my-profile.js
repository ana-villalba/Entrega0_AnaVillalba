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

  const inputImagen = document.getElementById("inputImagen");
  const imagenPerfil = document.getElementById("imagenPerfil");
  const buttonEditarPerfil = document.getElementById("buttonEditarPerfil")

  //Para darle al button de editar la foto de perfil la funcionalidad del input, ya que al input no se le puede modificar el texto que contiene y no queda bien esteticamente
buttonEditarPerfil.addEventListener('click',function(){
inputImagen.click();
});

  inputImagen.addEventListener('change', function(event){
    const archivo = event.target.files[0]; //para obtener el archivo seleccionado

  if(archivo){
const reader = new FileReader();
reader.onload = function(e) {
  imagenPerfil.src= e.target.result; //se asigna el src de la imagen
  localStorage.setItem('imgPerfil', e.target.result) //guarda la imagen en localStorage
  };
  reader.readAsDataURL(archivo) //Se lee la imagen como URL
    }
  });


//Al acceder a la pagina se carga la imagen ya guardada en localStorage
  window.onload = function(){
    const imagenGuardada = localStorage.getItem('imgPerfil');
    if(imagenGuardada){
      imagenPerfil.src = imagenGuardada; //Se muestra la imagen cargada
    };
  };




  


