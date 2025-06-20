*1 Sprint

este srpint me hizo darme cuenta que tengo mucho que aprender en progamacion, tanto en diseño como en el boceto, lo bueno esque pude superarme al entender mejor como se usa el html y el css juntamente para dar lugar a una pagina linda a la vista 
y que sea responsiba.

*2 Sprint

el hacer el tablero de trabajo con trello no le encontraba sentido, pero vi que es una erramienta super funcional, ya que me di cuenta que perdi mucho tiempo en este  sprint dandolde mucho css y a lo mejor no es lo mas importante
tambien pude acordarme de por que no me funcionaba node.js en la pc, por que tenia que usar mas la terminal de la pc ,mas que la del visual studio code,  me alegro mucho el saber que ahora pude aprender a usarlo y que me funcione en el visual studio
y pude aprender en la practica lo vital que es node.js + express en el desarrollo
se me hize eterno este srpint por que perdi mucho tiempo en el html y css.

*3 Sprint

Me gusto mucho saber que node.js se puede renderizar archivos html en el backend pasandolos a EJS
y estableciendo rutas y controladores, me demoro mucho tiempo hacer que mis vistas se puedan ver en el navegador, pero pude lograrlo, estuvo bueno el reutilizar el codigo repetitivo como footer, header,head
me demoro mucho tiempo hacer que se vea la pagina de Detalle de producto, 
fue un sprint muy enriqucedor en conocimiento sobre node.js solo me hubiese gustasdo que no me hubiese demorado mucho.

*4 Sprint
Aprendi mucho sobre como funcioan las rutas y la base de datos con los controladores
es increible como la pagina va tomando forma y funcionalidad
es increible como se puede crear archivos funcionales desde la parte del backend gracias a node.js y EJS
fue muy entretenido crear una base de datos JSON 
lo malo esque me demoro mucho en cada sprint, voy a mejorar en eso lo mas que pueda asi entrego el trabajo en tiempo

*5 Sprint

en este sprint aprendi mucho sobre los usuarios y  middlewares
un login seguro y sencillo
al igual un registro seguro y sencillo y que se conecte con la base de datos de parte del usuario
editar el perfil tambien estuvo fenomenal
a este sprint lo hice mas rapido que los demas ya que es bastante parecido al  sprint anterior 
pero con el usuario y el registro

*6 Sprint
en este sprint pude aprender mas sobre como funciona una base de datos, y sus tablas, que la base de datos tiene una contraseña en MySQL y SEQUELIZE con ORM
la creacion de las tablas y la base de datos fue genial
tambien se tenia que modificar el EJS para que pueda adaptarse a sequelize
tuve muchos errores con los nombres de los productos y de la base de datos, lo pude resolver, de todas maneras este sprint fue mucho mas rapido que los demas
guarde los archivos pdf en trello

*Sprint 7
en este sprint se me hizo un poco mas rapido que los demas, pero si me costo la cuestion de validar desde el backend
apesar de que algunos puntos se unian con otros y se hacia mas rapido fue muy confortante saber que funciona
y saber que se puede validar por el frontend es increible aunq no sea muy efectivo 
validar desde el backen es una muy buena experiencia
todos los productos y el login, el registro de usuario 

*Sprint 8
me parecio increible React para el frontend
y como la api del fron se conecta a la app del backend
el dashboard con todos los datos de usuarios y productos es excelente 
la verdad se que tengo mucho que mejorar, pero el haber podido haber echo todo este recorrido fue genial
en la correcion del proyecto 
tuve que alinear la tabla de la base de datos con el modelo que hice 

ademas tengo que pegar esta estructura 
CREATE DATABASE IF NOT EXISTS proyecto_dh;
USE proyecto_dh;

-- Tabla: Users
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  role ENUM('admin', 'user') DEFAULT 'user',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: Categories
CREATE TABLE IF NOT EXISTS Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: Brands
CREATE TABLE IF NOT EXISTS Brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: Colors
CREATE TABLE IF NOT EXISTS Colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: Sizes
CREATE TABLE IF NOT EXISTS Sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: Products
CREATE TABLE IF NOT EXISTS Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  stock INT NOT NULL DEFAULT 0,
  userId INT NOT NULL,
  categoryId INT,
  brandId INT,
  colorId INT,
  sizeId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE SET NULL,
  FOREIGN KEY (brandId) REFERENCES Brands(id) ON DELETE SET NULL,
  FOREIGN KEY (colorId) REFERENCES Colors(id) ON DELETE SET NULL,
  FOREIGN KEY (sizeId) REFERENCES Sizes(id) ON DELETE SET NULL
);

-- Datos: Users
INSERT INTO Users (firstName, lastName, email, password, image, role)
VALUES 
  ('Juan', 'Pérez', 'juan.perez@example.com', 'hashedpassword1', 'juan.jpg', 'admin'),
  ('María', 'López', 'maria.lopez@example.com', 'hashedpassword2', 'maria.png', 'user');

-- Datos: Categories
INSERT INTO Categories (name)
VALUES 
  ('Ropa'),
  ('Calzado'),
  ('Accesorios');

-- Datos: Brands
INSERT INTO Brands (name)
VALUES 
  ('Nike'),
  ('Adidas'),
  ('Puma');

-- Datos: Colors
INSERT INTO Colors (name)
VALUES 
  ('Rojo'),
  ('Azul'),
  ('Negro');

-- Datos: Sizes
INSERT INTO Sizes (name)
VALUES 
  ('S'),
  ('M'),
  ('L'),
  ('XL');

-- Datos: Products
INSERT INTO Products (name, description, price, image, stock, userId, categoryId, brandId, colorId, sizeId)
VALUES 
  ('Remera Deportiva', 'Remera cómoda para entrenamiento.', 29.99, 'remera.jpg', 100, 1, 1, 1, 2, 2),
  ('Zapatillas Urbanas', 'Zapatillas cómodas para uso diario.', 79.99, 'zapatillas.jpg', 50, 2, 2, 2, 3, 3),
  ('Mochila Compacta', 'Mochila ideal para llevar al trabajo o facultad.', 45.50, 'mochila.jpg', 30, 1, 3, 3, 1, NULL);
