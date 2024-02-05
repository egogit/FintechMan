const express = require('express');
const getAuth = require('./auth');

const router = express.Router();

router.use('/auth', getAuth);

module.exports = router;
