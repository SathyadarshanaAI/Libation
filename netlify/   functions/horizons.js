// netlify/functions/horizons.js
import fetch from 'node-fetch';

export async function handler(event) {
  try {
    const params = event.queryStringParameters;

    // NASA Horizons API endpoint
    const apiUrl = `https://ssd.jpl.nasa.gov/api/horizons.api?${new URLSearchParams(params).toString()}`;
    
    const res = await fetch(apiUrl);
    const text = await res.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ result: text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
