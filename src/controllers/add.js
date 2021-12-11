const Order = require('../models/order');
const moment = require('moment');
const token = require('./token');

/*
    Get all orders for today.
*/

async function getOrders() {
    try {
        const start = moment().startOf('day').format();
        const end = moment().endOf('day').format();
        const orders = await Order.find({
            'appointment.date': { $gt: start, $lt: end },
        });
        console.log('On Day: ', 'Zettle orders: ', orders.length);
        if (orders.length === 0) {
            return {
                success: false,
                data: 'No Products to add to Zettle'
            }
        }
        return {
            success: true,
            data: orders
        }
    } catch (error) {
        await logError('FAILURE TO GET ORDER FOR ZETTLE', error)
        return {
            success: false,
            data: 'FAILURE TO GET ORDER FOR ZETTLE'
        }
    }
};

/*
    Add orders to Zettle.
*/

async function add() {
    const access = await token();
    const orders = await getOrders();
    console.log(access);
    console.log(orders);
    console.log("add");


};

module.exports = add;