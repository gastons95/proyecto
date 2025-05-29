const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController');

// Configuración de multer para guardar imágenes en /public/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    // Genera un nombre único para evitar que se sobrescriban archivos
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

// Rutas
router.get('/', productController.list);//mostrar listado de producto
router.get('/create', productController.create);//mostrar formulario de creacion de producto
router.post('/', upload.single('imagen'), productController.store); // metodo post
router.get('/:id/edit', productController.edit);//mostrar formulario de edicion de producto
router.put('/:id', upload.single('imagen'), productController.update); //actualizar producto
router.delete('/:id', productController.destroy);//eliminar un producto
router.get('/:id', productController.detail);//mostrar detalle de producto


module.exports = router;