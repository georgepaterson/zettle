const express = require('express');
const app = express();
const mongoose = require('mongoose');
const add = require('./controllers/add');
const remove = require('./controllers/remove');
const cron = require('node-cron');

require('dotenv').config();

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

cron.schedule('* * * * *', () => {
    remove();
});

cron.schedule('* * * * *', () => {
    add();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;