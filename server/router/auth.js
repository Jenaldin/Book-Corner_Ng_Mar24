const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');
const { isProfileOwner } = require('../middlewares/ownerMiddleware')

router.get('/profile/:userId', isAuth, authController.getUser);
router.get('/my-profile/:userId', isProfileOwner , authController.getMyUser);

router.post('/register', isGuest, authController.registerUser);
router.post('/login', isGuest, authController.loginUser);
router.post('/logout', isAuth, authController.logoutUser);
router.put('/my-profile/:userId', isProfileOwner, authController.editMyUser);

module.exports = router