function login() {
    // Suponiendo que la autenticación es exitosa
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'idex.html';  // Redirige a la portada
}

window.onload = function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';  // Redirige al login
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';  // Redirige al login después de cerrar sesión
}