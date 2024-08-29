function login(){
    let usuario = document.getElementById("username").value;
        let contraseña = document.getElementById("password").value;
     if (usuario != "" && contraseña != "") {
    sessionStorage.setItem("sesion", true);
            localStorage.setItem ("username", usuario);
            window.location.href = "index.html";
        }
    
    else {
            alert("Deben completarse todos los campos");
        }
    
        }
    