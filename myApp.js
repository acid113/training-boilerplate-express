const express = require('express');
const app = express();
const path = require("path");

const dotenv = require('dotenv');
dotenv.config();

const message = 'Hello json';

app.use("/public", express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
  const absolutePath = path.join(__dirname, "/views/index.html");
  res.sendFile(absolutePath)
})

app.get('/json', function (req, res) {
  res.json({
    "message": process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message 
  })
});

module.exports = app;