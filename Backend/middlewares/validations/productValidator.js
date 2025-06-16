const { body } = require('express-validator');

const productValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

];

module.exports = productValidator;