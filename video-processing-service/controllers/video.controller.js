// const videoService = require('../controllers/video.controller');
// const Video = require('../models/video.model');

// // Téléversement d'une vidéo
// exports.uploadVideo = (req, res, next) => {
//   try {
//     console.log('Requête reçue, fichier :', req.file);

//     if (!req.file) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Aucun fichier vidéo fourni.',
//       });
//     }

//     res.status(201).json({
//       status: 'success',
//       message: 'Vidéo téléversée avec succès.',
//       data: {
//         originalname: req.file.originalname,
//         filePath: req.file.path,
//       },
//     });
//   } catch (error) {
//     console.error('Erreur interne :', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Une erreur interne est survenue.',
//     });
//   }
// };

// // Traitement d'une vidéo
// // exports.processVideo = (req, res, next) => {
// //   try {
// //     console.log('Données reçues :', req.body);

// //     const { filename } = req.body;

// //     if (!filename) {
// //       console.log('Erreur : Nom de fichier manquant.');
// //       return res.status(400).json({
// //         status: 'error',
// //         message: 'Le nom du fichier est requis.',
// //       });
// //     }

// //     // Simuler un traitement vidéo
// //     console.log(`Traitement de la vidéo : ${filename}`);
    
// //     res.status(200).json({
// //       status: 'success',
// //       message: `Le fichier ${filename} a été traité avec succès.`,
// //     });
// //   } catch (error) {
// //     console.error('Erreur interne :', error);
// //     next(error); // Passe l'erreur au middleware global
// //   }
// // };
// exports.processVideo = (req, res, next) => {
//   try {
//     console.log('Requête reçue avec le body :', req.body);

//     const { originalname } = req.body;

//     if (!originalname) {
//       console.log('Erreur : Champ "originalname" manquant dans la requête.');
//       return res.status(400).json({
//         status: 'error',
//         message: 'Le champ "originalname" est requis.',
//       });
//     }

//     // Chemin complet du fichier
//     const filePath = path.join(__dirname, '..', 'uploads', originalname);
//     console.log('Chemin complet du fichier :', filePath);

//     // Vérifiez si le fichier existe
//     if (!fs.existsSync(filePath)) {
//       console.log(`Erreur : Le fichier ${originalname} n'existe pas.`);
//       return res.status(404).json({
//         status: 'error',
//         message: `Le fichier "${originalname}" n'a pas été téléversé ou est introuvable.`,
//       });
//     }

//     // Simuler un traitement vidéo
//     console.log(`Traitement de la vidéo : ${originalname}`);
    
//     res.status(200).json({
//       status: 'success',
//       message: `Le fichier "${originalname}" a été traité avec succès.`,
//     });
//   } catch (error) {
//     console.error('Erreur interne :', error); // Log de l'erreur pour débogage
//     res.status(500).json({
//       status: 'error',
//       message: 'Une erreur interne est survenue.',
//     });
//   }
// };


// // Ajout ou mise à jour des métadonnées
// exports.addMetadata = async (req, res, next) => {
//   try {
//     const { originalname, title, description, tags } = req.body;

//     if (!originalname || !title || !description) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Le nom du fichier, le titre, et la description sont obligatoires.',
//       });
//     }

//     const metadata = { title, description, tags };
//     const video = await Video.findOneAndUpdate(
//       { originalname },
//       { $set: metadata },
//       { new: true, upsert: true }
//     );

//     res.status(200).json({
//       status: 'success',
//       message: 'Métadonnées ajoutées ou mises à jour avec succès.',
//       data: video,
//     });
//   } catch (error) {
//     console.error('Erreur dans addMetadata :', error);
//     next(error);
//   }
// };

// // Récupération des informations d'une vidéo
// exports.getVideoInfo = async (req, res, next) => {
//   try {
//     const { originalname } = req.params;

//     if (!originalname) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Le nom du fichier est requis.',
//       });
//     }

//     const video = await Video.findOne({ originalname });

//     if (!video) {
//       return res.status(404).json({
//         status: 'error',
//         message: `La vidéo avec le nom ${originalname} est introuvable.`,
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       message: 'Informations de la vidéo récupérées avec succès.',
//       data: video,
//     });
//   } catch (error) {
//     console.error('Erreur interne dans getVideoInfo :', error);
//     next(error);
//   }
// };

const videoService = require('../controllers/video.controller');
const Video = require('../models/video.model');

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
        originalname: req.file.originalname,
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

// Traitement d'une vidéo
exports.processVideo = (req, res, next) => {
  try {
    console.log('Données reçues :', req.body);

    const { originalname } = req.body;

    if (!originalname) {
      console.log('Erreur : Nom de fichier manquant.');
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier est requis.',
      });
    }

    // Simuler un traitement vidéo
    console.log(`Traitement de la vidéo : ${originalname}`);
    
    res.status(200).json({
      status: 'success',
      message: `Le fichier ${originalname} a été traité avec succès.`,
    });
  } catch (error) {
    console.error('Erreur interne :', error);
    next(error); // Passe l'erreur au middleware global
  }
};


// Ajout ou mise à jour des métadonnées
exports.addMetadata = async (req, res, next) => {
  try {
    const { originalname, title, description, tags } = req.body;

    if (!originalname || !title || !description) {
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier, le titre, et la description sont obligatoires.',
      });
    }

    const metadata = { title, description, tags };
    const video = await Video.findOneAndUpdate(
      { originalname },
      { $set: metadata },
      { new: true, upsert: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Métadonnées ajoutées ou mises à jour avec succès.',
      data: video,
    });
  } catch (error) {
    console.error('Erreur dans addMetadata :', error);
    next(error);
  }
};

// Récupération des informations d'une vidéo
exports.getVideoInfo = async (req, res, next) => {
  try {
    const { originalname } = req.params;

    if (!originalname) {
      return res.status(400).json({
        status: 'error',
        message: 'Le nom du fichier est requis.',
      });
    }

    const video = await Video.findOne({ originalname });

    if (!video) {
      return res.status(404).json({
        status: 'error',
        message: `La vidéo avec le nom ${originalname} est introuvable.`,
      });
    }

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


