// netlify/functions/nasaKP.js

exports.handler = async (event) => {
  try {
    const { name, dob, tob, pob } = JSON.parse(event.body);

    // Mock planetary positions (Replace with NASA/KP API later)
    const planets = [
      { planet: "Sun", sign: "Leo", subLord: "Venus" },
      { planet: "Moon", sign: "Cancer", subLord: "Mercury" },
      { planet: "Mars", sign: "Virgo", subLord: "Saturn" },
      { planet: "Mercury", sign: "Libra", subLord: "Jupiter" },
      { planet: "Jupiter", sign: "Scorpio", subLord: "Ketu" },
      { planet: "Venus", sign: "Sagittarius", subLord: "Rahu" },
      { planet: "Saturn", sign: "Capricorn", subLord: "Moon" }
    ];

    return {
      statusCode: 200,
      body: JSON.stringify({
        name,
        dob,
        tob,
        pob,
        planets,
        note: "Mock planetary data — NASA live API integration coming soon."
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: `Error: ${error.message}` };
  }
};