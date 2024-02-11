const express = require('express');
const authController = require('../../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/checkDuplicateId', authController.checkDuplicateId);
router.post('/logout', authController.logout);
router.get('/checkSession', authController.checkSession);

module.exports = router;
