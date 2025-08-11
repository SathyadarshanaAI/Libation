// 📆 Vimshottari Dasha Period Generator (KP-Compatible)

const dashaSequence = [
  { lord: 'Ketu', span: 7 },
  { lord: 'Venus', span: 20 },
  { lord: 'Sun', span: 6 },
  { lord: 'Moon', span: 10 },
  { lord: 'Mars', span: 7 },
  { lord: 'Rahu', span: 18 },
  { lord: 'Jupiter', span: 16 },
  { lord: 'Saturn', span: 19 },
  { lord: 'Mercury', span: 17 },
];

// 🧠 Get starting Dasha index based on Moon position
function getDashaStartIndex(moonDegree) {
  const totalNakshatras = 27;
  const nakIndex = Math.floor(moonDegree / (360 / totalNakshatras));
  return nakIndex % dashaSequence.length;
}

// 🧮 Generate full Dasha timeline
function generateDashaTimeline(startLord, birthYear) {
  let idx = dashaSequence.findIndex(d => d.lord === startLord);
  let currentYear = birthYear;
  const timeline = [];

  for (let i = 0; i < dashaSequence.length; i++) {
    const dasha = dashaSequence[idx];
    timeline.push({
      lord: dasha.lord,
      start: currentYear,
      end: currentYear + dasha.span
    });
    currentYear += dasha.span;
    idx = (idx + 1) % dashaSequence.length;
  }
  return timeline;
}

// 📌 Render Dasha in HTML
function renderDasha(moonDegree, birthYear) {
  if (!moonDegree && moonDegree !== 0) {
    document.getElementById('dashaOutput').innerHTML =
      `<p style="color:red;">Moon not found for Dasha.</p>`;
    return;
  }

  const startIdx = getDashaStartIndex(moonDegree);
  const startLord = dashaSequence[startIdx].lord;
  const timeline = generateDashaTimeline(startLord, birthYear);

  let html = `<h3>Vimshottari Dasha</h3><table border="1" cellpadding="5"><tr><th>Lord</th><th>Start Year</th><th>End Year</th></tr>`;
  timeline.forEach(d => {
    html += `<tr><td>${d.lord}</td><td>${d.start}</td><td>${d.end}</td></tr>`;
  });
  html += `</table>`;

  document.getElementById('dashaOutput').innerHTML = html;
}

// 🛰️ Get Moon degree from planetary data
function initDashaFromPlanets(planets, birthYear) {
  const moon = planets.find(p => p.Body?.toLowerCase() === "moon");
  if (moon) {
    renderDasha(parseFloat(moon.Deg360), birthYear);
  } else {
    renderDasha(null, birthYear);
  }
}
