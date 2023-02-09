const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const upload = multer({ dest: 'uploads/messasgephotos' })
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Message } = require("../../db/models");
const router = express.Router();

const validateMessage = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please give your post a title'),
    check('message')
        .exists({ checkFalsy: true })
        .withMessage('Please write up some text for the post'),
    check('photo')
        .exists({ checkFalsy: true })
        .withMessage('Please give your post a photo'),
    handleValidationErrors
]

// Get Messages
router.get("/", asyncHandler(async (req, res) => {
    const messages = await Message.findAll({})

    return res.json({
        messages
    })
}))

// Get Message
router.get("/:id", asyncHandler(async (req, res) => {
    let messageId = req.params.id;

    let message = await Message.findByPk(messageId);

    return res.json({ message })
}))


// Create Message
router.post(
    '/',
    upload.single('photo'),
    requireAuth,
    validateMessage,
    asyncHandler(async (req, res) => {
        let userId = req.user.id;

        const { title, message } = req.body;
        const photo = req.file.path;

        const newMessage = await Message.build({
            userId,
            title,
            message,
            photo
        })

        await message.save();

        return res.json({ message })
    })
)

module.exports = router;