const express = require('express');
const router = require('express').Router();

const authController = require('../controllers/authController');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.get('/my-profile/:userId', isAuth, authController.getMyUser);

router.post('/register', isGuest, authController.registerUser);
router.post('/login', isGuest, authController.loginUser);
router.post('/logout', isAuth, authController.logoutUser);
router.put('/my-profile/:userId', isAuth, authController.editMyUser);

module.exports = router