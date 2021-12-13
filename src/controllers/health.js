const Order = require('../models/order');

/*
* Check health of the connection with the database.
*/

async function health(req, res) {
    let db
    try {
        db = await Order.countDocuments();
        if (db >= 0) {
            res.json(true)
        } else {
            res.json(false)
        }
    } catch (error) {
        res.json(error)
    }
};

module.exports = health;