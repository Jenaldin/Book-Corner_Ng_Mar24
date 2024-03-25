const express = require('express');
const router = require('express').Router();

const authController = require('../controllers/authController');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.get('/profile/:userId', authController.getUser);

router.post('/register', isGuest, authController.registerUser);
router.post('/login', isGuest, authController.loginUser);
router.post('/logout', isAuth, authController.logoutUser);

module.exports = router