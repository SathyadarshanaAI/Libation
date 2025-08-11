// Netlify Function: /.netlify/functions/nasa
// Uses NASA_KEY from Netlify env vars and proxies the request safely.

import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const API_KEY = process.env.NASA_KEY; // <- set this in Netlify dashboard
    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing NASA_KEY env var" }),
      };
    }

    // Example external API (NASA APOD). Replace with your real endpoint as needed.
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    const r = await fetch(url);
    if (!r.ok) {
      return { statusCode: r.status, body: await r.text() };
    }
    const data = await r.json();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
}
