const rp = require('request-promise');

module.exports = async (city = '') => {
    if (!city) {
        throw new Error ('СЛЫШ ИМЯ ГОРОДА ДАЙ!');
    }

    const KEY = '57ac8f4d889666b8048610b3b6b912b3';
    const uri = 'http://api.openweathermap.org/data/2.5/weather?';

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    };

    try {
        const data = await rp(options);
        const celsius = (data.main.temp - 32) * 5/9;

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        };

    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        };
    }
};