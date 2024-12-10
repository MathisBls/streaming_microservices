
# 🎥 **Video-Processing-Service**

Ce microservice gère le téléversement, le traitement et la gestion des métadonnées des vidéos. Il permet également de récupérer des informations détaillées sur les vidéos stockées dans une base de données MongoDB.

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
   cd video-processing-service
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur :
   ```bash
   node index.js
   ```

Le service sera disponible sur `http://localhost:3002`.

---

## 📖 **Documentation API**

### 📄 **Swagger**
Une documentation Swagger complète est disponible ici :
```
http://localhost:3002/api-docs
```

---

## 🛠️ **Fonctionnalités principales**

Le service prend en charge les opérations suivantes :

### **1. Téléverser une vidéo**
- **Route** : `POST /api/videos/upload`
- **Description** : Permet de téléverser une vidéo.
- **Corps attendu** (form-data) :
  - Key : file
  - Value : example.mp4

---

### **2. Traiter les vidéos**
- **Route** : `GET /api/videos/process`
- **Description** : Traite les vidéos téléversées
- **Paramètre attendu** :
    ```json
  [
    {
    "filename" : "example.mp4"
    }
  ]
  ```

---

### **3. Ajout/Mise à jour des metadata**
- **Route** : `GET /api/videos/metadata`
- **Description** : Ajout ou met à jour les metadata du fichier
- **Paramètre attendu** :
    ```json
  [
    {
  "filename": "example.mp4",
  "title": "titre de la video",
  "description": "description video",
  "tags": ["tag1", "tag2", "tag3"]
  }
  ]
  ```
---

### **3. Ajout/Mise à jour des metadata**
- **Route** : `GET /api/videos/metadata`
- **Description** : Ajout ou met à jour les metadata du fichier
- **Paramètre attendu** :
    ```json
  [
    {
  "filename": "example.mp4",
  "title": "titre de la video",
  "description": "description video",
  "tags": ["tag1", "tag2", "tag3"]
  }
  ]
  ```

---

### **4. Récupération des informations des vidéos**
- **Route** : `GET /api/videos/info/example.mp4`
- **Description** : Récupère les informations des vidéos
- **Exemple de réponse** :
  ```json
  [
    {
    "status": "success",
    "message": "Informations de la vidéo récupérées avec succès.",
    "data": {
        "_id": "id généré automatiquement",
        "filename": "example.mp4",
        "__v": 0,
        "description": "description video",
        "tags": [
            "tag1",
            "tag2",
            "tag3"
        ],
        "title": "titre de la video",
        "createdAt": "date",
        "updatedAt": "date"
    }
    }
  ]
  ```

---

## 🛠️ **Technologies utilisées**
- **Node.js** : Pour le backend.
- **Express** : Framework web rapide et minimaliste.
- **Multer** : Gestionnaire de téléversement de fichiers.
- **Swagger** : Documentation interactive de l'API.
- **MongoDB** : Base de données NoSQL.
- **Mongoose** : ORM pour interagir avec MongoDB et définir des schémas
- **Dotenv** : Pour gérer les variables d'environnement dans votre application

---

## 🧪 **Tester le service**
### Avec Swagger :
1. Lancez le serveur.
2. Ouvrez Swagger à l'adresse suivante :
   ```
   http://localhost:3002/api-docs
   ```

### Avec Postman ou `curl` :
1. Utilisez les routes mentionnées dans la section **Documentation API**.
2. Fournissez les paramètres nécessaires (fichier, ID, etc.).

---

## 📂 **Structure du projet**
```
video-processing-service/
├── controllers/        # Logique métier pour gérer les vidéos
├── models/             # Modèle Mongoose pour les vidéos
├── routes/             # Définition des routes API
├── upload/             # Répertoire pour stocker les vidéos téléversées
├── validators/         # Vérifie la validité des données reçu
├── index.js            # Point d'entrée principal
└── package.json        # Dépendances du projet
```