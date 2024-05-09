var createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  hbs = require("express-handlebars"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  MongoStore = require("connect-mongodb-session")(session),
  localStrategy = require("passport-local"),
  User = require("./model/userScheema");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
require("dotenv").config();
//* view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//* db config

// db config
mongoose
  .connect(process.env.DB_URL, {
    dbName: "electropec",
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

const store = new MongoStore({
  uri: process.env.DB_URL,
  collection: "sessions",
  databaseName: "electropec",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// *Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// *Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
