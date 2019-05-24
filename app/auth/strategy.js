module.exports = (passport, LocalStrategy, bcrypt) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) return done(null, false, { message: "no user" });
          bcrypt.compare(password, user.password).then(isValid => {
            if (isValid) {
              return done(null, user, { message: "user" });
            } else {
              return done(null, false, { message: "invalid" });
            }
          });
        })
        .catch(err => done(err));
    })
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) =>
    User.findById(id)
      .then(user => {
        done(false, user);
      })
      .catch(err => {
        done(err);
      })
  );
  return passport;
};
