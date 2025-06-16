const db = require('../../database/models');

module.exports = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: ['category']
      });

      // Contar productos por categoría
      const countByCategory = {};
      products.forEach(product => {
        const categoryName = product.category?.name || 'Sin categoría';
        countByCategory[categoryName] = (countByCategory[categoryName] || 0) + 1;
      });

      const response = {
        count: products.length,
        countByCategory,
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category?.name || 'Sin categoría',
          detail: `/api/products/${product.id}`
        }))
      };

      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: ['category', 'color', 'size']
      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const productDetail = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?.name || 'Sin categoría',
        color: product.color?.name || 'Sin color',
        size: product.size?.name || 'Sin talle',
        image: `${req.protocol}://${req.get('host')}/products/${product.image}`
      };

      return res.json(productDetail);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};