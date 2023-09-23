const express = require('express');

const router = express.Router();

const { login, refreshToken } = require('../controllers/auth');

router.post('/login', login);

router.post('/refresh_token', refreshToken);

module.exports = router;
