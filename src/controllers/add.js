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
    Set payload to send to Zettle.
*/

async function setPayload(items) {
    try {
        console.log('Set payload: ', items);
        return {
            success: true,
            data: items
        }
    } catch (error) {
        console.log(error)
        await logError('FAILURE TO ADD PRODUCTS TO IZETTLE', e)
        return {
            success: false,
            error: error
        }
    }
}

/*
    Post orders to Zettle.
*/

async function postOrders(items) {
    try {
        console.log('Post orders: ', items);
        return {
            success: true,
            data: items
        }
    } catch (error) {
        console.log(error)
        await logError('FAILURE TO ADD PRODUCTS TO IZETTLE', e)
        return {
            success: false,
            error: error
        }
    }
}

/*
    Add orders to Zettle.
*/

async function add() {
    const access = await token();
    const orders = await getOrders();
    if (orders.success) {
        const payload = await setPayload(orders.data);
        if (payload.success) {
            const response = await postOrders(payload.data);
            if (response.success) {
                return {
                    success: true,
                    data: response.data
                }
            } else {
                return {
                    success: false,
                    data: response.data
                }
            }
        } else {
            return {
                success: false,
                error: 'Failed to set payload for appointment'
            }
        }
    } else {
        return {
            success: orders.success,
            error: orders.data
        }
    }
};

module.exports = add;