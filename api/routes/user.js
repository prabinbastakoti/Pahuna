const { getUser } = require('../controllers/user');

const router = require('express').Router();

router.get('/getuser', getUser);

module.exports = router;
