const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const videoRoutes = require('./routes/video.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerConfig');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware pour le parsing JSON
app.use(express.json());

// Configuration Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));

// Routes principales
app.use('/api/videos', videoRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack);
  res.status(500).json({
    error: 'Une erreur interne est survenue.',
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🎥 Microservice de traitement de vidéos lancé`);
  console.log(`📄 Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
