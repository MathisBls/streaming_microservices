const mongoose = require('mongoose');

// Définir le schéma pour les vidéos
const videoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, 'Le nom du fichier est requis'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
  },
  tags: {
    type: [String],
    default: [],
  },
  processed: {
    type: Boolean,
    default: false, // Indique si la vidéo a été traitée ou non
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date de création de l'entrée
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Date de dernière mise à jour
  },
});

// Middleware pour mettre à jour `updatedAt` avant chaque sauvegarde
videoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Créer un modèle basé sur le schéma
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
