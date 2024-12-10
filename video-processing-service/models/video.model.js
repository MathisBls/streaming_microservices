const mongoose = require('mongoose');

// Définir le schéma pour les vidéos

const videoSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  tags: { type: [String], required: false },
});

// Middleware pour mettre à jour `updatedAt` avant chaque sauvegarde
videoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Créer un modèle basé sur le schéma
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
