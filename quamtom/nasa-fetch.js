// 📁 quamtom/nasa-fetch.js — Fetch NASA Planet Longitudes for KP Astrology

// 🌍 Main fetch function
async function fetchNASAPlanetLongitude(planetId, utcTime, observerLoc = '6.9271,79.8612,0') {
  const encodedTime = encodeURIComponent(utcTime);
  const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='${planetId}'&EPHEM_TYPE=OBSERVER&START_TIME='${encodedTime}'&STOP_TIME='${encodedTime}+1m'&STEP_SIZE='1 m'&OBSERVER_LOCATION='${observerLoc}'`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const match = data.result.match(/\sEcliptic Lon.?=\s*([0-9.]+)/);
    return match ? parseFloat(match[1]) : null;
  } catch (error) {
    console.error(`🚨 NASA API fetch error for ${planetId}:`, error);
    return null;
  }
}

// 🔢 Example IDs
// Sun = 10, Moon = 301, Mars = 499, Mercury = 199, Jupiter = 599, Venus = 299, Saturn = 699

// 🌟 Batch fetch wrapper
async function fetchAllPlanets(utcTime, observerLoc) {
  const planetIds = {
    Sun: '10',
    Moon: '301',
    Mars: '499',
    Mercury: '199',
    Jupiter: '599',
    Venus: '299',
    Saturn: '699'
  };
  const results = {};
  for (const [planet, id] of Object.entries(planetIds)) {
    const lon = await fetchNASAPlanetLongitude(id, utcTime, observerLoc);
    results[planet] = lon;
  }
  return results;
}

// 🧪 Example test
// fetchAllPlanets('2025-08-05T07:45:00', '7.2906,80.6337,0').then(console.log);

// 📦 Export if in module environment
if (typeof module !== 'undefined') {
  module.exports = {
    fetchNASAPlanetLongitude,
    fetchAllPlanets
  };
}
