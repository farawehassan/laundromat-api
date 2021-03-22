const express = require('express');
const { check, body } = require('express-validator');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/signup', controller.signup);

router.post('/login', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
],
controller.login
);

router.get('/getAllUsers', controller.getAllUsers);

module.exports = router;