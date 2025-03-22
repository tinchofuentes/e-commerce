const { body } = require('express-validator');

const userValidationRules = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
  body('email').isEmail().withMessage('El email debe ser válido'),
  body('contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número')
    .matches(/[\W_]/).withMessage('La contraseña debe tener al menos un carácter especial')
];

const productValidationRules = [
    body('nombre').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),
    body('stock').isInt({ gt: 0 }).withMessage('El stock debe ser un número entero positivo')
  ];

const orderValidationRules = [
    body('productos').isArray().withMessage('Debe ser un array de productos'),
    body('productos.*.id').isInt().withMessage('Cada producto debe tener un id válido'),
    body('productos.*.cantidad').isInt({ gt: 0 }).withMessage('Cada producto debe tener al menos una unidad')
  ];

module.exports = { userValidationRules, productValidationRules, orderValidationRules};