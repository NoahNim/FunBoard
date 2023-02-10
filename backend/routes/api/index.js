const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const messageRouter = require("./messages.js")

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/messages", messageRouter)

module.exports = router;