
const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();
const multer = require('multer');

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

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    let user;
    if (req.file !== null) {
      const { username, fullName, email, password, biography } = req.body
      const pfPhoto = req.file.buffer
      user = await User.signup({ username, fullName, email, password, biography, pfPhoto });
    } else {
      const { username, fullName, email, password, biography, profilePhoto } = req.body;
      user = await User.signup({ username, fullName, email, password, biography, profilePhoto });
    }

    const token = await setTokenCookie(res, user);

    return res.json({
      user,
      token
    });
  }),
);

module.exports = router;