const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

function readProducts() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeProducts(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  list: (req, res) => {
    const products = readProducts();
    res.render('products/list', { products });
  },

  detail: (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('products/detail', { product });
  },

  create: (req, res) => {
    res.render('products/create');
  },

  store: (req, res) => {
    const products = readProducts();

    const newProduct = {
      id: Date.now(),
      nombre: req.body.name,
      descripcion: req.body.description,
      imagen: req.file ? req.file.filename : '', // toma imagen subida
      precio: parseFloat(req.body.precio)
    };

    products.push(newProduct);
    writeProducts(products);

    res.redirect('/products');
  },

  edit: (req, res) => {
    const id = Number(req.params.id);
    const products = readProducts();
    const product = products.find(p => p.id === id);

    if (!product) return res.status(404).send('Producto no encontrado');

    res.render('products/edit', { product });
  },

  update: (req, res) => {
    const id = Number(req.params.id);
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return res.status(404).send('Producto no encontrado');
    }

    // Imagen nueva si se subió, o se mantiene la actual
    const nuevaImagen = req.file ? req.file.filename : req.body.imagenActual;

    products[productIndex] = {
      ...products[productIndex],
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: nuevaImagen,
      precio: parseFloat(req.body.precio)
    };

    writeProducts(products);
    res.redirect('/products');
  },
  destroy: (req, res) => {
  const id = Number(req.params.id);
  let products = readProducts();

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).send('Producto no encontrado');
  }

  products.splice(productIndex, 1);
  writeProducts(products);

  res.redirect('/products');
}
};