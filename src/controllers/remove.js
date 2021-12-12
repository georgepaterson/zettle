const axios = require('axios');
const token = require('./token');


async function getZettle(token) {
    try {
        const url = 'https://products.izettle.com/organizations/' + process.env.IZETTLE_ORGANISATION;
        const response = await axios({
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'get',
            url: url,
            data: {}
        });
        return {
            success: true,
            data: response.data
        }
    } catch (e) {
        return {
            success: false,
            data: 'FAILURE TO GET ORDER FOR IZETTLE'
        }
    }
}

async function remove(){
    const access = await token();
    const products = await getZettle(access.data.access_token);
    console.log("remove");
    console.log(products);

};

module.exports = remove;