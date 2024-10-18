function login() {
            const usuario = document.getElementById("username").value;
            const contraseña = document.getElementById("password").value;
        
            // Validar campos obligatorios
            if (!usuario || !contraseña) {
                alert("Deben completarse todos los campos");
                return;
            }
        
            // Expresión regular para validar el formato del email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
            // Validar el formato del email
            if (!emailRegex.test(usuario)) {
                alert("Por favor, ingrese un email válido.");
                return;
            }
        
            // Guardar el estado de usuario logueado y el email 
            sessionStorage.setItem("sesion", true);
            localStorage.setItem("username", usuario);
        
            // Redireccionar al perfil o a otra página que desees
            window.location.href = "index.html";
        }
        