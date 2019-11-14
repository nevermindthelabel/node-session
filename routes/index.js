const router = require('express').Router();
const userRoutes = require('./user');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', userRoutes);

module.exports = router;
