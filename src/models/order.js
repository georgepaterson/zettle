const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    email: { type: String, default: ' ', required: true },
    order_name: { type: String, default: ' ' },
    appointment: {
        date: { type: Date }
    }
});

const Orders = mongoose.model("orders", OrderSchema);

module.exports = Orders;