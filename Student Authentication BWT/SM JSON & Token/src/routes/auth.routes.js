const express = require('express');
const router = express.Router();

const { login, logout } = require('../controller/auth.controller');
const checkGuest = require('../middleware/checkGuest');

router.post('/logout', logout)
router.post('/login', checkGuest, login)

module.exports = router;