// ✅ File: chart-engine.js // Description: Converts planetary positions to KP-compatible chart structure

function renderChart(planetPositions) { const chart = {};

for (const [planet, data] of Object.entries(planetPositions)) { chart[planet] = { degree: data.degree.toFixed(2), rasi: getRasi(data.degree), nakshatra: getNakshatra(data.degree), }; } return chart; }

function getRasi(degree) { const rasis = [ 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces' ]; const index = Math.floor(degree / 30) % 12; return rasis[index]; }

function getNakshatra(degree) { const nakshatras = [ 'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati' ]; const index = Math.floor(degree / (360 / 27)); return nakshatras[index]; }

