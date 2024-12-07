const express = require('express');
const router = express.Router();
const multerConfig = require('../utils/multerConfig');
const streamingController = require('../controllers/streaming.controller');

/**
 * @swagger
 * /api/streaming/videos:
 *   get:
 *     summary: Obtenir toutes les vidéos
 *     description: Récupère la liste des vidéos disponibles dans la base de données.
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
 *       500:
 *         description: Erreur serveur lors de la récupération des vidéos
 */
router.get('/videos', streamingController.getAllVideos);

/**
 * @swagger
 * /api/streaming/upload:
 *   post:
 *     summary: Charger une nouvelle vidéo
 *     description: >
 *       Téléverse une vidéo et enregistre ses métadonnées dans la base de données.  
 *       Les noms de fichiers sont nettoyés automatiquement pour éviter les erreurs.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Aucun fichier vidéo fourni
 *       500:
 *         description: Erreur interne lors du téléversement de la vidéo
 */
router.post('/upload', multerConfig.single('video'), streamingController.uploadVideo);

/**
 * @swagger
 * /api/streaming/stream/{filename}:
 *   get:
 *     summary: Diffuser une vidéo spécifique
 *     description: >
 *       Cet endpoint diffuse une vidéo en streaming.  
 *       **Note :** Swagger ne peut pas afficher directement les vidéos.  
 *       Cliquez [ici](http://localhost:3003/api/streaming/test/{filename}) pour tester dynamiquement la vidéo.
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
 *       404:
 *         description: Vidéo non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Vidéo non trouvée
 *       400:
 *         description: Mauvaise requête (par exemple, Range manquant)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Range header manquant
 */
router.get('/stream/:filename', streamingController.streamVideo);

/**
 * @swagger
 * /api/streaming/test/{filename}:
 *   get:
 *     summary: Tester la diffusion d'une vidéo
 *     description: Redirection vers une page HTML dynamique pour tester la diffusion de vidéos.
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
 *         description: Page de test affichée avec succès
 */
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
  
/**
 * @swagger
 * /api/streaming/videos/{id}:
 *   put:
 *     summary: Mettre à jour une vidéo
 *     description: Met à jour les métadonnées (titre, description) d'une vidéo.
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
 *       404:
 *         description: Vidéo non trouvée
 *       500:
 *         description: Erreur lors de la mise à jour
 */
router.put('/videos/:id', streamingController.updateVideo);

/**
 * @swagger
 * /api/streaming/videos/{id}:
 *   delete:
 *     summary: Supprimer une vidéo
 *     description: Supprime une vidéo (fichier et métadonnées) de la base de données.
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
 *       404:
 *         description: Vidéo non trouvée
 *       500:
 *         description: Erreur lors de la suppression
 */
router.delete('/videos/:id', streamingController.deleteVideo);


module.exports = router;
