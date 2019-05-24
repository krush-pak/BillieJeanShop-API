// check authentication
const ensureAuthenticated = (req, res, next) => {
  // console.log(req.user);

  if (!req.isAuthenticated()) {
    // console.log("not authenticated");
    res.status(401);
    res.json({ message: "not auth" });
  } else {
    next();
  }
};

module.exports = ensureAuthenticated;
