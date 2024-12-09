const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Users Service API',
        version: '1.0.0',
        description: 'API de gestion des utilisateurs pour l’application de streaming.',
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Serveur local',
        },
      ],
    },
    apis: ['./routes/*.js'], 
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);  


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion à MongoDB', err));

app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
