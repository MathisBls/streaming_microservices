const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/users', createProxyMiddleware({ target: 'http://users-service:3001', changeOrigin: true }));
app.use('/video-processing', createProxyMiddleware({ target: 'http://video-processing-service:3002', changeOrigin: true }));
app.use('/streaming', createProxyMiddleware({ target: 'http://streaming-service:3003', changeOrigin: true }));

app.listen(3000, () => {
  console.log('API Gateway running on http://localhost:3000');
});
