const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const add = require('./controllers/add');
const remove = require('./controllers/remove');

require('dotenv').config();

/*
* Connect to MongoDB
*/

const db = process.env.MONGODB_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

/*
* Set up middleware.
*/

/*
* Remove products from Zettle.
* Removing is triggered using node cron.
*/

cron.schedule('* * * * *', () => {
  remove();
});

/*
* Add products to Zettle.
* Adding is triggered using node cron.
*/

cron.schedule('* * * * *', () => {
  add();
});

/*
* Set up routes.
*/
app.get('/health', require('./controllers/health'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
