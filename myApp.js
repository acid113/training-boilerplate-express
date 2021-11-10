const express = require('express');
const app = express();
const path = require("path");

const dotenv = require('dotenv');
dotenv.config();

// middlewares
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  const absolutePath = path.join(__dirname, "/views/index.html");
  res.sendFile(absolutePath)
})

const message = 'Hello json';
app.get('/json', (req, res) => {
  res.json({
    "message": process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message 
  })
});

const setTimeAtRequest = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

const includeTime = (req, res, next) => {
  return res.json({
    time: req.time
  });
};

app.get('/now', setTimeAtRequest, includeTime);


module.exports = app;