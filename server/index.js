const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const favoriteRouter = require("./routes/favorite");
const passport = require("passport");

// const User = require("./models/User");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("./config");
require("dotenv").config();

//coonect to mongo

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

//middleware to check if the user is autheticated
// function isUserAutheticated(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.send("you must login");
//   }
// }

const MAX_AGE = 1000 * 60 * 60 * 3; //three hours

//setting up connect-mongodb-sessions
const mongoDBStore = new MongoDBStore({
  uri: "mongodb://localhost/postdb",
  collection: "mySessions",
});

//Express-seesions
app.use(
  session({
    name: process.env.COOKIE_NAME,
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoDBStore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: process.env.IS_PROD,
    },
  })
);
// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// app.use("/secret", isUserAutheticated, (req, res) => {
//   res.send("You have reached our secret route");
// });

app.get("/logout", (req, res) => {
  req.logout();
  res.send("cris");
});

app.use(passport.initialize());
app.use(passport.session());
// //middleware
app.get("api/current_user", (req, res) => {
  res.send(req.user);
});
app.use("/api/user", userRouter);
app.use("api/favorite", favoriteRouter)

// app.use('/users',user)

app.listen(PORT, () => {
  console.log(`server ruuning on port ${PORT}`);
});
