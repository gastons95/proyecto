const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');

const usersController = {
  login: (req, res) => {
    res.render('users/login', {
      oldData: {},
      errors: {}
    });
  },

  register: (req, res) => {
    res.render('users/register', {
      oldData: {},
      errors: {}
    });
  },

  processRegister: (req, res) => {
    const errors = validationResult(req);
    console.log("Errores de validación en register:", errors.array());

    if (!errors.isEmpty()) {
      return res.render('users/register', {
        errors: errors.mapped(),
        oldData: req.body
      });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const { firstName, lastName, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.render('users/register', {
        errors: {
          email: {
            msg: 'Ya existe un usuario con ese email'
          }
        },
        oldData: req.body
      });
    }

    const image = req.file ? `/images/users/${req.file.filename}` : '/images/users/default.png';
    console.log("Cuerpo recibido:", req.body);
    console.log("Archivo recibido:", req.file);

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      category: 'user',
      image
    };
    console.log("Nuevo usuario:", newUser);

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

    res.redirect('/users/login');
  },

  processLogin: (req, res) => {
    console.log('Llegó al controlador processLogin');
    console.log('Datos recibidos:', req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.mapped());
      return res.render('users/login', {
        errors: errors.mapped(),
        oldData: req.body
      });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const userToLogin = users.find(user => user.email === req.body.email);
    console.log('Usuario encontrado:', userToLogin);

    if (!userToLogin) {
      return res.render('users/login', {
        errors: {
          email: {
            msg: 'El usuario no está registrado'
          }
        },
        oldData: req.body
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password);
    console.log('contraseña correcta?', isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.render('users/login', {
        errors: {
          password: {
            msg: 'Contraseña incorrecta'
          }
        },
        oldData: req.body
      });
    }

    // Guardar usuario en sesión
    req.session.userLogged = userToLogin;

    // Redireccionar al perfil
    return res.redirect('/users/profile');
  },

  profile: (req, res) => {
    const user = req.session.userLogged;
    if (!user) return res.redirect('/users/login');
    res.render('users/profile', { user });
  },

  editProfile: (req, res) => {
    const user = req.session.userLogged;
    if (!user) return res.redirect('/users/login');
    res.render('users/editProfile', { user });
  },

  processEdit: (req, res) => {
    const { firstName, lastName, email } = req.body;
    const userId = req.session.userLogged.id;

    let updatedUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const userIndex = updatedUsers.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.redirect('/users/profile');
    }

    const image = req.file ? `/images/users/${req.file.filename}` : updatedUsers[userIndex].image;

    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      firstName,
      lastName,
      email,
      image
    };

    fs.writeFileSync(usersFilePath, JSON.stringify(updatedUsers, null, 2), 'utf-8');

    req.session.userLogged = {
      id: updatedUsers[userIndex].id,
      firstName: updatedUsers[userIndex].firstName,
      lastName: updatedUsers[userIndex].lastName,
      email: updatedUsers[userIndex].email,
      image: updatedUsers[userIndex].image
    };

    return res.redirect('/users/profile');
  }
};

module.exports = usersController;