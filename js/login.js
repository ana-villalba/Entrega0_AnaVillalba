function login() {
    // 1. Obtén los valores de los campos de entrada "username" y "password" por su ID.
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // 2. Verifica si ambos campos tienen valores.
    if (username === '' || password === '') {
        alert('Completar todos los campos');
    } else {
        // 3. Guarda los datos en sessionStorage y localStorage.
        sessionStorage.setItem("session", "loggedin");
        localStorage.setItem("userlogger", username); // Guarda el nombre de usuario
        localStorage.setItem("userpassword", password); // Guarda la contraseña (no recomendable por seguridad)

        // 4. Redirige a index.html
        window.location.href = "index.html";
    }
}
