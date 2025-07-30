const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const baseUrl = "https://ssd.jpl.nasa.gov/api/horizons.api";
    const query = event.rawQuery ? `?${event.rawQuery}` : "";
    const url = `${baseUrl}${query}`;

    const res = await fetch(url);
    const text = await res.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ result: text }),
      headers: { "Content-Type": "application/json" }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" }
    };
  }
};
