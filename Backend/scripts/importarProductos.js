const fs = require('fs');
const path = require('path');
const { Product, Category, Color } = require('../database/models');

async function importarProductos() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8');
    const productos = JSON.parse(data);

    const categorias = await Category.findAll();
    const colores = await Color.findAll();

    const mapCategorias = {};
    categorias.forEach(c => mapCategorias[c.name.toLowerCase()] = c.id);

    const mapColores = {};
    colores.forEach(c => mapColores[c.name.toLowerCase()] = c.id);

    for (const p of productos) {
      if (!p.category || !mapCategorias[p.category.toLowerCase()]) {
        console.log(`Producto "${p.name}" ignorado porque no tiene categoría válida.`);
        continue;
      }

      const categoryId = mapCategorias[p.category.toLowerCase()];

      let colorId = null;
      if (p.colors && p.colors.length > 0) {
        for (const colName of p.colors) {
          if (mapColores[colName.toLowerCase()]) {
            colorId = mapColores[colName.toLowerCase()];
            break;
          }
        }
      }

      await Product.create({
        name: p.name,
        description: p.description,
        price: p.price,
        categoryId: categoryId,
        colorId: colorId,
        image: p.image || '/images/default.png',
        userId: 1,
      });
    }

    console.log('Importación completada.');
  } catch (error) {
    console.error('Error en la importación:', error);
  }
}

importarProductos();