const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/users');

router.get('/', (req, res) => {
  res.json('api route hit');
});

router.post(
  '/register',
  [
    check('firstName', 'Please enter your First Name')
      .not()
      .isEmpty(),
    check('lastName', 'Please enter your Last Name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: })
      }
    }
  }
);

module.exports = router;
