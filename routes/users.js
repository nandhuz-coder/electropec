var express = require("express");
var router = express.Router();
function ifuser(req, res, next) {
  if (req.user) next();
  else res.redirect("/");
}

/* GET users listing. */
router.get("/", ifuser, function (req, res, next) {
  res.render("user/user");
});

module.exports = router;
