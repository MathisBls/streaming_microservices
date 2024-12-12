const express = require('express');
const multer = require('multer');
const {
  uploadVideo,
  processVideo,
  addMetadata,
  getVideoInfo,
} = require('../controllers/video.controller');
const { validateVideoUpload } = require('../validators/video.validator');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), validateVideoUpload, uploadVideo);

router.post('/process', processVideo);

router.post('/metadata', addMetadata);

router.get('/info/:originalname', getVideoInfo);

module.exports = router;
