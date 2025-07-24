// netlify/functions/astro.js

exports.handler = async (event, context) => {
  try {
    // Mock planetary positions (replace with real API later)
    const planets = [
      { name: "Sun", degree: 25 },
      { name: "Moon", degree: 48 },
      { name: "Mercury", degree: 90 },
      { name: "Venus", degree: 140 },
      { name: "Mars", degree: 200 },
      { name: "Jupiter", degree: 250 },
      { name: "Saturn", degree: 300 },
      { name: "Rahu", degree: 330 },
      { name: "Ketu", degree: 150 }
    ];

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "KP Planetary Positions (Mock Data)",
        data: planets
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load planetary data." }),
    };
  }
};
