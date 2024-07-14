const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/login', adminController.login);
router.get('/hall-of-fame', adminController.getHallOfFameEntries);
router.get('/news-flash', adminController.getNewsFlash);

router.use(adminAuthMiddleware);
router.post('/fourball', adminController.createFourball);
router.get('/fourballs', adminController.viewFourballs);
router.get('/scores/:fourballId', adminController.viewScores);
router.post('/archive-flush', adminController.archiveFlush);

router.post('/hall-of-fame', adminController.addHallOfFameEntry);
router.post('/news-flash', adminController.updateNewsFlash);

module.exports = router;