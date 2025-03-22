const express = require('express');
const { userValidationRules } = require('../middlewares/validators');
const { validate } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', userValidationRules, validate, register);
router.post('/login', login);

module.exports = router;
