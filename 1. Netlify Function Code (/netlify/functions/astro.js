const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { lat, lon, date, time } = event.queryStringParameters;

  // Keys from Netlify Secrets (Environment Variables)
  const appId = process.env.ASTRO_APP_ID;
  const appSecret = process.env.ASTRO_APP_SECRET;

  if (!lat || !lon || !date || !time) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing parameters' }),
    };
  }

  try {
    // AstronomyAPI endpoint for planet positions
    const res = await fetch(`https://api.astronomyapi.com/api/v2/bodies/positions?latitude=${lat}&longitude=${lon}&from_date=${date}&to_date=${date}&time=${time}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${appId}:${appSecret}`).toString('base64'),
      }
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: err.message }),
    };
  }
};
