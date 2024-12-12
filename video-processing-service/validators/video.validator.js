const Joi = require('joi');

// Validation pour l'upload de vidéo
exports.validateVideoUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'Aucun fichier vidéo fourni.',
    });
  }

  const allowedMimeTypes = ['video/mp4', 'video/avi', 'video/mkv', 'video/quicktime'];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      status: 'error',
      message: `Le format de la vidéo doit être l'un des suivants : ${allowedMimeTypes.join(', ')}.`,
    });
  }

  next(); 
};

// Validation pour le traitement de la vidéo
exports.validateProcessRequest = (req, res, next) => {
  const schema = Joi.object({
    originalname: Joi.string().required().messages({
      'any.required': 'Le nom du fichier est requis.',
      'string.empty': 'Le nom du fichier ne peut pas être vide.',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }

  next();
};


exports.validateMetadata = (req, res, next) => {
  const schema = Joi.object({
    originalname: Joi.string().required().messages({
      'any.required': 'Le nom du fichier est requis.',
      'string.empty': 'Le nom du fichier ne peut pas être vide.',
    }),
    title: Joi.string().required().messages({
      'any.required': 'Le titre est requis.',
      'string.empty': 'Le titre ne peut pas être vide.',
    }),
    description: Joi.string().required().messages({
      'any.required': 'La description est requise.',
      'string.empty': 'La description ne peut pas être vide.',
    }),
    tags: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Les tags doivent être une liste de chaînes de caractères.',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }

  next();
};
