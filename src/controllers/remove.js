const axios = require('axios');
const token = require('./token');

/*
* Get current Zettle products
*/

async function getZettle(token) {
  try {
    const url = `https://products.izettle.com/organizations/${process.env.ZETTLE_ORGANISATION}`;
    const response = await axios({
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'get',
      url,
      data: {},
    });
    // Return Zettle products.
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      data: `Failed to get Zettle products:: ${error}`,
    };
  }
}

/*
* Filter Zettle products for product categories that should not be removed.
*/

async function filterZettle(products) {
  try {
    const list = [];
    products.forEach((product) => {
      if (product.category) {
        if (!product.category.name.includes('Service Fees')) {
          list.push(product.uuid);
        }
      } else {
        list.push(product.uuid);
      }
    });
    // Return filtered Zettle products.
    return {
      success: true,
      data: list,
    };
  } catch (error) {
    return {
      success: false,
      data: `Failed to filter Zettle product: ${error}`,
    };
  }
}

/*
* Remove Zettle products from the filtered list of products.
*/

async function postZettle(list) {
  try {
    console.log(list);

    return {
      success: true,
      data: list,
    };
  } catch (error) {
    return {
      success: false,
      data: `Failed to remove Zettle product: ${error}`,
    };
  }
}

/*
* Remove Zettle products controller.
*/

async function remove() {
  const access = await token();
  const products = await getZettle(access.data.access_token);
  const filtered = await filterZettle(products.data);
  const removed = await postZettle(filtered.data);
}

module.exports = remove;
