const planetList = [
  { name: "Sun", id: "10", color: "#FFD700" },
  { name: "Moon", id: "301", color: "#F5F3CE" },
  { name: "Mercury", id: "199", color: "#A9A9A9" },
  { name: "Venus", id: "299", color: "#FFB6C1" },
  { name: "Mars", id: "499", color: "#D94F4F" },
  { name: "Jupiter", id: "599", color: "#F7C873" },
  { name: "Saturn", id: "699", color: "#E5C07B" }
];

async function getLatLong(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch (e) {}
  return { lat: 7.0, lon: 81.0 };
}

async function getPlanetLongitude(dateStr, timeStr, lat, lon, planetId) {
  const datetime = `${dateStr} ${timeStr}`;
  const params = new URLSearchParams({
    format:'json', COMMAND:`'${planetId}'`, EPHEM_TYPE:'OBSERVER',
    SITE_COORD:`'${lon},${lat},0'`, START_TIME:`'${datetime}'`, STOP_TIME:`'${datetime}'`,
    STEP_SIZE:"'1 d'", QUANTITIES:"'1,2,3,4,20'", CSV_FORMAT:'YES'
  });
  try {
    const res = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${params}`);
    const data = await res.json();
    if (data.result) {
      const line = data.result.split("\n").find(l => /^[0-9]/.test(l));
      if (line) return parseFloat(line.trim().split(",")[4]);
    }
  } catch(e){}
  return null;
}

async function getAllPlanets(dateStr,timeStr,lat,lon){
  const arr=[]; for(const p of planetList){const d=await getPlanetLongitude(dateStr,timeStr,lat,lon,p.id); if(d!==null) arr.push({...p,degree:d});}
  return arr;
}

function drawAstroChart(planets){
  const c=document.getElementById('astroChart'),x=c.getContext('2d');
  x.clearRect(0,0,c.width,c.height);
  const midX = c.width/2, midY = c.height/2, R = Math.min(midX,midY)-12;
  x.save();
  // Draw outer circle & houses
  x.beginPath(); x.arc(midX,midY,R,0,2*Math.PI); x.strokeStyle="#38bdf8"; x.lineWidth=3.2; x.stroke();
  for(let i=0;i<12;i++){
    let a=(i*30-90)*Math.PI/180;
    x.beginPath();x.moveTo(midX,midY);x.lineTo(midX+R*Math.cos(a),midY+R*Math.sin(a));
    x.strokeStyle="#bae6fd";x.lineWidth=1.2;x.stroke();
    // House number
    x.save();
    x.translate(midX+R*0.78*Math.cos(a+Math.PI/12),midY+R*0.78*Math.sin(a+Math.PI/12));
    x.rotate(a+Math.PI/12);
    x.font="bold 12px Segoe UI";
    x.fillStyle="#0ea5e9";
    x.fillText((i+1).toString(),-6,4);
    x.restore();
  }
  // Draw planets
  planets.forEach(p=>{
    let a=((p.degree%360)-90)*Math.PI/180;
    let px=midX+(R-23)*Math.cos(a), py=midY+(R-23)*Math.sin(a);
    x.beginPath();x.arc(px,py,12,0,2*Math.PI);
    x.fillStyle=p.color;x.shadowColor="#222";x.shadowBlur=10;x.fill();
    x.shadowBlur=0;
    x.strokeStyle="#223355";x.stroke();
    x.font="bold 11px Segoe UI";x.fillStyle="#223355";
    x.fillText(p.name,px-14,py+28);
  });
  x.restore();
}

function showPlanetTable(planets){
  let html = "<table><tr><th>Planet</th><th>Degree</th></tr>";
  planets.forEach(p=>{ html += `<tr><td><span style='color:${p.color};font-weight:bold'>${p.name}</span></td><td>${p.degree ? p.degree.toFixed(2) : "-"}</td></tr>`; });
  html += "</table>";
  document.getElementById('planetTable').innerHTML = html;
}

document.getElementById('kpForm').addEventListener('submit',async e=>{
  e.preventDefault();
  document.getElementById('loading').style.display = 'block';
  document.getElementById('resultMsg').textContent = '';
  document.getElementById('planetTable').innerHTML = '';
  const name=document.getElementById('name').value.trim();
  const dob=document.getElementById('dob').value;
  const tob=document.getElementById('tob').value;
  const pob=document.getElementById('pob').value.trim();
  if(!name || !dob || !tob || !pob) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('resultMsg').textContent = 'All required fields must be filled!';
    return;
  }
  const coords=await getLatLong(pob);
  const planets=await getAllPlanets(dob,tob,coords.lat,coords.lon);
  document.getElementById('loading').style.display = 'none';
  if(planets.length===0){document.getElementById('resultMsg').textContent='Unable to retrieve planetary positions.';return;}
  drawAstroChart(planets);
  showPlanetTable(planets);
  document.getElementById('resultMsg').textContent='KP chart generated successfully!';
});
// Draw empty chart initially
drawAstroChart([]);
