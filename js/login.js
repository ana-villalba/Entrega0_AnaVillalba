//desafiate
function login(){
    //Desarrolla aquí la función del botón para la validación de datos y redirección a index.html
function validacion() {if (username.value==="")
    alert ("Ingrese su nombre de usuario")
}
function validacion() {if (password.value==="")
    alert ("Ingrese su contraseña")
}
    // 1. Obtén los valores de los campos de entrada "username" y "password" por su ID.
    let username= document.getElementById("username");
    let password= document.getElementById("password");
    // 2. Verifica si ambos campos tienen valores. Puedes usar una condición if.
        if (username === ''|| password === '') {
            alert ('Completar todos los campos');
        } else {
            sessionStorage.setItem("session", "loggedin");
            localStorage.setItem("userlogger", username);
            window.location.href = "index.html";
        }
    }