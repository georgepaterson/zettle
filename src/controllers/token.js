const axios = require('axios');
const qs = require('qs');

/*
* Get a fresh token from Zettle.
* This will enable us to add or remove products from the Zettle API.
*/

async function token() {
    try {
        const url = 'https://oauth.izettle.com/token'
        /*
        * The grant_type, client_id and assertion are the credentials you got when you registered your app with Zettle.
        */
        const response = await axios({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: url,
            data: qs.stringify({
                grant_type: process.env.ZETTLE_GRANT_TYPE,
                client_id: process.env.ZETTLE_CLIENT_ID,
                assertion: process.env.ZETTLE_API_KEY
            })
        })
        if (response.status === 200 && response.data) {
            return {
                success: true,
                data: response.data
            }
        }
    } catch (e) {
        console.log(e)
        await logError('FAILURE TO GET ACCESS TOKEN FOR ZETTLE', e)
        return {
            success: false,
            data: e
        }
    }
};

module.exports = token;