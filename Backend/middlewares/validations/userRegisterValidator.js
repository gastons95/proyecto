
const { body } = require('express-validator');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');

module.exports = [
  body('firstName')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  body('lastName')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .custom(value => {
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const userExists = users.find(user => user.email === value);
      if (userExists) {
        throw new Error('El email ya está registrado');
      }
      return true;
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Las contraseñas no coinciden'),

  body('phone')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage('El número de teléfono debe contener solo números'),

  body('image')
    .custom((value, { req }) => {
      if (!req.file) return true;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowed = ['.jpg', '.jpeg', '.png', '.gif'];
      if (!allowed.includes(ext)) {
        throw new Error('Las extensiones permitidas son .jpg, .jpeg, .png, .gif');
      }
      return true;
    })
];