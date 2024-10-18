// Recuperar el nombre de usuario del localStorage al cargar la página
const username = localStorage.getItem("username");

document.addEventListener("DOMContentLoaded", function() {
  const sesionActiva = sessionStorage.getItem("sesion");

  if (sesionActiva) {
    // Mostrar el nombre de usuario si hay una sesión activa -LO SACAMOS SI YA ESTA REPETIDO
    if (username) {
      document.getElementById("username-display").textContent = username;
    }
  } else {
    window.location.href = "login.html";
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  sessionStorage.removeItem("sesion");
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
    

