const axios = require('axios');

module.exports.findLocation = async (address) => {
    const api_key = process.env.VITE_BING_API_KEY;
    const url = `http://dev.virtualearth.net/REST/v1/Locations?query=${address}&maxResults=1&key=${api_key}`;
    const response = await axios.get(url);

    const data = response.data.resourceSets[0];
    if (data.estimatedTotal) {
        return data.resources[0].point;
    }
    return { type: 'Point', coordinates: [] };
};
