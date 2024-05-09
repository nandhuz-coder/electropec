var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/", async (req, res) => {
  const data = req;
  console.log(data);
  res.json("hello");
});
module.exports = router;
