const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const {
    addUser, getUsers, getUser, deleteUser, updateUser, getCurrentUser
} = require('../controller/user.controller');

router.get('/me', checkAuth, getCurrentUser)

router.get('/', getUsers)
router.post('/', addUser)
router.get('/:username', getUser)
router.patch('/:username', updateUser)
router.delete('/:username', deleteUser)

module.exports = router;