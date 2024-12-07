const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const streamingRoutes = require('./routes/streaming.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerConfig');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware pour le parsing JSON
app.use(express.json());

// Configuration Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connexion à MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));


// Routes principales
app.use('/api/streaming', streamingRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🎥 Service de streaming lancé sur http://localhost:${PORT}`);
  console.log(`📄 Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
