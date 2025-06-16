const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUsers'); 
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userRegisterValidator = require('../middlewares/validations/userRegisterValidator');
const userLoginValidator = require('../middlewares/validations/userLoginValidator');


// Rutas accesibles solo si no está logueado
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', guestMiddleware, userLoginValidator, usersController.processLogin); // ruta de validacion
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('image'), guestMiddleware, userRegisterValidator, usersController.processRegister); // ruta de validacion


// Rutas accesibles solo si esta logueado
router.get('/profile', authMiddleware, usersController.profile);
router.get('/edit', authMiddleware, usersController.editProfile);
router.post('/edit', upload.single('image'), authMiddleware, usersController.processEdit);


// Ruta para cerrar sesión (estar logueado )
router.get('/logout', authMiddleware, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/users/profile');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Ruta base,para testeo
router.get('/', (req, res) => {
  res.send('Ruta base de usuarios');
});

module.exports = router;