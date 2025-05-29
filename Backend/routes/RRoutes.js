const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usersController = require('../controllers/usersController');
const productController = require('../controllers/productoController');

router.get('/', homeController.home);
router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/productos', productController.producto);
router.get('/productos/:id', productController.productDetail);
router.get('/carrito', productController.productCart);

module.exports = router;