const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { dob, tob, pob } = JSON.parse(event.body);

    // NASA Horizons API (placeholder URL for now)
    const nasaURL = `https://ssd.jpl.nasa.gov/api/horizons.api?format=json`;

    // Fetch mock planetary positions (replace with actual NASA API params later)
    const response = await fetch(nasaURL);
    const data = await response.json();

    // Sample processed planetary data (placeholder)
    const planetaryData = {
      sun: "Leo 23°45'",
      moon: "Virgo 10°12'",
      mars: "Gemini 12°07'",
      mercury: "Libra 28°02'",
      venus: "Scorpio 05°10'",
      jupiter: "Aquarius 14°50'",
      saturn: "Pisces 21°33'"
    };

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Live planetary positions fetched successfully",
        dob,
        tob,
        pob,
        data: planetaryData
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch NASA ephemeris', details: error.message })
    };
  }
};