const express = require('express');
const app = express();
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
  const absolutePath = path.join(__dirname, "/views/index.html");
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
// app.use('/json', (req, res) => {  // * needed 'use' for the checker to work
  const messageStyle = process.env.MESSAGE_STYLE;
  let message = 'Hello json';

  res.json({
    "message": messageStyle === 'uppercase' ? message.toUpperCase() : message 
  })
  
});

module.exports = app;