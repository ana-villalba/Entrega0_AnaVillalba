document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

    document.addEventListener("DOMContentLoaded", function() {
    var username= localStorage.getItem("username");
    if (username) {
        document.getElementById("username-display").textContent = `Hola, ${username}`;
        var loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.textContent = 'Cerrar sesión';
            loginLink.href = "login.html";
        }
    }    else {
        document.getElementById("username-display").textContent = 'Invitado';
    }
    if (!sessionStorage.getItem('sesion')){
        window.location.href = "login.html";
    }
    });