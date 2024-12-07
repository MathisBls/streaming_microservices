const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion à MongoDB', err));

app.use('/api/users', userRoutes);
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
