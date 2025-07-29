// functions/horizons.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const { planetId, dateStr, timeStr, lat, lon } = event.queryStringParameters;

    // Horizons API URL
    const params = new URLSearchParams({
      format: 'json',
      COMMAND: `'${planetId}'`,
      EPHEM_TYPE: 'OBSERVER',
      SITE_COORD: `'${lon},${lat},0'`,
      START_TIME: `'${dateStr} ${timeStr}'`,
      STOP_TIME: `'${dateStr} ${timeStr}'`,
      STEP_SIZE: "'1 d'",
      QUANTITIES: "'1,2,3,4,20,23,24,29,36,38,39,40,41'",
      CSV_FORMAT: 'YES'
    });

    const url = `https://ssd.jpl.nasa.gov/api/horizons.api?${params.toString()}`;

    // Fetch Horizons API
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
