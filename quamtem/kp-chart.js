<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KP Chart Generator | Lebetion</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <style>
    body {background:#0e1320; color:#e2f0ff; font-family:sans-serif;}
    main {max-width:440px; margin:30px auto; padding:24px; background:#181f2e; border-radius:15px; box-shadow:0 0 23px #182b40;}
    h1 {color:#fff; text-align:center; text-shadow:0 0 5px #60a5fa;}
    label {display:block; margin:11px 0 2px;}
    input {width:99%; padding:7px 10px; border-radius:6px; border:1px solid #262f44; background:#111b2c; color:#e2f0ff;}
    button {padding:10px 24px; border-radius:8px; border:0; background:linear-gradient(90deg,#60a5fa,#e6b2ff,#2df3c2); color:#101d1f; font-weight:bold; margin-top:18px;}
    #map {height:140px; width:100%; border-radius:9px; margin:13px 0 17px 0;}
    .row {display:flex; gap:10px;}
    .row > div {flex:1;}
    #astroChart {display:block; margin:17px auto 0 auto; background:#1c2537; border-radius:50%;}
    .status {color:#2df3c2; min-height:19px; margin-top:7px;}
  </style>
</head>
<body>
<main>
  <h1>KP Chart Generator</h1>
  <form id="kpForm">
    <label>Name <input type="text" id="name" required></label>
    <div class="row">
      <div>
        <label>Date of Birth <input type="date" id="dob" required></label>
      </div>
      <div>
        <label>Time of Birth <input type="time" id="tob" required></label>
      </div>
    </div>
    <label>Place of Birth <input type="text" id="pob" placeholder="e.g. Colombo"></label>
    <div class="row">
      <div>
        <label>Latitude <input type="number" id="lat" step="0.0001" required placeholder="Click map or enter"></label>
      </div>
      <div>
        <label>Longitude <input type="number" id="lon" step="0.0001" required placeholder="Click map or enter"></label>
      </div>
    </div>
    <label>Time Zone <input type="text" id="timezone" required placeholder="+05:30"></label>
    <button type="submit">Generate Chart</button>
    <div class="status" id="status"></div>
  </form>
  <div id="map"></div>

  <canvas id="astroChart" width="300" height="300"></canvas>
</main>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
  // --- Street map JS (Leaflet) ---
  let marker = null;
  const map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    scrollWheelZoom: false, doubleClickZoom: false,
    boxZoom: false, keyboard: false, tap: false
  }).setView([7.1, 79.9], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
  map.on('click', function(e) {
    if (marker) map.removeLayer(marker);
    marker = L.marker(e.latlng).addTo(map);
    document.getElementById('lat').value = e.latlng.lat.toFixed(4);
    document.getElementById('lon').value = e.latlng.lng.toFixed(4);
  });

  // --- KP Chart Wheel (simple demo) ---
  function drawWheel() {
    const c = document.getElementById('astroChart');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,300,300);
    // Draw outer circle
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(150,150,110,0,2*Math.PI); ctx.stroke();
    // Draw 12 sectors
    for(let i=0;i<12;i++){
      let angle = (i*30-90)*Math.PI/180;
      ctx.beginPath();
      ctx.moveTo(150,150);
      ctx.lineTo(150+110*Math.cos(angle),150+110*Math.sin(angle));
      ctx.strokeStyle="#2df3c2";
      ctx.lineWidth=1.5;
      ctx.stroke();
    }
    // Draw sign labels
    const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    for(let i=0;i<12;i++){
      let angle = (i*30+15-90)*Math.PI/180;
      ctx.save();
      ctx.translate(150+90*Math.cos(angle),150+90*Math.sin(angle));
      ctx.fillStyle="#fff";
      ctx.font="bold 13px sans-serif";
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      ctx.fillText(SIGNS[i],0,0);
      ctx.restore();
    }
  }
  drawWheel();

  // --- Form submit demo (no API, just wheel redraw + message) ---
  document.getElementById('kpForm').onsubmit = function(e){
    e.preventDefault();
    drawWheel();
    document.getElementById('status').textContent = '✓ Chart generated (demo)';
  };
</script>
</body>
</html>
