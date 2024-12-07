const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Assurez-vous que c'est `username` et pas `name`
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
