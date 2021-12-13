const moment = require('moment');
const Order = require('../models/order');
const token = require('./token');

/*
    Get all orders for today.
*/

async function getOrders() {
  try {
    // Get the day today.
    const start = moment().startOf('day').format();
    const end = moment().endOf('day').format();
    // Get orders for today from database.
    const orders = await Order.find({
      'appointment.date': { $gt: start, $lt: end },
    });
    console.log('On Day: ', 'Zettle orders: ', orders.length);
    // If no orders for today, return empty data.
    if (orders.length === 0) {
      return {
        success: false,
        data: 'No Products to add to Zettle',
      };
    }
    // If orders for today, return orders.
    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    return {
      success: false,
      data: 'FAILURE TO GET ORDER FOR ZETTLE',
    };
  }
}

/*
    Set payload to send to Zettle.
*/

async function setPayload(items) {
  try {
    console.log('Set payload: ', items);
    return {
      success: true,
      data: items,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
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
      data: items,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

/*
    Add orders to Zettle controller.
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
          data: response.data,
        };
      }
      return {
        success: false,
        data: response.data,
      };
    }
    return {
      success: false,
      error: 'Failed to set payload for appointment',
    };
  }
  return {
    success: orders.success,
    error: orders.data,
  };
}

module.exports = add;
