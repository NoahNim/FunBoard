const router = require("express").Router();

router.get("/" , function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
})

module.exports = router;