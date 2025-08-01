const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUser } = require('../validations/user.validation');

router.get('/', userController.getAllUsers);
router.post('/', validateUser, userController.createUser);

module.exports = router;
