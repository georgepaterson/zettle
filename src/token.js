const axios = require('axios');
const qs = require('qs');

async function token() {
    try {
        const url = 'https://oauth.izettle.com/token'
        const response = await axios({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: url,
            data: qs.stringify({
                grant_type: process.env.IZETTLE_GRANT_TYPE,
                client_id: process.env.IZETTLE_CLIENT_ID,
                assertion: process.env.IZETTLE_API_KEY
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
        await logError('FAILURE TO GET ACCESS TOKEN FOR IZETTLE', e)
        return {
            success: false,
            data: e
        }
    }
};

module.exports = token;