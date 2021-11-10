const express = require('express');
const app = express();
const path = require("path");

const dotenv = require('dotenv');
dotenv.config();

// middlewares
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', function (req, res) {
  const absolutePath = path.join(__dirname, "/views/index.html");
  res.sendFile(absolutePath)
})

const message = 'Hello json';
app.get('/json', function (req, res) {
  res.json({
    "message": process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message 
  })
});

module.exports = app;