
# 🎥 **Streaming-Service**

Ce microservice gère la diffusion et la gestion des vidéos. Il permet de téléverser des vidéos, de récupérer les informations associées, de diffuser les vidéos en streaming, ainsi que de mettre à jour ou supprimer les vidéos.

---

## 📋 **Pré-requis**

Avant de démarrer, assurez-vous d'avoir les éléments suivants installés sur votre système :

- **Node.js** (version 14 ou supérieure)
- **MongoDB** (pour la base de données)
- **npm** (gestionnaire de paquets de Node.js)

---

## 🚀 **Installation**

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/MathisBls/streaming_microservices
   cd streaming-service
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur :
   ```bash
   node index.js
   ```

Le service sera disponible sur `http://localhost:3003`.

---

## 📖 **Documentation API**

### 📄 **Swagger**
Une documentation Swagger complète est disponible ici :
```
http://localhost:3003/api-docs
```

---

## 🛠️ **Fonctionnalités principales**

Le service prend en charge les opérations suivantes :

### **1. Téléverser une vidéo**
- **Route** : `POST /api/streaming/upload`
- **Description** : Permet de téléverser une vidéo et d'enregistrer ses métadonnées.
- **Corps attendu** (form-data) :
  - `title` : Titre de la vidéo.
  - `description` : Description de la vidéo.
  - `video` : Fichier vidéo (binaire).
- **Exemple de requête avec `curl`** :
  ```bash
  curl -X POST -F "title=Arcane" -F "description=La bande-annonce officielle d'Arcane" -F "video=@arcane-trailer.mp4" http://localhost:3003/api/streaming/upload
  ```

---

### **2. Récupérer toutes les vidéos**
- **Route** : `GET /api/streaming/videos`
- **Description** : Renvoie la liste des vidéos disponibles.
- **Exemple de réponse** :
  ```json
  [
    {
      "_id": "64bf5b882a1f4c00f0d4d03c",
      "title": "Arcane",
      "description": "La bande-annonce officielle d'Arcane",
      "filename": "arcane-trailer.mp4",
      "views": 0,
      "createdAt": "2023-12-07T14:52:32.123Z"
    }
  ]
  ```

---

### **3. Diffuser une vidéo spécifique**
- **Route** : `GET /api/streaming/stream/{filename}`
- **Description** : Diffuse une vidéo en streaming via son nom de fichier.
- **Paramètre attendu** :
  - `filename` : Nom du fichier vidéo (par exemple : `arcane-trailer.mp4`).
- **Note** : Swagger ne peut pas afficher directement les vidéos. Pour tester la diffusion, utilisez le lien `/api/streaming/test/{filename}`.

---

### **4. Tester une vidéo dans le navigateur**
- **Route** : `GET /api/streaming/test/{filename}`
- **Description** : Affiche une page HTML dynamique avec un lecteur vidéo pour diffuser une vidéo.
- **Exemple** : Visitez `http://localhost:3003/api/streaming/test/arcane-trailer.mp4` dans votre navigateur.

---

### **5. Mettre à jour une vidéo**
- **Route** : `PUT /api/streaming/videos/{id}`
- **Description** : Met à jour les métadonnées d'une vidéo.
- **Paramètre attendu** :
  - `id` : ID de la vidéo.
- **Corps attendu** (JSON) :
  ```json
  {
    "title": "Nouveau titre",
    "description": "Nouvelle description"
  }
  ```

---

### **6. Supprimer une vidéo**
- **Route** : `DELETE /api/streaming/videos/{id}`
- **Description** : Supprime une vidéo (métadonnées + fichier).
- **Paramètre attendu** :
  - `id` : ID de la vidéo.
- **Exemple de réponse** :
  ```json
  {
    "message": "Vidéo supprimée avec succès"
  }
  ```

---

## 🛠️ **Technologies utilisées**
- **Node.js** : Pour le backend.
- **Express** : Framework web rapide et minimaliste.
- **Multer** : Gestionnaire de téléversement de fichiers.
- **Swagger** : Documentation interactive de l'API.
- **MongoDB** : Base de données NoSQL.

---

## 🧪 **Tester le service**
### Avec Swagger :
1. Lancez le serveur.
2. Ouvrez Swagger à l'adresse suivante :
   ```
   http://localhost:3003/api-docs
   ```

### Avec Postman ou `curl` :
1. Utilisez les routes mentionnées dans la section **Documentation API**.
2. Fournissez les paramètres nécessaires (fichier, ID, etc.).

---

## 📂 **Structure du projet**
```
streaming-service/
├── controllers/        # Logique métier pour gérer les vidéos
├── models/             # Modèle Mongoose pour les vidéos
├── routes/             # Définition des routes API
├── utils/              # Configuration Multer
├── videos/             # Répertoire pour stocker les vidéos téléversées
├── index.js            # Point d'entrée principal
└── package.json        # Dépendances du projet
```



