const { upload, uploadByLink } = require('../controllers/upload');
const middleware = require('../utils/middleware');

const router = require('express').Router();

router.post('/', middleware.photosMiddleware.array('photos', 100), upload);
router.post('/upload-by-link', uploadByLink);

module.exports = router;
