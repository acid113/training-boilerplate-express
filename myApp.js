const express = require('express');
const app = express();
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
  const absolutePath = path.join(__dirname, "/views/index.html");
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
// app.use('/json', (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  let message = 'Hello json';

  if (messageStyle === 'uppercase') {
    res.json({
      "message": message.toUpperCase()
    });
  } else {
    res.json({
      "message": message
    });
  }
  
});

module.exports = app;