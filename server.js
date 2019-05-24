// server.js
// mongodb+srv://admin:!QAZ2wsx@billie-shop-4jtkc.mongodb.net/test?retryWrites=true
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./app/auth/strategy")(
  require("passport"),
  require("passport-local"),
  require("bcryptjs")
);

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const cors = require("cors");
const port = process.env.PORT || 9000;

const ensureAuthenticated = require("./app/middleware/ensureAuthenticated");

const authRouter = require("./app/routes/api/auth");
const ordersRouter = require("./app/routes/api/order");
const productsRouter = require("./app/routes/api/product");

//Set up default mongoose connection
const uri = `mongodb+srv://${process.env.MLAB_DB_USER}:${
  process.env.MLAB_DB_PASSWORD
}@billie-shop-4jtkc.mongodb.net/test?retryWrites=true`;
mongoose.connect(uri, { useNewUrlParser: true });

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sid"
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/api/auth",
  authRouter(express, passport, ensureAuthenticated, session)
);
// app.use("/api/order", ordersRouter(express, ensureAuthenticated));
//app.use("/api/product", productsRouter(express, ensureAuthenticated));

// // Products API
// app.get("/products", function(req, res) {
//   res.send("Products");
// });

// app.get("/test", function(req, res) {
//   res.send("TEST hello world");
// });

// // GET method route
// app.get("/", function(req, res) {
//   res.send("GET request to the homepage");
// });

// // POST method route
// app.post("/", function(req, res) {
//   res.send("POST request to the homepage");
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
