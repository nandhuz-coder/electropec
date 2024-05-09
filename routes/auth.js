var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/login", async function (req, res, next) {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
});

module.exports = router;
