const { body, validationResult } = require('express-validator');

exports.validateCreateUser = [
  body('email')
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('L\'email doit être valide'),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  
  }
];

exports.validateLoginUser = [
  body('email')
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('L\'email doit être valide'),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
