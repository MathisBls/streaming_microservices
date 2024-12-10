const videoService = require('../controllers/video.controller');

// Téléversement d'une vidéo
exports.uploadVideo = (req, res, next) => {
  try {
    console.log('Requête reçue, fichier :', req.file);

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Aucun fichier vidéo fourni.',
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'Vidéo téléversée avec succès.',
      data: {
        filename: req.file.filename,
        filePath: req.file.path,
      },
    });
  } catch (error) {
    console.error('Erreur interne :', error); // Log de l'erreur pour débogage
    res.status(500).json({
      status: 'error',
      message: 'Une erreur interne est survenue.',
    });
  }
};

// Traitement d'une vidéo (conversion/compression)
exports.processVideo = (req, res, next) => {
  try {
    console.log('Données reçues :', req.body);

    const { filename } = req.body;

    if (!filename) {
      console.log('Erreur : Nom de fichier manquant.');
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier est requis.',
      });
    }

    // Simuler un traitement vidéo (ou ajoutez votre logique réelle)
    console.log(`Traitement de la vidéo : ${filename}`);
    
    res.status(200).json({
      status: 'success',
      message: `Le fichier ${filename} a été traité avec succès.`,
    });
  } catch (error) {
    console.error('Erreur interne :', error);
    next(error); // Passe l'erreur au middleware global
  }
};


// Ajout ou mise à jour des métadonnées
exports.addMetadata = async (req, res, next) => {
  try {
    const { filename, title, description, tags } = req.body;

    console.log('Données reçues :', req.body); // Log pour vérifier le corps de la requête

    if (!filename || !title || !description) {
      console.log('Erreur : Paramètres manquants');
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier, le titre, et la description sont obligatoires.',
      });
    }

    const metadata = { title, description, tags };
    console.log('Métadonnées à mettre à jour :', metadata);

    const result = await videoService.addMetadata(filename, metadata);
    console.log('Résultat du service addMetadata :', result);

    res.status(200).json({
      status: 'success',
      message: 'Métadonnées ajoutées ou mises à jour avec succès.',
      data: result,
    });
  } catch (error) {
    console.error('Erreur interne dans addMetadata :', error);
    next(error); // Passe l'erreur au middleware global
  }
};

// Récupération des informations d'une vidéo
exports.getVideoInfo = async (req, res, next) => {
  try {
    console.log('Requête reçue :', req.params);

    const { filename } = req.params;

    if (!filename) {
      console.log('Erreur : Paramètre filename manquant');
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier est requis.',
      });
    }

    console.log(`Recherche des informations pour : ${filename}`);
    const video = await Video.findOne({ filename });

    if (!video) {
      console.log(`Vidéo introuvable : ${filename}`);
      return res.status(404).json({
        status: 'error',
        message: `La vidéo avec le nom ${filename} est introuvable.`,
      });
    }

    console.log('Vidéo trouvée :', video);
    res.status(200).json({
      status: 'success',
      message: 'Informations de la vidéo récupérées avec succès.',
      data: video,
    });
  } catch (error) {
    console.error('Erreur interne dans getVideoInfo :', error);
    next(error);
  }
};

