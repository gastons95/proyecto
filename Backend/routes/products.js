const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multerProduct');
const productValidator = require('../middlewares/validations/productValidator');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas CRUD de productos
router.get('/', productsController.list);

router.get('/create', authMiddleware, productsController.create);
router.post('/', authMiddleware, upload.single('imagen'), productValidator, productsController.store);

router.get('/:id/edit', authMiddleware, productsController.edit);
router.put('/:id', authMiddleware, upload.single('imagen'), productValidator, productsController.update);

router.delete('/:id', authMiddleware, productsController.destroy);
router.get('/search', productsController.search);

router.get('/:id', productsController.detail);
module.exports = router;