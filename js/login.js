
function login(){
    //Desarrolla aquí la función del botón para la validación de datos y redirección a index.html
    // 1. Obtén los valores de los campos de entrada "username" y "password" por su ID.
    let username= document.getElementById("username").value;
    let password= document.getElementById("password").value;
    // 2. Verifica si ambos campos tienen valores. Puedes usar una condición if.
        if (username === ''|| password === '') {
            alert ('Completar todos los campos');
        } else {
            sessionStorage.setItem("session", "loggedin");
            localStorage.setItem("userlogger", username);
            localStorage.setItem("userpassword", password);
            window.location.href = "index.html";
        }
    }
