const express = require("express");
const app = express();
const user = require("./controller/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const product = require("./controller/product");
const path = require('path');
app.use(errorHandler);

// Built-in middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

app.use('/products', express.static(path.join(__dirname, 'products')));
app.use("/api/v2/user", user);
app.use("/api/v2/product", product);



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.get("/", (_req, res) => {
  return res.send("Welcome to backend");
});

module.exports = app;