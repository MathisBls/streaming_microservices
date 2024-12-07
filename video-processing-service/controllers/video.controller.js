const videoService = require('../controllers/video.controller');

// Téléversement d'une vidéo
exports.uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'Aucun fichier vidéo fourni.' });
    }

    const result = await videoService.saveFile(req.file);
    res.status(201).json({
      status: 'success',
      message: 'Vidéo téléversée avec succès.',
      data: result,
    });
  } catch (error) {
    next(error); // Passer l'erreur au middleware d'erreur
  }
};

// Traitement d'une vidéo (conversion/compression)
exports.processVideo = async (req, res, next) => {
  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).json({ status: 'error', message: 'Le nom du fichier est requis.' });
    }

    const result = await videoService.processFile(filename);
    res.status(200).json({
      status: 'success',
      message: 'Vidéo traitée avec succès.',
      data: result,
    });
  } catch (error) {
    next(error); // Passer l'erreur au middleware d'erreur
  }
};

// Ajout ou mise à jour des métadonnées
exports.addMetadata = async (req, res, next) => {
  try {
    const { filename, title, description, tags } = req.body;

    if (!filename || !title || !description) {
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier, le titre, et la description sont obligatoires.',
      });
    }

    const metadata = { title, description, tags };
    const result = await videoService.addMetadata(filename, metadata);
    res.status(200).json({
      status: 'success',
      message: 'Métadonnées ajoutées ou mises à jour avec succès.',
      data: result,
    });
  } catch (error) {
    next(error); // Passer l'erreur au middleware d'erreur
  }
};

// Récupération des informations d'une vidéo
exports.getVideoInfo = async (req, res, next) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({ status: 'error', message: 'Le nom du fichier est requis.' });
    }

    const result = await videoService.getVideoInfo(filename);
    res.status(200).json({
      status: 'success',
      message: 'Informations de la vidéo récupérées avec succès.',
      data: result,
    });
  } catch (error) {
    next(error); // Passer l'erreur au middleware d'erreur
  }
};
