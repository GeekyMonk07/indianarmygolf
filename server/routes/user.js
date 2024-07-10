const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/login', userController.login);

router.use(userAuthMiddleware);
router.post('/score', userController.enterScore);
router.get('/scores', userController.viewScores);

module.exports = router;