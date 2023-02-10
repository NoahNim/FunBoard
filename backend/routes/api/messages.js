const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const upload = multer({ dest: 'uploads/messasgephotos' })
const uploadComments = multer({ dest: 'uploads/commentphotos' })
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Message } = require("../../db/models");
const { Comment } = require("../../db/models");
const { User } = require("../../db/models");
const router = express.Router();

const validateMessage = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please give your post a title'),
    check('message')
        .exists({ checkFalsy: true })
        .withMessage('Please write up some text for the post'),
    check('photo')
        .custom((value, { req }) => {
            if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpg" || req.file.mimetype === "image/jpeg") {
                return true;
            } else {
                return false;
            }
        })
        .withMessage('Please give your post a photo'),
    handleValidationErrors
]

const validateEditMessage = [
    check('message')
        .exists({ checkFalsy: true })
        .withMessage('Please write up some text for the post'),
    handleValidationErrors
]

const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please write up some text for the comment'),
    handleValidationErrors
]

// Get Messages
router.get("/", asyncHandler(async (req, res) => {
    const messages = await Message.findAll({})

    return res.json({
        messages
    })
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

        await newMessage.save();

        return res.json(newMessage)
    })
)

// Edit Message

router.put('/', requireAuth, validateEditMessage, asyncHandler(async (req, res) => {
    console.log(req.body)
    let userId = req.user.id;
    let messageId = req.body.id;

    const messagePk = await Message.findByPk(messageId)

    const { message } = req.body;

    const updatedMessage = {
        message,
        userId,
        messageId
    }

    await messagePk.update(updatedMessage)

    return res.json(messagePk)
}))

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    let messageId = req.params.id;
    let message = await Message.findByPk(messageId);

    const resMessage = res.json(message)

    await message.destroy();

    return resMessage
}))

/* -------------------------------------------------------------------------- */

// Comments

// Get Comments

router.get("/:id(\\d+)/comments", asyncHandler(async (req, res) => {
    const messageId = req.params.id

    const comments = await Comment.findAll({
        where: {
            messageId: parseInt(messageId)
        }
    })

    return res.json({ comments })
}))

// Create Comment

router.post("/post-comment", uploadComments.single('photo'), requireAuth, validateComment, asyncHandler(async (req, res) => {
    let userId = req.user.id;

    const { comment, messageId } = req.body;
    const photo = req.file.path;

    const newComment = Comment.build({
        userId,
        messageId,
        comment,
        photo
    })

    await newComment.save();

    return res.json(newComment)
}))

module.exports = router;