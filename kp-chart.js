// ==== KP Chart JS ====

// 1. Planet List
const planetList = [
  { name: "Sun", id: "10", color: "#FFD700" },
  { name: "Moon", id: "301", color: "#F5F3CE" },
  { name: "Mercury", id: "199", color: "#A9A9A9" },
  { name: "Venus", id: "299", color: "#FFB6C1" },
  { name: "Mars", id: "499", color: "#D94F4F" },
  { name: "Jupiter", id: "599", color: "#F7C873" },
  { name: "Saturn", id: "699", color: "#E5C07B" }
];

// 2. Time Zone Auto Detect
document.addEventListener('DOMContentLoaded', function () {
  const tzBtn = document.getElementById('detectTzBtn');
  if (tzBtn) {
    tzBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const now = new Date();
      const offsetMin = -now.getTimezoneOffset();
      const h = Math.floor(offsetMin / 60);
      const m = Math.abs(offsetMin % 60);
      const sign = h >= 0 ? "+" : "-";
      const tzStr = sign + String(Math.abs(h)).padStart(2, "0") + ":" + String(m).padStart(2, "0");
      document.getElementById('timezone').value = tzStr;
    });
  }

  // Draw empty chart at start
  drawAstroChart([]);
});

// 3. Geocode Place Name to Lat/Lon
async function getLatLong(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0)
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch (e) { }
  // Default: Sri Lanka center
  return { lat: 7.0, lon: 81.0 };
}

