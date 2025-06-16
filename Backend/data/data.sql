USE proyecto_dh;
-- Limpiar tablas antes de insertar
DELETE FROM product_colors;
DELETE FROM products;
DELETE FROM colors;
DELETE FROM categories;
DELETE FROM users;
-- Poblar Categories
INSERT IGNORE INTO categories (name) VALUES 
  ('camisas'),
  ('remeras'),
  ('camperas'),
  ('tapados'),
  ('conjuntos');

CREATE TABLE product_colors (
  product_id INT,
  color_id INT,
  PRIMARY KEY (product_id, color_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (color_id) REFERENCES colors(id)
);
-- Poblar Colors
INSERT IGNORE INTO colors (name) VALUES 
  ('verde'),
  ('blanco'),
  ('rojo'),
  ('violeta'),
  ('multicolor'),
  ('negro'),
  ('gris'),
  ('lila'),
  ('celeste'),
  ('azul'),
  ('marrón');

-- Poblar Users
INSERT INTO Users (id, firstName, lastName, email, password, role, image) VALUES
  (1, 'Gaston', 'Suarez', 'gastonsbu1@gmial.com', '155433310lionel.', 'admin', '/images/users/gaston.jpg'),
  (2, 'Carlos', 'Pérez', 'carlos.perez@gmail.com', 'carlos5678', 'user', '/images/users/carlos.jpg'),
  (3, 'María', 'Gómez', 'maria.gomez@gmail.com', 'maria9012', 'user', '/images/users/maria.jpg'),
  (4, 'Juan', 'Rodríguez', 'juan.rodriguez@gmail.com', 'juan3456', 'user', '/images/users/juan.jpg'),
  (5, 'Sofía', 'Martínez', 'sofia.martinez@gmial.com', 'sofia7890', 'user', '/images/users/sofia.jpg'),
  (6, 'Lucía', 'Fernández', 'lucia.fernandez@gmail.com', 'lucia1234', 'admin', '/images/users/lucia.jpg'),
  (7, 'alejandro', 'suarez', 'gastonsbu@gmail.com', '$2b$10$lOCPmWOZxV.F5h0/aHKqceyvSp/i0yuJQQHb74mwuBkNNFWZqtH/S', 'user', '/images/users/user-1748578324330.jpg'),
  (8, 'nicolas', 'suarez', 'gastonsbu@gmail.com.ar', '$2b$10$wRD2YWe7Ce8Hd.jmn4lh/e3cPZRPnme3UnXfORKO4Wpsu2aNzlHI2', 'user', '/images/users/user-1748650529234.jpg');

-- Poblar Products
INSERT INTO Products (id, name, description, image, price, categoryId, stock) VALUES
  (2, 'Camisa casual verde manga corta', 'Camisa verde de manga corta, ideal para el verano.', '/images/shopp/2.jpg', 12000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (3, 'Remera liviana blanca', 'Remera básica blanca, cómoda y fresca.', '/images/shopp/3.jpg', 10000, (SELECT id FROM Categories WHERE name='remeras'), 0),
  (4, 'Remera liviana roja', 'Remera roja liviana para uso diario.', '/images/shopp/4.jpg', 10000, (SELECT id FROM Categories WHERE name='remeras'), 0),
  (5, 'Remera verde mangas cortas', 'Camisa con estampado de flores en tonos violetas.', '/images/shopp/5.jpg', 10000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (6, 'Camisa de flores manga corta', 'Camisa de flores con manga corta, fresca y elegante.', '/images/shopp/6.jpg', 15000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (7, 'Campera frizada mujer', 'Campera abrigada con interior frizado para mujer.', '/images/shopp/7.jpg', 25000, (SELECT id FROM Categories WHERE name='camperas'), 0),
  (8, 'Tapado lila mujer', 'Tapado elegante para mujer en color lila.', '/images/shopp/8.jpg', 35000, (SELECT id FROM Categories WHERE name='tapados'), 0),
  (9, 'Camisa multicolor + remera blanca', 'Conjunto de camisa multicolor y remera blanca.', '/images/shop1/n1.jpg', 38000, (SELECT id FROM Categories WHERE name='conjuntos'), 0),
  (10, 'Camisa de jean celeste', 'Camisa casual de jean color celeste.', '/images/shop1/n2.jpg', 15000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (11, 'Camisa marrón casual', 'Camisa casual color marrón para uso diario.', '/images/shop1/n3.jpg', 20000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (12, 'Camisa trabajo celeste sin cuello', 'Camisa para trabajo, color celeste sin cuello.', '/images/shop1/n4.jpg', 15000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (13, 'Camisa negra manga corta', 'Camisa negra liviana de manga corta.', '/images/shop1/n5.jpg', 15000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (14, 'Camisa gris manga larga', 'Camisa casual color gris de manga larga.', '/images/shop1/n6.jpg', 15000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (15, 'Camisa blanca sin cuello', 'Camisa blanca de estilo moderno sin cuello.', '/images/shop1/n7.jpg', 23000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (16, 'Camisa casual manga corta', 'Camisa casual de manga corta para el verano.', '/images/shop1/n8.jpg', 15000, (SELECT id FROM Categories WHERE name='camisas'), 0),
  (1748398763695, 'remera lila', 'Remera GAS comoda estilo casual de verano mangas cortas.', '/images/shopp/1.jpg', 10000, NULL, 0);