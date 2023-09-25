const { register, login, getUser } = require('../controllers/auth');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
