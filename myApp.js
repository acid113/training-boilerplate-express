const express = require('express');
const app = express();
const path = require("path");
const moment = require('moment-timezone');

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

// const setTimeAtRequest = (req, res, next) => {
//   req.time = new Date().toString();
//   next();
// };

// const includeTime = (req, res, next) => {
//   const currentTime = moment.tz(req.time, 'Asia/Manila');
//   return res.json({
//     time: currentTime
//   });
// };

// app.get('/now', setTimeAtRequest, includeTime);

app.get('/now', function (req, res, next) {
  req.time = new Date().toString();
  next();
},
  function (req, res) {
    res.json({
      time: req.time
    });
  }
);

module.exports = app;