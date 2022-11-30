const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");

console.log("App Starting----");

// Mongodb connection
mongoose.connect(config.mongoConnectionUrl);

let db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.on("open", () => {
  console.log("MongoDB Connection Created-----");

  // Setting up changeStream on Products Collection:
  mongoose.connection.db.command({
    collMod: "products",
    changeStreamPreAndPostImages: { enabled: true },
  });
});

require("./models/User");
require("./models/Product");

// CORS Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// JSON parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Importing routes
app.use("/", require("./routes/master"));

// Start Server
app.listen(config.port, () =>
  console.log(`APP running on port ${config.port}`)
);

module.exports = app; // Used for testing
