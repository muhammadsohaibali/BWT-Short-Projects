const express = require('express');
const router = express.Router();

const { addUser, getUsers, getUser, deleteUser, updateUser } = require('../controller/user.controller')

router.get('/', getUsers)
router.post('/', addUser)
router.get('/:username', getUser)
router.patch('/:username', updateUser)
router.delete('/:username', deleteUser)

module.exports = router;