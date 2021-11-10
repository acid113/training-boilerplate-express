const express = require('express');
const path = require("path");
const app = express();

app.use("/public", express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
  const absolutePath = path.join(__dirname, "/views/index.html");
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
  res.json({
    "message": "Hello json"
  });
});

module.exports = app;