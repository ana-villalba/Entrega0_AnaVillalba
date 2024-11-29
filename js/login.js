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

            // Llamo al endpoint de /login para obtener el token
            fetch("http://localhost:3000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: usuario, password: contraseña })
            })
            .then(data => data.json())
            .then(result => {
                // Guardar el token que devuelve el endpoint
                sessionStorage.setItem("sesion", true);
                localStorage.setItem("username", result.username);
                localStorage.setItem("token", result.token);
                
                // Redireccionar al perfil o a otra página que desees
                window.location.href = "index.html";
            })

        }
        