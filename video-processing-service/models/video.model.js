const mongoose = require('mongoose');

// Définir le schéma pour les vidéos
const videoSchema = new mongoose.Schema({
  originalname: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Créer un modèle basé sur le schéma
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
