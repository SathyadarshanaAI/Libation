// 🌍 NASA Planet Fetch Logic (Simplified Demo)
async function fetchNASAPlanetLong(planetId, utcTime, observerLoc = '6.9271,79.8612,0') {
  const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='${planetId}'&EPHEM_TYPE=OBSERVER&START_TIME='${utcTime}'&STOP_TIME='${utcTime}+1m'&STEP_SIZE='1 m'&OBSERVER_LOCATION='${observerLoc}'`;

  const response = await fetch(url);
  const data = await response.json();

  // 🧭 Extract Longitude from response (you will need to parse 'result')
  const match = data.result.match(/  Ecliptic Lon .*?= ([0-9.]+)/);
  return match ? parseFloat(match[1]) : null;
}
