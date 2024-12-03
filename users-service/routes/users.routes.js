const express = require('express');
const usersController = require('../controllers/users.controller');
const router = express.Router();

router.post('/create', usersController.createUser);
router.get('/:id', usersController.getUser);

module.exports = router;