// 4. Convert local time + timezone to UTC
function toUTC(dateStr, timeStr, tzStr) {
  // dateStr: yyyy-mm-dd, timeStr: HH:MM, tzStr: +05:30
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  const sign = tzStr.startsWith('-') ? -1 : 1;
  const [tzH, tzM] = tzStr.replace('+', '').replace('-', '').split(':').map(Number);
  // Local time as Date
  const localDate = new Date(Date.UTC(y, m - 1, d, hh, mm));
  // Subtract time zone offset to get UTC
  const utcMs = localDate.getTime() - sign * ((tzH * 60 + tzM) * 60000);
  const utcDate = new Date(utcMs);
  // NASA Horizons accepts YYYY-MM-DD HH:MM format in UTC
  return utcDate.getUTCFullYear() + '-' +
    String(utcDate.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(utcDate.getUTCDate()).padStart(2, '0') + ' ' +
    String(utcDate.getUTCHours()).padStart(2, '0') + ':' +
    String(utcDate.getUTCMinutes()).padStart(2, '0');
}

// 5. Get planet longitude from NASA Horizons API
async function getPlanetLongitude(dateStr, timeStr, tzStr, lat, lon, planetId) {
  const datetime = toUTC(dateStr, timeStr, tzStr); // UTC time!
  const params = new URLSearchParams({
    format: 'json',
    COMMAND: `'${planetId}'`,
    EPHEM_TYPE: 'OBSERVER',
    SITE_COORD: `'${lon},${lat},0'`,
    START_TIME: `'${datetime}'`,
    STOP_TIME: `'${datetime}'`,
    STEP_SIZE: "'1 d'",
    QUANTITIES: "'1,2,3,4,20'",
    CSV_FORMAT: 'YES'
  });
  try {
    const res = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${params}`);
    const data = await res.json();
    if (data.result) {
      const line = data.result.split("\n").find(l => /^[0-9]/.test(l));
      if (line) return parseFloat(line.trim().split(",")[4]);
    }
  } catch (e) { }
  return null;
}

// 6. Get all planet longitudes (parallel for speed)
async function getAllPlanets(dateStr, timeStr, tzStr, lat, lon) {
  const promises = planetList.map(async p => {
    const d = await getPlanetLongitude(dateStr, timeStr, tzStr, lat, lon, p.id);
    return d !== null ? { ...p, degree: d } : null;
  });
  const arr = (await Promise.all(promises)).filter(Boolean);
  return arr;
}

// 7. Draw Chart
function drawAstroChart(planets) {
  const c = document.getElementById('astroChart');
  const x = c.getContext('2d');
  x.clearRect(0, 0, c.width, c.height);
  const midX = c.width / 2, midY = c.height / 2, R = Math.min(midX, midY) - 12;
  x.save();
  // Outer circle
  x.beginPath(); x.arc(midX, midY, R, 0, 2 * Math.PI); x.strokeStyle = "#38bdf8"; x.lineWidth = 3.2; x.stroke();
  // Houses & numbers
  for (let i = 0; i < 12; i++) {
    let a = (i * 30 - 90) * Math.PI / 180;
    x.beginPath(); x.moveTo(midX, midY); x.lineTo(midX + R * Math.cos(a), midY + R * Math.sin(a));
    x.strokeStyle = "#bae6fd"; x.lineWidth = 1.2; x.stroke();
    // House number
    x.save();
    x.translate(midX + R * 0.78 * Math.cos(a + Math.PI / 12), midY + R * 0.78 * Math.sin(a + Math.PI / 12));
    x.rotate(a + Math.PI / 12);
    x.font = "bold 12px Segoe UI";
    x.fillStyle = "#0ea5e9";
    x.fillText((i + 1).toString(), -6, 4);
    x.restore();
  }
  // Planets
  planets.forEach(p => {
    let a = ((p.degree % 360) - 90) * Math.PI / 180;
    let px = midX + (R - 23) * Math.cos(a), py = midY + (R - 23) * Math.sin(a);
    x.beginPath(); x.arc(px, py, 12, 0, 2 * Math.PI);
    x.fillStyle = p.color; x.shadowColor = "#222"; x.shadowBlur = 10; x.fill();
    x.shadowBlur = 0;
    x.strokeStyle = "#223355"; x.stroke();
    x.font = "bold 11px Segoe UI"; x.fillStyle = "#223355";
    x.fillText(p.name, px - 14, py + 28);
  });
  x.restore();
}

// 8. Planet Table
function showPlanetTable(planets) {
  let html = "<table><tr><th>Planet</th><th>Degree</th></tr>";
  planets.forEach(p => {
    html += `<tr><td><span style='color:${p.color};font-weight:bold'>${p.name}</span></td><td>${p.degree ? p.degree.toFixed(2) : "-"}</td></tr>`;
  });
  html += "</table>";
  document.getElementById('planetTable').innerHTML = html;
}

// 9. Main Form Handler
document.getElementById('kpForm').addEventListener('submit', async e => {
  e.preventDefault();
  document.getElementById('loading').style.display = 'block';
  document.getElementById('resultMsg').textContent = '';
  document.getElementById('planetTable').innerHTML = '';
  drawAstroChart([]);
  // Get inputs
  const name = document.getElementById('name').value.trim();
  const dob = document.getElementById('dob').value;
  const tob = document.getElementById('tob').value;
  const pob = document.getElementById('pob').value.trim();
  const tz = document.getElementById('timezone').value.trim();
  if (!name || !dob || !tob || !pob || !tz) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('resultMsg').textContent = 'All required fields must be filled!';
    return;
  }
  // Validate TZ format: +HH:MM or -HH:MM
  if (!/^(\+|-)\d{2}:\d{2}$/.test(tz)) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('resultMsg').textContent = 'Time zone format must be +HH:MM or -HH:MM (e.g. +05:30)';
    return;
  }
  // Geocode
  const coords = await getLatLong(pob);
  // Get planets
  const planets = await getAllPlanets(dob, tob, tz, coords.lat, coords.lon);
  document.getElementById('loading').style.display = 'none';
  if (planets.length === 0) {
    document.getElementById('resultMsg').textContent = 'Unable to retrieve planetary positions. Please check your inputs or try again later.';
    drawAstroChart([]);
    return;
  }
  drawAstroChart(planets);
  showPlanetTable(planets);
  document.getElementById('resultMsg').textContent = 'KP chart generated successfully!';
});
