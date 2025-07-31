const express = require('express');
const router = express.Router();
const pageController = require('../controller/page.controller');

router.get('/', pageController.home);
router.get('/dashboard', pageController.dashboard);
router.get('/all-students', pageController.allStudents);
router.get('/profile', pageController.profile);
router.get('/login', pageController.login);
router.get('/forgot-password', pageController.forgotPassword);

module.exports = router;
