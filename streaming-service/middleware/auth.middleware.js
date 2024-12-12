const jwt = require("jsonwebtoken");
const axios = require("axios"); // Pour appeler le service utilisateur

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    // Appelez le service utilisateur pour valider le token
    const response = await axios.post("http://user-service:3001/api/users/validate-token", { token });
    if (response.status === 200) {
      req.user = response.data.user; // Infos utilisateur si le token est valide
      return next();
    }
  } catch (err) {
    console.error("Erreur de validation du token :", err.message);
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};
