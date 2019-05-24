module.exports = (express, ensureAuthenticated) => {
  // Dependencies
  const router = express.Router();

  router.post("/", ensureAuthenticated, (req, res, next) => {
    res.json({ message: "user is authenticated" });
  });
  return router;
};
