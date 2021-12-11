
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cron = require('node-cron');

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;