const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('a ok');
});

module.exports = router;
