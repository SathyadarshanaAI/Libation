// 📄 ephemeris-mock.js — Mock Ephemeris Data for KP Chart

window.computeMockEphemeris = function(birthDetails) {
  // birthDetails = { date, time, lat, lon }
  // Temporary mock planetary positions (replace with NASA ephemeris later)

  return {
    planets: [
      { name: "☉ Sun", degree: 120 },
      { name: "☽ Moon", degree: 245 },
      { name: "♂ Mars", degree: 330 },
      { name: "♀ Venus", degree: 75 },
      { name: "☿ Mercury", degree: 180 },
      { name: "♃ Jupiter", degree: 60 },
      { name: "♄ Saturn", degree: 310 },
      { name: "☊ Rahu", degree: 45 },
      { name: "☋ Ketu", degree: 225 },
    ]
  };
};
