const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* Order Schema.
*/

const OrderSchema = new Schema({
    email: { type: String, default: ' ', required: true },
    order_name: { type: String, default: ' ' },
    appointment: {
        date: { type: Date }
    }
});

/*
* Export the model.
*/

const Orders = mongoose.model("orders", OrderSchema);

module.exports = Orders;