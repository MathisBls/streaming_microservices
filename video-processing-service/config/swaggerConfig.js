module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Microservice de traitement de vidéos',
      version: '1.0.0',
      description: 'API pour le téléversement, le traitement et la gestion des vidéos.',
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Serveur local',
      },
    ],
    paths: {
      '/api/videos/upload': {
        post: {
          summary: 'Téléverser une vidéo',
          description: 'Téléverse une vidéo brute pour traitement.',
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: 'Fichier vidéo à téléverser.',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Vidéo téléversée avec succès.',
              content: {
                'application/json': {
                  example: {
                    status: 'success',
                    message: 'Vidéo téléversée avec succès.',
                    data: {
                      originalname: 'video.mp4',
                      filePath: 'uploads/video.mp4',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Aucun fichier fourni ou format incorrect.',
            },
          },
        },
      },
      '/api/videos/process': {
        post: {
          summary: 'Traiter une vidéo',
          description: 'Lance le traitement d’une vidéo existante.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    originalname: {
                      type: 'string',
                      description: 'Nom du fichier vidéo à traiter.',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Vidéo traitée avec succès.',
              content: {
                'application/json': {
                  example: {
                    status: 'success',
                    message: 'Vidéo traitée avec succès.',
                    data: {
                      originalname: 'video.mp4',
                      processed: true,
                    },
                  },
                },
              },
            },
            404: {
              description: 'Vidéo introuvable.',
            },
          },
        },
      },
      '/api/videos/metadata': {
        post: {
          summary: 'Ajouter des métadonnées',
          description: 'Ajoute ou met à jour les métadonnées d’une vidéo.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    originalname: {
                      type: 'string',
                      description: 'Nom du fichier vidéo.',
                    },
                    title: {
                      type: 'string',
                      description: 'Titre de la vidéo.',
                    },
                    description: {
                      type: 'string',
                      description: 'Description de la vidéo.',
                    },
                    tags: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description: 'Tags associés à la vidéo.',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Métadonnées mises à jour avec succès.',
            },
            400: {
              description: 'Champs obligatoires manquants.',
            },
          },
        },
      },
      '/api/videos/info/{originalname}': {
        get: {
          summary: 'Obtenir les informations d’une vidéo',
          description: 'Récupère les métadonnées et le statut d’une vidéo existante.',
          parameters: [
            {
              name: 'originalname',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Nom du fichier vidéo.',
            },
          ],
          responses: {
            200: {
              description: 'Informations récupérées avec succès.',
              content: {
                'application/json': {
                  example: {
                    status: 'success',
                    message: 'Informations de la vidéo récupérées avec succès.',
                    data: {
                      originalname: 'video.mp4',
                      title: 'Titre Exemple',
                      description: 'Description Exemple',
                      tags: ['tag1', 'tag2'],
                      processed: true,
                    },
                  },
                },
              },
            },
            404: {
              description: 'Vidéo introuvable.',
            },
          },
        },
      },
    },
  };
  