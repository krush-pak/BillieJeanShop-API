module.exports = (express, ensureAuthenticated) => {
  // Dependencies
  const router = express.Router();
  const Order = require("../../models/Order");

  router.get("/", ensureAuthenticated, (req, res, next) => {
    Order.find({}).then(orders => {
      res.send(orders);
    });
  });

  router.post("/", ensureAuthenticated, (req, res, next) => {
    const { amount } = req.body;
    const newOrder = new Order({
      amount
    });
    return newOrder.save().then(res.json({ message: "success" }));
  });
  return router;
};
