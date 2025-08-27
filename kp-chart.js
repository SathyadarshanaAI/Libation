/* ---------- KP CHART – Base JS (root version) ---------- */

// ==== Timezone Auto Detect ====
const tzInput = document.getElementById('timezone');
const tzBtn = document.getElementById('detectTzBtn');
if (tzBtn) {
  tzBtn.addEventListener('click', () => {
    try {
      const off = -new Date().getTimezoneOffset(); // minutes
      const s = off >= 0 ? '+' : '-';
      const a = Math.abs(off), h = Math.floor(a / 60), m = a % 60;
      tzInput.value = `${s}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    } catch {
      tzInput.value = '+05:30';
    }
  });
  if (!tzInput.value) tzBtn.click(); // fill once
}

// ==== MAP (Leaflet) ====
// REQUIREMENT: index.html includes Leaflet CSS/JS via CDN BEFORE this file.
const pobInput = document.getElementById('pob');

// Create the map only if the container exists
(function initMap(){
  const box = document.getElementById('map');
  if (!box || !window.L) return;

  const map = L.map('map', { zoomControl: true });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OpenStreetMap'
  }).addTo(map);

  const SL = [7.8731, 80.7718]; // Sri Lanka default
  map.setView(SL, 7);
  const marker = L.marker(SL, { draggable: true }).addTo(map);

  function fillPOB(lat, lon) {
    if (pobInput) pobInput.value = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  }

  map.on('click', (e) => {
    marker.setLatLng(e.latlng);
    fillPOB(e.latlng.lat, e.latlng.lng);
  });

  marker.on('dragend', () => {
    const p = marker.getLatLng();
    fillPOB(p.lat, p.lng);
  });

  // If user already typed coords → center there
  centerFromField();
  pobInput && pobInput.addEventListener('change', centerFromField);

  function centerFromField(){
    if (!pobInput) return;
    const t = (pobInput.value || '').trim();
    const m = t.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
    if (m) {
      const lat = +m[1], lon = +m[2];
      marker.setLatLng([lat, lon]);
      map.setView([lat, lon], 12);
    }
  }
})();

// ==== (Optional) Demo submit handler – keep yours if you already have logic ====
const form = document.getElementById('kpForm');
const loading = document.getElementById('loading');
const resultMsg = document.getElementById('resultMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loading.style.display = 'block';
    resultMsg.textContent = '';

    // TODO: replace with real planetary API call.
    setTimeout(() => {
      loading.style.display = 'none';
      resultMsg.textContent = '✓ Chart generated (demo)';
      // draw placeholder chart so UI not empty
      try { drawDemoChart(); } catch {}
      buildDemoTable();
    }, 400);
  });
}

// ---- Demo renderers (safe placeholders) ----
function drawDemoChart(){
  const cvs = document.getElementById('astroChart');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');
  ctx.clearRect(0,0,cvs.width,cvs.height);
  // ring
  const cx = cvs.width/2, cy = cvs.height/2, r = cvs.width*0.42;
  ctx.strokeStyle = '#2f3a66'; ctx.lineWidth = 10; ctx.beginPath();
  ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
  // 12 spokes
  ctx.strokeStyle = '#3f4b80'; ctx.lineWidth = 1.6;
  for (let i=0;i<12;i++){
    const a = (i*Math.PI/6);
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx + r*Math.cos(a), cy + r*Math.sin(a));
    ctx.stroke();
  }
}
function buildDemoTable(){
  const el = document.getElementById('planetTable');
  if (!el) return;
  const planets = [
    {name:'Sun',deg:123.46},{name:'Moon',deg:200.12},
    {name:'Mercury',deg:305.43},{name:'Venus',deg:271.11},
    {name:'Mars',deg:18.88}
  ];
  let html = `<table><thead><tr>
    <th>Planet</th><th>Degree</th></tr></thead><tbody>`;
  planets.forEach(p=>{ html += `<tr><td>${p.name}</td><td>${p.deg.toFixed(2)}</td></tr>`; });
  html += `</tbody></table>`;
  el.innerHTML = html;
}
