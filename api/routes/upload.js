const { uploadByLink } = require('../controllers/upload');

const router = require('express').Router();

router.post('/upload-by-link', uploadByLink);

module.exports = router;
