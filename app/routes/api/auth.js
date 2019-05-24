module.exports = (express, passport, ensureAuthenticated, session) => {
  // Dependencies
  const router = express.Router();
  const User = require("../../models/User");
  const validation = require("../../middleware/validation");
  const bcrypt = require("bcryptjs");
  const stripUser = require("../../helpers/stripUser");

  router.get("/user", ensureAuthenticated, (req, res) => {
    res.json({ message: "user is authenticated" });
  });

  // @route   POST api/auth/register
  // @desc    Register user
  // @access  Public
  router.post("/register", validation.registerInput, (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        // Check if email already registered
        if (user)
          throw {
            statusCode: 400,
            message: [{ email: "email already registered" }]
          };
        // Generate salt
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err);
            return resolve(salt);
          });
        });
      })
      .then(salt => {
        // Hash password
        return new Promise((resolve, reject) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return reject(err);
            return resolve(hash);
          });
        });
      })
      .then(hash => {
        const { email, name } = req.body;
        const newUser = new User({
          email,
          name,
          password: hash
        });
        // Save new user
        return newUser.save().then(res.json({ message: "success" }));
      })
      .catch(error => {
        res.json({ error });
        next();
      });
  });

  // @route   POST api/auth/login
  // @desc    Login user
  // @access  Public
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) console.error(err);
      req.logIn(user, err => {
        console.log(user);
        return res.json({ err, user: stripUser(user) });
      });
    })(req, res, next);
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.json({ message: "user logged-out" });
  });

  return router;
};
