var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const users = [
    { username: 'user1@mail.com', password: 'password1'},
    { username: 'user2@mail.com', password: 'password2'}
  ]
  
const SECRET_KEY = 'secreto'

router.post('/login', function(req, res) {
    const { username, password } = req.body;  // Extrae credenciales del cuerpo de la solicitud.
    const user = users.find(u => u.username === username && u.password === password);  // Busca el usuario en la base de datos simulada.

    if (!user) {
            // Si no se encuentra el usuario o las credenciales son incorrectas, retorna un error 401.
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    // Genera un token con los datos del usuario, la clave secreta y una duración de 1 hora.
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, username });

});

module.exports = router;