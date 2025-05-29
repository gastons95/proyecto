const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Ruta al archivo de usuarios
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
  login: (req, res) => {
    console.log("Entrando a login");
    res.render('users/login');
  },

  register: (req, res) => {
    console.log("Entrando a register");
    res.render('users/register');
  },

  processRegister: (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Verificar si ya existe ese email
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.send('Ya existe un usuario con ese email');
    }

    // Procesar imagen de perfil
const image = req.file ? `/images/users/${req.file.filename}` : '/images/users/default.png';

    // Crear nuevo usuario
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      category: 'user',
      image
    };

    // Guardar en el JSON
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

    res.redirect('/users/login');
  },
   processLogin: (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.redirect('/users/login'); // usuario no existe, redirigir
    }

    // Verificar contraseña
    const passwordOk = bcrypt.compareSync(password, user.password);
    if (!passwordOk) {
      return res.redirect('/users/login'); // contraseña incorrecta, redirigir
    }

    // Guardar datos del usuario en la sesión
    req.session.userLogged = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      image: user.image
    };

    // Redirigir al perfil
    return res.redirect('/users/profile');
  },

  profile: (req, res) => {
    console.log("Entrando a profile");
    const user = users[0]; // Simulación de usuario logueado
    res.render('users/profile', { user });
  },

  editProfile: (req, res) => {
    console.log("Entrando a editProfile");
    const user = users[0]; // Simulación de usuario logueado
    console.log(user);
    res.render('users/editProfile', { user });
  }
};

module.exports = usersController;