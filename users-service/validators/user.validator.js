const Joi = require('joi');

// Validation pour la création d'un utilisateur
const validateCreateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.empty': 'Le nom d\'utilisateur est requis',
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne doit pas dépasser 30 caractères',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'L\'email est requis',
      'string.email': 'L\'email doit être valide',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Le mot de passe est requis',
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
    }),
    role: Joi.string().valid('user', 'admin').default('user').messages({
      'any.only': 'Le rôle doit être soit "user" soit "admin"',
    }),
  });

  return schema.validate(data);
};

// Validation pour la mise à jour d'un utilisateur
const validateUpdateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).messages({
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne doit pas dépasser 30 caractères',
    }),
    email: Joi.string().email().messages({
      'string.email': 'L\'email doit être valide',
    }),
    password: Joi.string().min(6).messages({
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
    }),
    role: Joi.string().valid('user', 'admin').messages({
      'any.only': 'Le rôle doit être soit "user" soit "admin"',
    }),
  });

  return schema.validate(data);
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
