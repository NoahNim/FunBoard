const router = require("express").Router();

router.get("/test" , function(req, res) {
    res.json({ requestBody: req.body });
})

module.exports = router;