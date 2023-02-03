const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .isLength({ max: 100 })
  ,
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 30 })
    .withMessage('Please provide an unused username with at least 4 characters but less than 30 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .exists({ checkFalsy: true })
    .withMessage("please input a username"),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('fullName')
    .exists({ checkFalsy: true })
    .withMessage("Please put in a first name.")
    .isLength({ max: 256 })
    .withMessage("Name can not be more than 256 characters"),
  handleValidationErrors,
];

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    console.log(req.body)

    const { credential, password } = req.body

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = [`The provided credentials were invalid.`];
      return next(err);
    }

    const token = await setTokenCookie(res, user);

    return res.json({
      user,
      token
    });
  }),
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (user) {

      const token = await setTokenCookie(res, user)

      return res.json({
        user: user.toSafeObject(),
        token: token
      });
    } else return res.json({});
  })
);



module.exports = router;