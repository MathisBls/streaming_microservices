const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3003;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Streaming Service API',
      version: '1.0.0',
      description: 'API de gestion et de diffusion de vidéos',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Serveur Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Applique le schéma par défaut à toutes les routes
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);
