const { validationResult } = require('express-validator');
const { Product, Category, Brand, Color, Size } = require('../database/models');

const productsController = {
  list: async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Brand, as: 'brand' },
        { model: Color, as: 'color' },
        { model: Size, as: 'size' }
      ]
    });

    res.render('products/list', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar productos');
  }
},

  create: async (req, res) => {
  try {
    const categories = await Category.findAll();
    const brands = await Brand.findAll();
    const colors = await Color.findAll();
    const sizes = await Size.findAll();

    res.render('products/create', {
      oldData: {},
      errors: {},
      categories,
      brands,
      colors,
      sizes
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar formulario');
  }
},
  store: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Reenvío las listas para que el form no falle al volver con errores
      const categories = [
        { id: 1, name: 'Remeras' },
        { id: 2, name: 'Pantalones' }
      ];
      const brands = [
        { id: 1, name: 'Nike' },
        { id: 2, name: 'Adidas' }
      ];
      const colors = [
        { id: 3, name: 'Blanco' },
        { id: 4, name: 'Negro' }
      ];
      const sizes = [
        { id: 1, name: 'S' },
        { id: 2, name: 'M' }
      ];

      return res.render('products/create', {
        errors: errors.mapped(),
        oldData: req.body,
        categories,
        brands,
        colors,
        sizes
      });
    }

    try {
      const { name, description, price, categoryId, brandId, colorId, sizeId } = req.body;

      const image = req.file ? `/images/products/${req.file.filename}` : '/images/products/default.png';

      await Product.create({
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        brandId: parseInt(brandId),
        colorId: parseInt(colorId),
        sizeId: parseInt(sizeId),
        image,
        userId: req.session.userLogged.id 
      });

      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear producto');
    }
  },

  edit: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const product = await Product.findByPk(id);


      if (!product) {
        return res.redirect('/products');
      }

      const categories = [
        { id: 1, name: 'Remeras' },
        { id: 2, name: 'Camisas' },
        { id: 3, name: 'Camperas'}
      ];
      const brands = [
        { id: 1, name: 'GAS' },
        
      ];
      const colors = [
        { id: 3, name: '' },
      
      ];
      const sizes = [
        { id: 1, name: 'S' },
        { id: 2, name: 'M' }
      ];

      res.render('products/edit', {
        product,
        categories,
        brands,
        colors,
        sizes,
        oldData: {},
        errors: {}
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar producto');
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    const id = parseInt(req.params.id);

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.redirect('/products');
      }
      console.log('Imagen del producto:', product.image);

      if (!errors.isEmpty()) {
        const categories = [
          { id: 1, name: 'Remeras' },
          { id: 2, name: 'Pantalones' }
        ];
        const brands = [
          { id: 1, name: 'GAS' }
        ];
        const colors = [
          { id: 3, name: 'Blanco' },
          { id: 4, name: 'Negro' }
        ];
        const sizes = [
          { id: 1, name: 'S' },
          { id: 2, name: 'M' }
        ];

        return res.render('products/edit', {
          product,
          categories,
          brands,
          colors,
          sizes,
          errors: errors.mapped(),
          oldData: req.body
        });
      }

      const image = req.file ? `/images/products/${req.file.filename}` : product.image;

      await product.update({
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        categoryId: parseInt(req.body.categoryId),
        brandId: parseInt(req.body.brandId),
        colorId: parseInt(req.body.colorId),
        sizeId: parseInt(req.body.sizeId),
        image
      });

      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar producto');
    }
  },

  destroy: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await Product.destroy({ where: { id } });
      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar producto');
    }
  },

  search: (req, res) => {
    // Por implementar
  },

  detail: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.redirect('/products');
      }
      res.render('products/detail', { product });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al mostrar detalle');
    }
  }
};

module.exports = productsController;