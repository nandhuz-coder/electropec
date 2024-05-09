var express = require("express");
const userScheema = require("../model/userScheema");
var router = express.Router(),
  passport = require("passport");
/* GET users listing. */
router.get("/login", async function (req, res, next) {
  return res.render("auth/login");
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/register");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/users/");
    });
  })(req, res, next);
});

router.get("/register", async (req, res) => {
  return await res.render("auth/register");
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new userScheema({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await userScheema.register(newUser, req.body.password);
    await passport.authenticate("local")(req, res, () => {
      res.redirect("/users");
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/auth/register");
  }
});
module.exports = router;
