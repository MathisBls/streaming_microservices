const multer = require('multer');

// Fonction pour nettoyer et sécuriser les noms de fichiers
// Elle remplace les espaces par des tirets et supprime tous les caractères non autorisés.
const sanitizeFilename = (filename) =>
  filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '');
    // Remplace les espaces par des tirets  // Supprime les caractères spéciaux non autorisés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos');
  },
  filename: (req, file, cb) => {
    cb(null, sanitizeFilename(file.originalname)); // Nettoie et utilise le nom d'origine du fichier
  },
});

module.exports = multer({ storage });
