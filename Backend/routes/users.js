const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers'); 

// Rutas GET
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/profile', usersController.profile);
router.get('/edit', usersController.editProfile);

// Ruta para procesar el registro con imagen
router.post('/register', upload.single('image'), usersController.processRegister);

// (opcional) Ruta base solo para testear
router.get('/', (req, res) => {
  res.send('Ruta base de usuarios');
});
// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/users/profile'); // Si hay error, vuelve al perfil
    }
    res.clearCookie('connect.sid'); //limpiar la cookie de sesión
    res.redirect('/'); // Redirige a home u otra página después de logout
  });
});

module.exports = router;