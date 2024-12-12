require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Route pour le service utilisateurs
app.use(
  '/api/users',
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://users-service:3001',  // Service d'utilisateurs
    changeOrigin: true,
    pathRewrite: {
      '^/api/users': '/api/users', // Réécrit l'URL du proxy pour que l'endpoint soit correct
    },
  })
);

// Route pour le service vidéo
app.use(
  '/api/videos',
  createProxyMiddleware({
    target: process.env.VIDEO_SERVICE_URL || 'http://video-processing-service:3002',  // Service vidéo
    changeOrigin: true,
    pathRewrite: {
      '^/api/videos': '/api/videos',  // Réécrit l'URL pour le service vidéo
    },
  })
);

// Route pour le service de streaming
app.use(
  '/api/streaming',
  createProxyMiddleware({
    target: process.env.STREAMING_SERVICE_URL || 'http://streaming-service:3003',  // Service de streaming
    changeOrigin: true,
    pathRewrite: {
      '^/api/streaming': '/api/streaming',  // Réécrit l'URL pour le service de streaming
    },
  })
);

// Démarrage du serveur API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
