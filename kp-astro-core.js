function showChart(name, dt, tz, lat, lon, place){
  chartArea.style.display = '';
  const dateObj = toUTC(dt, tz);
  const chart = KP.compute(dateObj, lat, lon);
  const planets = chart.planets;
  const moon = planets.find(p=>p.name==='Moon');
  const maha = computeVimshottariDasha(moon.degree, dt, 120);
  const janmaRashi = moonDegreeToRashi(moon.degree);

  summary.innerHTML = `<span class="pill">Name: ${name}</span>
    <span class="pill">Date/Time: ${dt}</span>
    <span class="pill">TZ: ${tz}</span>
    <span class="pill">Lat: ${lat}</span>
    <span class="pill">Lon: ${lon}</span>
    <span class="pill">Place: ${place}</span>
    <span class="pill" style="background:#172e1b;color:#bef264;">Janma Rashi: <b>${janmaRashi}</b></span><br><br>
    <b>Vimshottari Dasha Overview</b><br>
    <div style="color:#cbd5e1;margin-bottom:12px;">${longPredictionSummary(maha, janmaRashi, name)}</div>
    <i>Vimshottari Dasha divides life into planetary periods (Maha Dasha, Bhukti, etc) based on Moon's nakshatra at birth. Exact results depend on your full chart.</i>`;

  // ...rest as before, mapping planets, sub-lords etc using `planets`
}
