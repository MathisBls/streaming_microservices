const express = require('express');
const router = express.Router();
const multerConfig = require('../utils/multerConfig');
const streamingController = require('../controllers/streaming.controller');
const { authMiddleware } = require('../middleware/auth.middleware'); // Middleware d'authentification

/**
 * @swagger
 * /api/streaming/videos:
 *   get:
 *     summary: Obtenir toutes les vidéos
 *     description: Récupère la liste des vidéos disponibles dans la base de données.
 *     security:
 *       - bearerAuth: [] # Ajout de l'exigence de token pour Swagger
 *     responses:
 *       200:
 *         description: Liste de toutes les vidéos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   filename:
 *                     type: string
 *                   views:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Accès refusé. Token manquant ou invalide.
 *       500:
 *         description: Erreur serveur lors de la récupération des vidéos
 */
router.get('/videos', authMiddleware, streamingController.getAllVideos); // Applique le middleware

/**
 * @swagger
 * /api/streaming/upload:
 *   post:
 *     summary: Charger une nouvelle vidéo
 *     description: >
 *       Téléverse une vidéo et enregistre ses métadonnées dans la base de données.  
 *       Les noms de fichiers sont nettoyés automatiquement pour éviter les erreurs.
 *     security:
 *       - bearerAuth: [] # Ajout de l'exigence de token pour Swagger
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Arcane
 *               description:
 *                 type: string
 *                 example: La bande-annonce officielle de la série Arcane
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Vidéo téléversée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vidéo téléversée avec succès
 *                 video:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     filename:
 *                       type: string
 *                     views:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Erreur de validation ou fichier manquant
 *       401:
 *         description: Accès refusé. Token manquant ou invalide.
 *       500:
 *         description: Erreur interne lors du téléversement de la vidéo
 */
router.post('/upload', authMiddleware, multerConfig.single('video'), streamingController.uploadVideo);

/**
 * @swagger
 * /api/streaming/stream/{filename}:
 *   get:
 *     summary: Diffuser une vidéo spécifique
 *     description: >
 *       Cet endpoint diffuse une vidéo en streaming.  
 *       **Note :** Swagger ne peut pas afficher directement les vidéos.  
 *     security:
 *       - bearerAuth: [] # Ajout de l'exigence de token pour Swagger
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Nom du fichier vidéo
 *         schema:
 *           type: string
 *           example: "Arcane-Bande-annonce-officielle.mp4"
 *     responses:
 *       200:
 *         description: Vidéo diffusée avec succès
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Accès refusé. Token manquant ou invalide.
 *       404:
 *         description: Vidéo non trouvée
 *       400:
 *         description: Mauvaise requête (par exemple, Range manquant)
 */
router.get('/stream/:filename', streamingController.streamVideo);

/**
 * @swagger
 * /api/streaming/videos/{id}:
 *   put:
 *     summary: Mettre à jour une vidéo
 *     description: Met à jour les métadonnées (titre, description) d'une vidéo.
 *     security:
 *       - bearerAuth: [] # Ajout de l'exigence de token pour Swagger
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la vidéo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nouveau titre
 *               description:
 *                 type: string
 *                 example: Nouvelle description
 *     responses:
 *       200:
 *         description: Vidéo mise à jour avec succès
 *       401:
 *         description: Accès refusé. Token manquant ou invalide.
 *       404:
 *         description: Vidéo non trouvée
 *       500:
 *         description: Erreur lors de la mise à jour
 */
router.put('/videos/:id', authMiddleware, streamingController.updateVideo);

/**
 * @swagger
 * /api/streaming/videos/{id}:
 *   delete:
 *     summary: Supprimer une vidéo
 *     description: Supprime une vidéo (fichier et métadonnées) de la base de données.
 *     security:
 *       - bearerAuth: [] # Ajout de l'exigence de token pour Swagger
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la vidéo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vidéo supprimée avec succès
 *       401:
 *         description: Accès refusé. Token manquant ou invalide.
 *       404:
 *         description: Vidéo non trouvée
 *       500:
 *         description: Erreur lors de la suppression
 */
router.delete('/videos/:id', authMiddleware, streamingController.deleteVideo);

router.get('/test/:filename', (req, res) => {
  const filename = req.params.filename;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test de Streaming Vidéo</title>
    </head>
    <body>
      <h1>Test de Streaming Vidéo</h1>
      <video controls width="800">
        <source src="/api/streaming/stream/${filename}" type="video/mp4">
        Votre navigateur ne supporte pas le lecteur vidéo.
      </video>
      <p>Vidéo : ${filename}</p>
    </body>
    </html>
  `);
});



module.exports = router;
