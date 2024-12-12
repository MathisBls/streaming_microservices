require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

app.use(
  '/api/users',
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://users-service:3001',
    changeOrigin: true,
    pathRewrite: {
      '^/api/users': '/api/users',
    },
  })
);

app.use(
  '/api/videos',
  createProxyMiddleware({
    target: process.env.VIDEO_SERVICE_URL || 'http://video-processing-service:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/api/videos': '/api/videos',
    },
  })
);

app.use(
  '/api/streaming',
  createProxyMiddleware({
    target: process.env.STREAMING_SERVICE_URL || 'http://streaming-service:3003',
    changeOrigin: true,
    pathRewrite: {
      '^/api/streaming': '/api/streaming',
    },
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
