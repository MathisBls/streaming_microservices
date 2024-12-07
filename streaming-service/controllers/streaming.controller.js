const Streaming = require('../models/streaming.model');
const path = require('path');
const fs = require('fs');

// Obtenir toutes les vidéos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Streaming.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des vidéos' });
  }
};

// Ajouter une nouvelle vidéo et téléverser le fichier
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier vidéo fourni' });
    }

    const video = new Streaming({
      title,
      description,
      filename: req.file.filename,
    });

    await video.save();
    res.status(201).json({ message: 'Vidéo téléversée avec succès', video });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du téléversement de la vidéo' });
  }
};

// Diffuser une vidéo spécifique
exports.streamVideo = (req, res) => {
    // Récupère le nom du fichier vidéo depuis les paramètres de la requête
    const filename = req.params.filename;
  
    // Construit le chemin complet du fichier vidéo dans le répertoire "videos"
    const videoPath = path.join(__dirname, '../videos', filename);
  
    // Vérifie si le fichier existe et obtient ses métadonnées
    fs.stat(videoPath, (err, stats) => {
      // Si le fichier n'existe pas ou si ce n'est pas un fichier valide, renvoie une erreur 404
      if (err || !stats.isFile()) {
        console.error(`Fichier non trouvé : ${videoPath}`);
        return res.status(404).json({ error: 'Vidéo non trouvée' });
      }
  
      // Récupère l'en-tête "Range" pour savoir quelle partie de la vidéo est demandée
      const range = req.headers.range;
  
      // Taille totale du fichier vidéo
      const videoSize = stats.size;
  
      // Taille d'un chunk (bloc de données) pour le streaming (ici 1 Mo)
      const CHUNK_SIZE = 10 ** 6;
  
      // Détermine les positions de début et de fin du chunk à envoyer
      let start = 0; // Par défaut, commence au début du fichier
      let end = Math.min(CHUNK_SIZE - 1, videoSize - 1); // Par défaut, envoie le premier chunk
  
      // Si un en-tête "Range" est présent, ajuste les positions de début et de fin
      if (range) {
        start = Number(range.replace(/\D/g, '')); // Extrait la position de début
        end = Math.min(start + CHUNK_SIZE, videoSize - 1); // Détermine la position de fin en fonction du CHUNK_SIZE
      }
  
      // Calcul de la taille du contenu à envoyer
      const contentLength = end - start + 1;
  
      // Définit les en-têtes HTTP nécessaires pour le streaming vidéo
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`, // Indique la plage de données envoyée
        'Accept-Ranges': 'bytes', // Permet au client de demander des plages spécifiques
        'Content-Length': contentLength, // Taille du contenu envoyé
        'Content-Type': 'video/mp4', // Type MIME pour la vidéo
      };
  
      // Envoie une réponse HTTP avec le code 206 (Partial Content) et les en-têtes
      res.writeHead(206, headers);
  
      // Crée un flux de lecture pour le fichier vidéo, limité à la plage définie (start, end)
      const stream = fs.createReadStream(videoPath, { start, end });
  
      // Gère les erreurs éventuelles lors de la lecture du fichier
      stream.on('error', (streamErr) => {
        console.error('Erreur lors de la lecture du fichier :', streamErr);
        res.status(500).json({ error: 'Erreur lors de la lecture du fichier' });
      });
  
      // Envoie les données du flux au client
      stream.pipe(res);
    });
  };
  

// Mettre à jour une vidéo
exports.updateVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      // Mise à jour dans la base de données
      const updatedVideo = await Streaming.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true }
      );
  
      if (!updatedVideo) {
        return res.status(404).json({ error: 'Vidéo non trouvée' });
      }
  
      res.status(200).json({ message: 'Vidéo mise à jour avec succès', video: updatedVideo });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la vidéo' });
    }
};

// Supprimer une vidéo
exports.deleteVideo = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Trouver la vidéo à supprimer
      const video = await Streaming.findById(id);
      if (!video) {
        return res.status(404).json({ error: 'Vidéo non trouvée' });
      }
  
      // Supprimer le fichier vidéo
      const videoPath = path.join(__dirname, '../videos', video.filename);
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier :', err);
        }
      });
  
      // Supprimer la vidéo de la base de données
      await video.deleteOne();
  
      res.status(200).json({ message: 'Vidéo supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la vidéo' });
    }
};
  